import { useState, useEffect } from 'react';
import { Calendar, Tag, BookOpen, Edit, Trash2, X, PlusCircle, Search, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function EditPostModal({ post, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    readingTime: post.readingTime,
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const response = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      const responseData = await response.json();
      console.log('Update response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update post');
      }

      onUpdate(responseData);
      alert('Post updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
      alert(error.message || 'Failed to update post');
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

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-8"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            {post.image && !formData.image && (
              <p className="mt-2 text-sm text-gray-600">Current: {post.image}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 text-white font-semibold ${
                isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } transition-colors`}
            >
              <PlusCircle className="h-5 w-5" />
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setIsAuthenticated(true);
      if (user.isAdmin && user.email === 'nicolasromanina@gmail.com') {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/posts', {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        console.log('Fetched posts:', data);
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post._id !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      alert(error.message || 'Failed to delete post');
    }
  };

  const handleUpdate = (updatedPost) => {
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-blue-900/80">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
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
              Blog Posts
            </motion.h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Discover our latest articles and insights
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
                  placeholder="Search posts..."
                  className="w-full pl-14 pr-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-none text-white placeholder-gray-200 focus:ring-2 focus:ring-white"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-200" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {filteredPosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-60">
                  {post.image ? (
                    <img
                      src={`http://localhost:5000${post.image}`}
                      alt={post.title}
                      className="h-full w-full object-cover transform group-hover:scale-105 transition-transform"
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load backend image: http://localhost:5000${post.image}`);
                        e.target.src = post.image;
                        e.target.onerror = () => {
                          console.error(`Failed to load frontend image: ${post.image}`);
                          e.target.src = '/placeholder-image.jpg';
                        };
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                      <span>{post.readingTime}</span>
                    </div>
                    <p className="line-clamp-3">{post.excerpt}</p>
                  </div>

                  {isAdmin && (
                    <div className="mt-6 flex justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingPost(post)}
                        className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        <Edit className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(post._id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-2xl text-gray-400 mb-4">No matching posts found</div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </div>

      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default Blogs;