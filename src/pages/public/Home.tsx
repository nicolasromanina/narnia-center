import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronDown, Users, Calendar, Heart, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import  education1  from "../../assets/images/education1.jpg";
import header1 from "../../assets/images/education3.jpg";
import header2 from "../../assets/images/member.jpg";
import fellowship from "../../assets/images/education6.jpg";
import leadership from "../../assets/images/leadership1.jpg";
// Configuration d'animation
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

// Composant pour animer un compteur
const animateValue = (start: number, end: number, duration: number, setter: { (val: any): void; (val: any): void; (val: any): void; (arg0: number): void; }) => {
  const startTimestamp = performance.now();
  const step = (timestamp) => {
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    setter(Math.floor(progress * (end - start) + start));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

// Composant Hero (bannière)
function Hero({ headerImages, currentImageIndex }) {
  return (
    <header 
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
      role="banner"
      aria-label="Site hero banner"
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ 
            duration: 1.2,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ 
              backgroundImage: `url("${headerImages[currentImageIndex]}")`,
              willChange: 'transform'
            }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/80" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/80" />
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 text-center px-4 space-y-8"
      >
        <motion.div variants={fadeInUp}>
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400"
            variants={textVariant(0.1)}
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
          >
            Mobilizing Workers for a Plentiful Harvest
          </motion.h1>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl font-light max-w-2xl mx-auto tracking-wide leading-relaxed"
            variants={textVariant(0.2)}
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Transforming lives through faith, leadership, education, and community empowerment
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={fadeInUp}
        >
          <Link 
            to="/mission"
            className="group relative flex items-center gap-3 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-2xl hover:shadow-3xl border border-white/20 hover:border-white/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-lg font-medium tracking-wide">Explore Our Mission</span>
            <ChevronDown 
              size={24} 
              className="group-hover:translate-y-1 transition-transform duration-200 group-hover:text-cyan-300" 
            />
          </Link>
          
          <Link 
            to="/contact"
            className="group relative flex items-center gap-3 bg-gradient-to-br from-blue-500 to-purple-500 px-8 py-4 rounded-2xl hover:bg-gradient-to-bl transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="text-lg font-medium tracking-wide">Join Community</span>
            <ArrowRight 
              size={24} 
              className="group-hover:translate-x-1.5 transition-transform duration-200 group-hover:text-cyan-100" 
            />
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {headerImages.map((_, index) => (
          <motion.button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`relative h-2 rounded-full overflow-hidden ${
              currentImageIndex === index ? 'w-16' : 'w-8'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ width: 0 }}
              animate={{ width: currentImageIndex === index ? '100%' : 0 }}
              transition={{ duration: 5 }}
            />
          </motion.button>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <motion.div
          className="w-12 h-12 rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowDown className="text-white animate-bounce" />
        </motion.div>
      </div>
    </header>
  );
}

// Variants d'animation
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const textVariant = (delay) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      type: 'spring',
      stiffness: 100
    }
  }
});

// Composant Stats (compteurs)
function Stats({ isVisible, memberCount, activityCount, impactCount }) {
  const statsData = [
    { icon: Users, value: memberCount, label: 'Active Members', suffix: '+' },
    { icon: Calendar, value: activityCount, label: 'Active Programs', suffix: '' },
    { icon: Heart, value: impactCount, label: 'Lives Impacted', suffix: '+' },
  ];

  return (
    <motion.div 
      id="stats"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl mx-4 -translate-y-24 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ scale: 0.8 }}
              animate={isVisible ? { scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-gradient-to-br from-white/5 to-white/0 rounded-xl hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-4">
                <stat.icon 
                  size={40} 
                  className="text-blue-400 group-hover:text-purple-300 transition-colors duration-300" 
                />
              </div>
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Composant FeaturedActivities
function FeaturedActivities({ isVisible }) {
  const activities = [
    {
      title: 'Educational Programs',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      description: 'Transformative education initiatives empowering youth with essential life skills and leadership training.',
    },
    {
      title: 'Leadership Development',
      image: leadership,
      description: 'Comprehensive leadership training in health advocacy, project management, and community organizing.',
    },
    {
      title: 'Community Fellowship',
      image: fellowship,
      description: 'Building meaningful relationships through shared experiences and spiritual growth.',
    },
  ];

  return (
    <section id="activities" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-4xl sm:text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300"
        >
          Our Initiatives
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 }}
              className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-4">
                <h3 className="text-2xl font-bold text-white">{activity.title}</h3>
                <p className="text-gray-300 line-clamp-3">{activity.description}</p>
                <Link
                  to="/activities"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Discover More
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant CTA (appel à l'action)
function CTA({ isVisible }) {
  return (
    <section id="cta" className="relative py-24 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 to-transparent animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-1 shadow-2xl">
          <div className="bg-gray-900 rounded-3xl p-12 space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join our growing community of change-makers and start your transformation journey today.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [currentHeaderImage, setCurrentHeaderImage] = useState(0);
  const [visibility, setVisibility] = useState({ stats: false, activities: false, cta: false });
  const [counters, setCounters] = useState({ members: 0, activities: 0, impact: 0 });

  const headerImages = [
    header2,
    header1,
    education1
  ];

  // Gestion du défilement
  const updateVisibility = useCallback(() => {
    const sections = ['stats', 'activities', 'cta'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setVisibility(prev => ({ ...prev, [section]: true }));
        }
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      updateVisibility();
      if (visibility.stats) {
        animateValue(0, 500, 2000, val => setCounters(prev => ({ ...prev, members: val })));
        animateValue(0, 25, 1200, val => setCounters(prev => ({ ...prev, activities: val })));
        animateValue(0, 1000, 2000, val => setCounters(prev => ({ ...prev, impact: val })));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateVisibility, visibility.stats]);

  // Changement d'image du header
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeaderImage(prev => (prev + 1) % headerImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Hero headerImages={headerImages} currentImageIndex={currentHeaderImage} />
      <Stats 
        isVisible={visibility.stats}
        memberCount={counters.members}
        activityCount={counters.activities}
        impactCount={counters.impact}
      />
      <FeaturedActivities isVisible={visibility.activities} />
      <CTA isVisible={visibility.cta} />
    </div>
  );
}