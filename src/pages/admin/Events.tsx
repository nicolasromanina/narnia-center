import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Edit, Trash2, X, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    location: '',
    image: null
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user || !user.isAdmin || user.email !== 'nicolasromanina@gmail.com') {
      navigate('/login');
      return;
    }

    setIsAuthenticated(true);
  }, [navigate]);

  // Fetch events
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/events', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        console.log('Fetched events:', data);
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [isAuthenticated]);

  // Validate form for editing
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle edit button click
  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      location: event.location,
      image: null
    });
    setFormErrors({});
  };

  // Handle form change for editing
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (formErrors[name]) {
        setFormErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('date', formData.date);
      data.append('time', formData.time);
      data.append('description', formData.description);
      data.append('location', formData.location);
      if (formData.image) {
        data.append('image', formData.image);
      }

      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const response = await fetch(`http://localhost:5000/api/events/${editingEvent._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      const responseData = await response.json();
      console.log('Update response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update event');
      }

      setEvents(events.map(event => event._id === responseData._id ? responseData : event));
      alert('Event updated successfully!');
      closeModal();
    } catch (error) {
      console.error('Error updating event:', error);
      alert(error.message || 'Failed to update event');
    }
  };

  // Handle delete
  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents(events.filter(event => event._id !== eventId));
      alert('Event deleted successfully!');
    } catch (error) {
      alert(error.message || 'Failed to delete event');
    }
  };

  // Close edit modal
  const closeModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      location: '',
      image: null
    });
    setFormErrors({});
  };

  // Render loading, error, or no events
  if (!isAuthenticated) return null;
  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500">{error}</div>;
  if (events.length === 0) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">No events found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-indigo-900 to-blue-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            All Events
          </motion.h1>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events.map(event => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
            >
              {event.image && (
                <img
                  src={`http://localhost:5000${event.image}`}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    console.error(`Failed to load backend image: http://localhost:5000${event.image}`);
                    e.target.src = event.image; // Try frontend public folder
                    e.target.onerror = () => {
                      console.error(`Failed to load frontend image: ${event.image}`);
                      e.target.src = '/placeholder-image.jpg';
                    };
                  }}
                />
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{event.description}</p>
              <div className="flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(event)}
                  className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Edit className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(event._id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingEvent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Event</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.title ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="Enter event title"
                  />
                  {formErrors.title && <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.date ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    {formErrors.date && <p className="mt-1 text-sm text-red-500">{formErrors.date}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.time ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        placeholder="e.g., 9:00 AM - 5:00 PM"
                      />
                      <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    {formErrors.time && <p className="mt-1 text-sm text-red-500">{formErrors.time}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.location ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="Enter event location"
                    />
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {formErrors.location && <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.description ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="Describe your event..."
                  />
                  {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Image (optional)</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formData.image && (
                    <p className="mt-2 text-sm text-gray-600">Selected: {formData.image.name}</p>
                  )}
                  {editingEvent.image && !formData.image && (
                    <p className="mt-2 text-sm text-gray-600">Current: {editingEvent.image}</p>
                  )}
                </div>
                <div className="flex justify-end gap-4">
                  <motion.button
                    type="button"
                    onClick={closeModal}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                  >
                    Update Event
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Events;