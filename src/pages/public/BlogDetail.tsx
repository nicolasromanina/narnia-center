import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, BookOpen } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

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

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement de l’article');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched post:', data);
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Article non trouvé</p>
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
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            {post.excerpt}
          </p>
        </motion.div>
      </section>

      {/* Post Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <img
              src={post.image ? `http://localhost:5000${post.image}` : '/placeholder-image.jpg'}
              className="w-full h-96 object-cover rounded-2xl"
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
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{new Date(post.date).toLocaleDateString('fr-FR')}</time>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Placeholder for full content */}
            <div className="prose prose-lg text-gray-700">
              <p>{post.excerpt}</p>
              {/* Add post.body here if available in the future */}
              <p className="text-gray-500 italic">
                (Contenu complet à venir avec la mise à jour de l’article)
              </p>
            </div>

            <button
              onClick={() => navigate('/blog')}
              className="mt-6 inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
            >
              Retour aux Articles
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}