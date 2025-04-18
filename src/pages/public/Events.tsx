import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, X, Search, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function RegisterModal({ event, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 relative"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join {event.title}</h2>
              <p className="text-gray-500">{event.date} • {event.location}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl transition-all font-semibold"
              >
                Confirm Registration
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        console.log('Fetched events:', data);
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-blue-900/80">
          <img
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18"
            alt="Background"
            className="w-full h-full object-cover mix-blend-overlay"
            loading="eager"
          />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent mb-6"
            >
              Community Events
            </motion.h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Connect, grow, and celebrate through our transformative gatherings
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-14 pr-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-none text-white placeholder-gray-200 focus:ring-2 focus:ring-white"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-200" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key="events-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-60">
                    <img
                      src={event.image.startsWith('http') ? event.image : `http://localhost:5000${event.image}`}
                      alt={event.title}
                      className="h-full w-full object-cover transform group-hover:scale-105 transition-transform"
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load backend image: http://localhost:5000${event.image}`);
                        e.target.src = event.image; // Try frontend public folder
                        e.target.onerror = () => {
                          console.error(`Failed to load frontend image: ${event.image}`);
                          e.target.src = '/placeholder-image.jpg';
                        };
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-2">
                        Upcoming
                      </span>
                      <h3 className="text-xl font-bold">{event.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-indigo-600" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-indigo-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-indigo-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors font-medium"
                    >
                      Register Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-2xl text-gray-400 mb-4">No matching events found</div>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RegisterModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      {/* Floating CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2 hover:shadow-2xl">
          <HeartHandshake className="h-5 w-5" />
          Join Our Mission
        </button>
      </motion.div>
    </div>
  );
}