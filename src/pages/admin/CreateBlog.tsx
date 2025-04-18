import { useState, useEffect } from 'react';
import { Calendar, Tag, BookOpen, PlusCircle, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    date: '',
    category: '',
    readingTime: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user || !user.isAdmin || user.email !== 'nicolasromanina@gmail.com') {
      navigate('/login');
      return;
    }

    setIsAuthenticated(true);
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.excerpt) newErrors.excerpt = 'Excerpt is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.readingTime) newErrors.readingTime = 'Reading time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('date', formData.date);
      data.append('category', formData.category);
      data.append('readingTime', formData.readingTime);
      if (formData.image) {
        data.append('image', formData.image);
      }

      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      const responseData = await response.json();
      console.log('Response:', responseData);
      if (responseData.image) {
        console.log('Image saved at:', `http://localhost:5000${responseData.image}`);
        console.log('Copy image to frontend/public/uploads for testing');
      }

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create post');
      }

      setFormData({
        title: '',
        excerpt: '',
        date: '',
        category: '',
        readingTime: '',
        image: null
      });
      alert('Post created successfully!');
      navigate('/blogs');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 bg-gradient-to-r from-indigo-900 to-blue-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Create New Blog Post
          </motion.h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Title *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="Enter post title"
                  />
                  <PenTool className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.excerpt ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="Enter a short excerpt"
                />
                {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
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
                      className={`w-full px-4 py-3 rounded-lg border ${errors.date ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="e.g., News, Culture"
                    />
                    <Tag className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reading Time *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="readingTime"
                    value={formData.readingTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.readingTime ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="e.g., 5 min"
                  />
                  <BookOpen className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.readingTime && <p className="mt-1 text-sm text-red-500">{errors.readingTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Image (optional)</label>
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
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold ${
                isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } transition-colors`}
            >
              <PlusCircle className="h-5 w-5" />
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateBlog;