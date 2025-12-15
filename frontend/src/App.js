import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";
import { Download, Calendar, MapPin, Mail, Phone, Users, Sparkles } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [rsvpData, setRsvpData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: true,
    guest_count: 1,
    dietary_restrictions: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState(null);
  const flyerRef = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/rsvp/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/rsvp`, rsvpData);
      setSubmitted(true);
      fetchStats();
      setTimeout(() => {
        setSubmitted(false);
        setRsvpData({
          name: "",
          email: "",
          phone: "",
          attending: true,
          guest_count: 1,
          dietary_restrictions: "",
          message: ""
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("Error submitting RSVP. Please try again.");
    }
  };

  const downloadFlyer = () => {
    const element = flyerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1200;
    canvas.height = 1600;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(0.5, '#1a0f29');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gold accents
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
    
    // Title
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CELEBRATING', canvas.width / 2, 200);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 100px Arial';
    ctx.fillText('RoSeé Murphy', canvas.width / 2, 320);
    
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 120px Arial';
    ctx.fillText('50', canvas.width / 2, 480);
    
    ctx.fillStyle = '#9D4EDD';
    ctx.font = '50px Arial';
    ctx.fillText('FABULOUS YEARS', canvas.width / 2, 560);
    
    // Date
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '45px Arial';
    ctx.fillText('March 5-8, 2026', canvas.width / 2, 700);
    
    ctx.font = '38px Arial';
    ctx.fillText('Maryland • DMV Area', canvas.width / 2, 760);
    
    // Description
    ctx.fillStyle = '#D4AF37';
    ctx.font = '35px Arial';
    ctx.fillText('4 Days of Elegance, Fun & Celebration', canvas.width / 2, 880);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '32px Arial';
    ctx.fillText('Museums • Spa • Fine Dining • Brunch', canvas.width / 2, 950);
    
    // RSVP Info
    ctx.fillStyle = '#9D4EDD';
    ctx.font = 'bold 40px Arial';
    ctx.fillText('RSVP', canvas.width / 2, 1100);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '30px Arial';
    ctx.fillText('roseecm@gmail.com', canvas.width / 2, 1160);
    ctx.fillText('202.740.1649', canvas.width / 2, 1210);
    
    // Website
    ctx.fillStyle = '#D4AF37';
    ctx.font = '32px Arial';
    ctx.fillText('askdogood.com', canvas.width / 2, 1350);
    
    // Theme colors
    ctx.fillStyle = '#9D4EDD';
    ctx.font = 'italic 28px Arial';
    ctx.fillText('Black • Gold • Purple', canvas.width / 2, 1450);
    
    // Download
    const link = document.createElement('a');
    link.download = 'RoSee-Murphy-50th-Birthday-Flyer.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-purple-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-block">
              <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
            </div>
            <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-shimmer">
              CELEBRATING
            </h1>
            <h2 className="text-6xl md:text-7xl font-bold text-white">
              RoSeé Murphy
            </h2>
            <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
              50
            </div>
            <p className="text-4xl text-purple-400 font-semibold">
              FABULOUS YEARS
            </p>
            <div className="pt-8 space-y-3">
              <p className="text-3xl font-semibold flex items-center justify-center gap-3">
                <Calendar className="w-8 h-8 text-yellow-500" />
                March 5-8, 2026
              </p>
              <p className="text-2xl text-purple-300 flex items-center justify-center gap-3">
                <MapPin className="w-7 h-7 text-yellow-500" />
                Maryland • DMV Area
              </p>
            </div>
            <div className="pt-6">
              <p className="text-2xl text-yellow-400 font-light italic">
                4 Days of Elegance, Fun & Celebration
              </p>
              <p className="text-xl text-gray-300 mt-2">
                Museums • Spa • Fine Dining • Brunch
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-r from-purple-900/30 to-black/30 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-4xl font-bold text-yellow-500">Join Us for a Milestone Celebration</h3>
            <p className="text-xl text-gray-200 leading-relaxed">
              Join us as we celebrate RoSeé Murphy's 50th birthday with an unforgettable weekend in Maryland! 
              We're bringing together friends from across the country for four days of elegant experiences, 
              peaceful moments, and joyful celebration. From museum visits to spa relaxation, fine dining to 
              delightful brunches—this will be a weekend to remember.
            </p>
            <div className="flex items-center justify-center gap-8 pt-4 text-yellow-500">
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Intimate Gathering</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Elegant & Fun</p>
              </div>
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">4 Amazing Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <h3 className="text-5xl font-bold text-center text-yellow-500 mb-16">Weekend Itinerary</h3>
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Thursday */}
            <div className="bg-gradient-to-r from-purple-900/50 to-black/50 border-2 border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-500 transition-all duration-300" data-testid="thursday-itinerary">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-500 text-black rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                  THU
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white">Thursday, March 5</h4>
                  <p className="text-purple-300 text-lg">Arrival Day - Welcome</p>
                </div>
              </div>
              <div className="ml-20 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">3:00 PM</span>
                  <span className="text-gray-200">Hotel Check-in - Guests arrive and settle in</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">7:00 PM</span>
                  <div>
                    <p className="text-white font-semibold">Welcome Reception</p>
                    <p className="text-gray-300">Hotel Lounge - Light appetizers, cocktails, and reconnecting</p>
                    <p className="text-purple-300 text-sm italic mt-1">Dress: Comfortable Chic</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Friday */}
            <div className="bg-gradient-to-r from-purple-900/50 to-black/50 border-2 border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-500 transition-all duration-300" data-testid="friday-itinerary">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-500 text-black rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                  FRI
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white">Friday, March 6</h4>
                  <p className="text-purple-300 text-lg">Culture & Relaxation Day</p>
                </div>
              </div>
              <div className="ml-20 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">10:00 AM</span>
                  <div>
                    <p className="text-white font-semibold">Elegant Brunch</p>
                    <p className="text-gray-300">The Ivy Hotel Baltimore or Woodberry Kitchen</p>
                    <p className="text-gray-400 text-sm">Plant-based & seafood options available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">1:00 PM</span>
                  <div>
                    <p className="text-white font-semibold">Museum Visit</p>
                    <p className="text-gray-300">Walters Art Museum or Baltimore Museum of Art</p>
                    <p className="text-gray-400 text-sm">World-class collections in beautiful settings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">4:00 PM</span>
                  <div>
                    <p className="text-white font-semibold">Spa Afternoon</p>
                    <p className="text-gray-300">The Spa at Four Seasons Baltimore</p>
                    <p className="text-gray-400 text-sm">Massages, facials, relaxation lounges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">7:30 PM</span>
                  <div>
                    <p className="text-white font-semibold">Light Evening Bites</p>
                    <p className="text-gray-300">Wine bar or tapas at The Bygone (rooftop views)</p>
                    <p className="text-purple-300 text-sm italic mt-1">Dress: Casual Elegant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Saturday */}
            <div className="bg-gradient-to-r from-purple-900/50 to-black/50 border-2 border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-500 transition-all duration-300" data-testid="saturday-itinerary">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-500 text-black rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                  SAT
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white">Saturday, March 7</h4>
                  <p className="text-purple-300 text-lg">Main Celebration Day 🎉</p>
                </div>
              </div>
              <div className="ml-20 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">10:00 AM</span>
                  <div>
                    <p className="text-white font-semibold">Free Morning</p>
                    <p className="text-gray-300">Relax, explore Inner Harbor, or optional National Aquarium visit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">1:00 PM</span>
                  <div>
                    <p className="text-white font-semibold">Optional Activity</p>
                    <p className="text-gray-300">American Visionary Art Museum or harbor cruise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">6:30 PM</span>
                  <div>
                    <p className="text-white font-semibold text-xl">✨ GRAND BIRTHDAY DINNER ✨</p>
                    <p className="text-gray-300">Charleston Restaurant (James Beard Award Winner)</p>
                    <p className="text-gray-400 text-sm">Private dining room - Exquisite tasting menu with wine pairings</p>
                    <p className="text-gray-400 text-sm">Custom plant-based & seafood options</p>
                    <p className="text-purple-300 text-sm italic mt-2">Dress: Elegant Evening Wear - Black, Gold, Purple Theme</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sunday */}
            <div className="bg-gradient-to-r from-purple-900/50 to-black/50 border-2 border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-500 transition-all duration-300" data-testid="sunday-itinerary">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-500 text-black rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                  SUN
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white">Sunday, March 8</h4>
                  <p className="text-purple-300 text-lg">Farewell Brunch</p>
                </div>
              </div>
              <div className="ml-20 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">11:00 AM</span>
                  <div>
                    <p className="text-white font-semibold">Farewell Brunch</p>
                    <p className="text-gray-300">Gertrude's at the BMA or The Elephant</p>
                    <p className="text-gray-400 text-sm">Celebrate the memories made over one last meal together</p>
                    <p className="text-purple-300 text-sm italic mt-1">Dress: Comfortable Brunch Attire</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 font-semibold min-w-[120px]">2:00 PM</span>
                  <span className="text-gray-200">Check-out & Departures</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Recommendations */}
      <div className="py-16 bg-gradient-to-r from-black via-purple-950 to-black">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-yellow-500 mb-12">Recommended Hotels</h3>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-purple-900/30 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500 transition-all" data-testid="hotel-option-1">
              <h4 className="text-2xl font-bold text-white mb-2">Four Seasons Baltimore</h4>
              <p className="text-purple-300 mb-3">⭐⭐⭐⭐⭐ Luxury</p>
              <p className="text-gray-300 text-sm mb-3">200 International Drive, Baltimore, MD 21202</p>
              <p className="text-gray-400 text-sm mb-2">$250-350/night</p>
              <p className="text-gray-300 text-sm">Harbor views, world-class spa, central location</p>
            </div>
            <div className="bg-purple-900/30 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500 transition-all" data-testid="hotel-option-2">
              <h4 className="text-2xl font-bold text-white mb-2">The Hotel Revival</h4>
              <p className="text-purple-300 mb-3">⭐⭐⭐⭐ Boutique</p>
              <p className="text-gray-300 text-sm mb-3">101 W Monument St, Baltimore, MD 21201</p>
              <p className="text-gray-400 text-sm mb-2">$180-250/night</p>
              <p className="text-gray-300 text-sm">Stylish, hip vibes, rooftop bar, art-filled</p>
            </div>
            <div className="bg-purple-900/30 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500 transition-all" data-testid="hotel-option-3">
              <h4 className="text-2xl font-bold text-white mb-2">Sagamore Pendry</h4>
              <p className="text-purple-300 mb-3">⭐⭐⭐⭐⭐ Luxury</p>
              <p className="text-gray-300 text-sm mb-3">1715 Thames St, Baltimore, MD 21231</p>
              <p className="text-gray-400 text-sm mb-2">$300-450/night</p>
              <p className="text-gray-300 text-sm">Waterfront luxury, recreation pier, elegant rooms</p>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-8 text-sm">Group discount codes will be provided upon RSVP confirmation</p>
        </div>
      </div>

      {/* RSVP Section */}
      <div className="py-20 bg-black/60" id="rsvp">
        <div className="container mx-auto px-4">
          <h3 className="text-5xl font-bold text-center text-yellow-500 mb-4">RSVP</h3>
          <p className="text-center text-gray-300 mb-12 text-xl">Please respond by January 15, 2026</p>
          
          {stats && (
            <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-purple-900/40 to-black/40 rounded-xl p-6 text-center" data-testid="rsvp-stats">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-3xl font-bold text-yellow-500">{stats.attending}</p>
                  <p className="text-gray-300">Attending</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-500">{stats.total_guests}</p>
                  <p className="text-gray-300">Total Guests</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-500">{stats.total_rsvps}</p>
                  <p className="text-gray-300">Responses</p>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/50 to-black/50 border-2 border-yellow-500/30 rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12" data-testid="rsvp-success">
                <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h4 className="text-3xl font-bold text-white mb-2">Thank You!</h4>
                <p className="text-xl text-gray-300">Your RSVP has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="rsvp-form">
                <div>
                  <label className="block text-white font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    data-testid="rsvp-name-input"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    data-testid="rsvp-email-input"
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({...rsvpData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    data-testid="rsvp-phone-input"
                    value={rsvpData.phone}
                    onChange={(e) => setRsvpData({...rsvpData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Will you be attending? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        data-testid="rsvp-attending-yes"
                        checked={rsvpData.attending}
                        onChange={() => setRsvpData({...rsvpData, attending: true})}
                        className="w-5 h-5"
                      />
                      <span className="text-white">Yes, I'll be there!</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        data-testid="rsvp-attending-no"
                        checked={!rsvpData.attending}
                        onChange={() => setRsvpData({...rsvpData, attending: false})}
                        className="w-5 h-5"
                      />
                      <span className="text-white">Sorry, can't make it</span>
                    </label>
                  </div>
                </div>
                {rsvpData.attending && (
                  <div>
                    <label className="block text-white font-semibold mb-2">Number of Guests (including you) *</label>
                    <select
                      data-testid="rsvp-guest-count"
                      value={rsvpData.guest_count}
                      onChange={(e) => setRsvpData({...rsvpData, guest_count: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white focus:border-yellow-500 focus:outline-none"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-white font-semibold mb-2">Dietary Restrictions</label>
                  <input
                    type="text"
                    data-testid="rsvp-dietary-input"
                    value={rsvpData.dietary_restrictions}
                    onChange={(e) => setRsvpData({...rsvpData, dietary_restrictions: e.target.value})}
                    placeholder="Vegetarian, vegan, allergies, etc."
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Message for RoSeé</label>
                  <textarea
                    data-testid="rsvp-message-input"
                    value={rsvpData.message}
                    onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}
                    rows="3"
                    placeholder="Share your birthday wishes!"
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  data-testid="rsvp-submit-button"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Submit RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Flyer Download Section */}
      <div className="py-16 bg-gradient-to-b from-purple-950/50 to-black">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-yellow-500 mb-6">Download Event Flyer</h3>
          <p className="text-xl text-gray-300 mb-8">Share the celebration with friends!</p>
          <button
            onClick={downloadFlyer}
            data-testid="download-flyer-button"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-6 h-6" />
            Download Flyer
          </button>
          <div ref={flyerRef} className="hidden"></div>
        </div>
      </div>

      {/* Eventbrite Info Section */}
      <div className="py-16 bg-black/60">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-yellow-500 mb-8">Eventbrite Information</h3>
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/50 to-black/50 border-2 border-yellow-500/30 rounded-2xl p-8" data-testid="eventbrite-content">
            <h4 className="text-3xl font-bold text-white mb-6">RoSeé Murphy's 50th Birthday Celebration</h4>
            
            <div className="space-y-4 text-gray-200">
              <div>
                <p className="font-semibold text-yellow-500 mb-2">Event Title:</p>
                <p className="text-lg">RoSeé Murphy's 50th Birthday - 4 Days of Elegance & Fun</p>
              </div>
              
              <div>
                <p className="font-semibold text-yellow-500 mb-2">Description:</p>
                <p className="leading-relaxed">
                  Join us for an unforgettable 4-day celebration of RoSeé Murphy's 50th birthday in the beautiful 
                  Maryland/DMV area! This intimate gathering brings together close friends from across the country 
                  for a perfect blend of elegance, culture, relaxation, and fun.
                  <br/><br/>
                  Experience:
                  <br/>• World-class museum visits
                  <br/>• Luxurious spa treatments
                  <br/>• Exquisite dining at James Beard Award-winning restaurants
                  <br/>• Elegant brunches with stunning views
                  <br/>• A grand birthday dinner in black, gold, and purple splendor
                  <br/><br/>
                  This is more than a birthday party—it's a weekend of memories, laughter, and celebrating 
                  50 fabulous years of life!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="font-semibold text-yellow-500 mb-2">Date & Time:</p>
                  <p>March 5-8, 2026</p>
                  <p className="text-sm text-gray-400">Thursday 3:00 PM - Sunday 2:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold text-yellow-500 mb-2">Location:</p>
                  <p>Various venues in Baltimore, Maryland</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-yellow-500 mb-2">Event Category:</p>
                <p>Special Occasions • Birthday Celebration</p>
              </div>

              <div>
                <p className="font-semibold text-yellow-500 mb-2">Tags:</p>
                <p className="text-sm">birthday, 50th birthday, milestone, celebration, Maryland, DMV, elegant party, weekend getaway</p>
              </div>

              <div>
                <p className="font-semibold text-yellow-500 mb-2">Dress Code:</p>
                <p>Theme Colors: Black, Gold, Purple</p>
                <p className="text-sm text-gray-400">Elegant casual to formal depending on activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-t from-purple-950 to-black">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-yellow-500 mb-8">Questions?</h3>
          <div className="flex flex-col items-center gap-4 text-xl">
            <a href="mailto:roseecm@gmail.com" className="flex items-center gap-3 text-gray-200 hover:text-yellow-500 transition-colors" data-testid="contact-email">
              <Mail className="w-6 h-6" />
              roseecm@gmail.com
            </a>
            <a href="tel:202.740.1649" className="flex items-center gap-3 text-gray-200 hover:text-yellow-500 transition-colors" data-testid="contact-phone">
              <Phone className="w-6 h-6" />
              202.740.1649
            </a>
            <a href="https://askdogood.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-yellow-500 transition-colors" data-testid="website-link">
              askdogood.com
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-black text-center">
        <p className="text-gray-400 text-sm">© 2026 RoSeé Murphy • 50 Years of Fabulous</p>
        <p className="text-purple-500 font-semibold mt-2">Black • Gold • Purple</p>
      </div>
    </div>
  );
}

export default App;