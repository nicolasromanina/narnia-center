import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Calendar, Tag, BookOpen } from 'lucide-react';
import { FiArrowUpRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Animation configurations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch posts from API
  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched posts:', data);
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-red-500">Erreur : {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50/50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/noise-texture.png')]" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Découvrez la Culture Malgache
            <span className="block mt-2 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
              À Travers Nos Histoires
            </span>
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Explorez les récits, traditions et actualités de la communauté malgache
          </p>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <motion.article 
              key={post._id}
              variants={itemVariants}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-out"
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-purple-100/30 transition-colors" />
              
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={post.image ? `http://localhost:5000${post.image}` : '/placeholder-image.jpg'}
                  className="h-64 w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  alt={post.title}
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: http://localhost:5000${post.image}`);
                    e.target.src = post.image || '/placeholder-image.jpg';
                    e.target.onerror = () => {
                      console.error(`Failed to load fallback image: ${post.image}`);
                      e.target.src = '/placeholder-image.jpg';
                    };
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-purple-500/90 backdrop-blur rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time>{new Date(post.date).toLocaleDateString('fr-FR')}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-gray-100/50">
                  <button 
                    onClick={() => navigate(`/blog/${post._id}`)}
                    className="flex items-center font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Lire l'Article
                    <FiArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Restez Connecté
            </h2>
            <p className="text-lg text-purple-50 mb-8">
              Inscrivez-vous à notre newsletter pour des mises à jour exclusives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Entrez votre email"
                className="flex-1 px-6 py-3 rounded-xl border border-purple-300/30 bg-white/10 placeholder-purple-200 text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                S'inscrire
              </button>
            </div>
          </div>
        </motion.div>
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
          Rejoignez Notre Mission
        </button>
      </motion.div>
    </div>
  );
}