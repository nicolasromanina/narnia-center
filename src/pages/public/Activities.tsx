import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Award,
  Lightbulb,
  GraduationCap,
  Languages,
  Users,
  Search,
  HeartHandshake
} from 'lucide-react';
import leadership from "../../assets/images/leadership1.jpg";
import  education1  from "../../assets/images/education1.jpg";
import champion from "../../assets/images/certification 2.jpg";
import community from "../../assets/images/462554168_1229796754806392_3479548839373677386_n.jpg";
// Données des programmes
const programs = [
  {
    title: 'Leadership Development',
    description:
      'Empowering local leaders to drive positive change in their communities through comprehensive training.',
    schedule: 'Ongoing Program',
    icon: Target,
    image:leadership
  },
  {
    title: 'Cerfication',
    description:
      'Building a network of local ambassadors who lead initiatives, organize events, and inspire their communities to adopt healthier lifestyles.',
    schedule: 'Monthly Meetups',
    icon: Award,
    image:champion
  },
  {
    title: 'Innovation Hub',
    description:
      'Supporting local leaders in developing and implementing innovative solutions to community through resource sharing.',
    schedule: 'Continuous Engagement',
    icon: Lightbulb,
    image:education1
  },
  {
    title: 'Educational Programs',
    description:
      'Comprehensive educational initiatives focusing on transform lives and build a better future for young people,to succeed and have an impact.',
    schedule: 'Weekly Sessions',
    icon: GraduationCap,
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    title: 'Multilingual Support',
    description:
      'Breaking language barriers in education. Programs available in multiple languages ensure accessible information for diverse',
    schedule: 'Ongoing',
    icon: Languages,
    image:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    title: 'Community Engagement',
    description:
      'Building stronger communities through collaborative learning and cultural exchange. Foster understanding and respect',
    schedule: 'Weekly Forums',
    icon: Users,
    image:community
  },

];

// Composant de carte de programme
const ProgramCard = ({ program, index }) => {
  const IconComponent = program.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[420px] bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>

      <div className="absolute top-4 right-4">
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-lg">
          <IconComponent className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="mb-2 flex items-center gap-2">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            {program.schedule}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
        <p className="text-gray-200 line-clamp-3">{program.description}</p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </motion.div>
  );
};

// Composant principal
export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Section Hero */}
      <div className="relative h-[60vh] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
          }}
        />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent mb-6"
            >
              Empower Through Innovation
            </motion.h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Discover transformative programs blending leadership, education and community development.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative max-w-2xl mx-auto"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs..."
                className="w-full pl-12 pr-6 py-5 rounded-xl bg-white/10 backdrop-blur-sm border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Grille des programmes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatePresence mode='wait'>
          {filteredPrograms.length > 0 ? (
            <motion.div
              key="programs-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPrograms.map((program, index) => (
                <ProgramCard key={index} program={program} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 text-2xl mb-4">No programs found</div>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-6 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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