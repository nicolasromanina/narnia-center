import React, { useState } from 'react';
import {
  Target,
  Heart,
  Users,
  Star,
  Book,
  Award,
  Lightbulb,
  GraduationCap,
  Languages,
  Globe,
  ArrowRight,
  X,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Configuration des couleurs
const accentGradient = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)';
const hoverGradient = 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)';

// Définition des valeurs de mission
const missionValues = [
  {
    icon: Heart,
    title: 'Love',
    description:
      "We believe in showing Christ's love through our actions and relationships with others.",
  },
  {
    icon: Users,
    title: 'Community',
    description:
      "Building strong, supportive relationships that reflect God's love and care.",
  },
  {
    icon: Star,
    title: 'Excellence',
    description:
      "Striving for excellence in all we do as a reflection of God's perfect nature.",
  },
];

// Définition des programmes
const programs = [
  {
    icon: <Target className="h-8 w-8 text-blue-900" />,
    title: 'Leadership Development',
    description:
      'Empowering local leaders to drive positive change in their communities through comprehensive training in health advocacy, project management, and community organizing.',
    features: [
      'Leadership workshops',
      'Mentoring programs',
      'Project management',
      'Public speaking',
    ],
  },
  {
    icon: <Award className="h-8 w-8 text-blue-900" />,
    title: 'Community Champions',
    description:
      'Building a network of local health ambassadors who lead initiatives, organize events, and inspire their communities to adopt healthier lifestyles.',
    features: [
      'Ambassador training',
      'Network building',
      'Event planning',
      'Impact measurement',
    ],
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-blue-900" />,
    title: 'Innovation Hub',
    description:
      'Supporting local leaders in developing and implementing innovative solutions to community health challenges through collaboration and resource sharing.',
    features: [
      'Innovation workshops',
      'Resource access',
      'Collaboration tools',
      'Funding guidance',
    ],
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-blue-900" />,
    title: 'Educational Programs',
    description:
      'Comprehensive educational initiatives focusing on nutrition science, health literacy, and sustainable living practices. Our programs cater to all age groups and learning styles.',
    features: [
      'STEM education',
      'Interactive workshops',
      'Digital learning',
      'Certification courses',
    ],
  },
  {
    icon: <Languages className="h-8 w-8 text-blue-900" />,
    title: 'Multilingual Support',
    description:
      'Breaking language barriers in health education. Our programs are available in multiple languages to ensure accessible nutrition information for diverse communities.',
    features: [
      'Multilingual resources',
      'Cultural adaptation',
      'Translation services',
      'Language workshops',
    ],
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-900" />,
    title: 'Cultural Exchange',
    description:
      'Celebrating diversity through food and health traditions. Learn about nutritious recipes and wellness practices from different cultures around the world.',
    features: [
      'Cultural festivals',
      'Traditional cooking',
      'Global perspectives',
      'Community sharing',
    ],
  },
];

// Section héro avec effet parallaxe amélioré
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="relative h-[90vh] overflow-hidden" aria-label="Hero section">
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1470075801209-17f9ec0cada6")',
          y,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent/70 to-black/90" />
      </motion.div>

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent mb-6"
          >
            Empowering Leadership Through Education and Innovation
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Empowering communities through holistic transformation and sustainable growth
          </motion.p>
          <motion.button
            className="mt-8 px-8 py-4 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Join Our Mission
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Section Mission avec effet de défilement progressif amélioré
function MissionSection({ onMoreInfo }) {
  return (
    <section className="relative py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
        >
          <motion.div
            className="space-y-8"
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -50 },
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full">
              <Target className="h-5 w-5" />
              <span className="font-semibold">Our Purpose</span>
            </div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: accentGradient }}>
              Creating Lasting Impact Through Faith & Action
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We are committed to building bridges of hope and opportunity, fostering spiritual growth,
              and equipping individuals with tools for holistic development.
            </p>
            <button
              onClick={onMoreInfo}
              className="group relative px-8 py-4 font-medium text-white rounded-lg overflow-hidden transition-all"
              style={{ background: accentGradient }}
            >
              <span className="relative z-10">Explore Our Vision</span>
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
            </button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: 50 },
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden relative group">
                <img
                  src={`https://source.unsplash.com/random/800x800?community=${i}`}
                  alt=""
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Section Valeurs avec effet de carte interactive amélioré
function ValuesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Core Values
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Principles That Guide Our Journey
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {missionValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-100 transition-all" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
                       style={{ background: accentGradient }}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Section Programmes avec effet de superposition amélioré
function ProgramsSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Transformative Initiatives
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-6">{program.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{program.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{program.description}</p>
                <ul className="space-y-3">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white rounded-lg transition-all hover:gap-3"
            style={{ background: accentGradient }}
          >
            Start Your Leadership Journey
            <ArrowRight className="h-5 w-5 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Modale améliorée avec animation fluide
function Modal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 relative shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-3xl font-bold mb-6">Our Strategic Vision</h3>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p>
                By 2030, we aim to establish a global network of community hubs that:
              </p>
              <ul className="space-y-4 list-disc pl-6">
                <li>Empower 1 million local leaders worldwide</li>
                <li>Reduce health disparities by 40% in target communities</li>
                <li>Launch 500+ cross-cultural exchange programs annually</li>
                <li>Develop AI-powered educational platforms for personalized learning</li>
              </ul>
              <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl mt-8">
                <h4 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">
                  Current Impact Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {['25K+ Trained Leaders', '40 Countries', '92% Satisfaction', '200+ Partnerships'].map((stat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Page principale
export default function MissionPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="dark:bg-gray-900 transition-colors duration-300">
      <HeroSection />
      <MissionSection onMoreInfo={() => setModalOpen(true)} />
      <ValuesSection />
      <ProgramsSection />
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}