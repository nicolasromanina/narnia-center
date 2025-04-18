import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Validate the form fields
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Please enter your name.";
    if (!formData.email) {
      errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.subject) errors.subject = "Please enter a subject.";
    if (!formData.message) errors.message = "Please enter your message.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ submit: data.error || "An error occurred. Please try again." });
      } else {
        setSuccess(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    }
    setLoading(false);
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Remove error for the specific field if it exists
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
          <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent mb-6"
              >
                Contact Us
            </motion.h1>
            <p className="text-xl max-w-2xl mx-auto">
              We’re here to help. Feel free to reach out with any questions.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-gray-600">+261 38 43 714 74</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-gray-600">contact@narniacenter.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Address</h3>
                  <p className="text-gray-600">
                    123 Tsiadana<br />
                    Antananarivo, Madagascar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            {success && <div className="mb-4 text-green-600">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={errors.name ? "true" : "false"}
                  className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                  required
                />
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                  required
                />
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={errors.subject ? "true" : "false"}
                  className={`mt-1 block w-full rounded-md border ${errors.subject ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                  required
                />
                {errors.subject && <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  aria-invalid={errors.message ? "true" : "false"}
                  className={`mt-1 block w-full rounded-md border ${errors.message ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                  required
                />
                {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
              </div>

              {errors.submit && <div className="text-red-500 text-sm">{errors.submit}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {loading ? 'Sending...' : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
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
