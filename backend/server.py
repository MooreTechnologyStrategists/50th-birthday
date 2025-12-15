from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class RSVPCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    attending: bool
    guest_count: int = Field(default=1, ge=1, le=3)
    dietary_restrictions: Optional[str] = None
    message: Optional[str] = None

class RSVP(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    attending: bool
    guest_count: int
    dietary_restrictions: Optional[str] = None
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Routes
@api_router.get("/")
async def root():
    return {"message": "RoSeé's 50th Birthday Celebration API"}

@api_router.post("/rsvp", response_model=RSVP)
async def create_rsvp(input: RSVPCreate):
    rsvp_dict = input.model_dump()
    rsvp_obj = RSVP(**rsvp_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = rsvp_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.rsvps.insert_one(doc)
    return rsvp_obj

@api_router.get("/rsvp", response_model=List[RSVP])
async def get_rsvps():
    # Exclude MongoDB's _id field from the query results
    rsvps = await db.rsvps.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for rsvp in rsvps:
        if isinstance(rsvp['timestamp'], str):
            rsvp['timestamp'] = datetime.fromisoformat(rsvp['timestamp'])
    
    return rsvps

@api_router.get("/rsvp/stats")
async def get_rsvp_stats():
    rsvps = await db.rsvps.find({}, {"_id": 0}).to_list(1000)
    
    attending_count = sum(1 for r in rsvps if r['attending'])
    not_attending_count = sum(1 for r in rsvps if not r['attending'])
    total_guests = sum(r['guest_count'] for r in rsvps if r['attending'])
    
    return {
        "total_rsvps": len(rsvps),
        "attending": attending_count,
        "not_attending": not_attending_count,
        "total_guests": total_guests
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()