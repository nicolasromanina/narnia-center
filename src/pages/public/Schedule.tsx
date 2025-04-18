import React, { useState } from 'react';
import { Clock, Calendar, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const schedule = {
  monday: [
    { time: '08:00 AM', activity: 'Miracle Morning', location: 'Devotion - Prayer - Praise & Worship - Bible Study' },
    { time: '10:00 AM', activity: 'English Class', location: 'Reading - Listening - Story Telling - Speaking - Singing' },
    { time: '01:00 PM', activity: 'Korean Class', location: 'Writing - Reading - Listening - Gaming - Speaking' }
  ],
  tuesday: [
    { time: '08:00 AM', activity: 'Miracle Morning', location: 'Devotion - Prayer - Praise & Worship - Bible Study' },
    { time: '10:00 AM', activity: 'English Class', location: 'Reading - Listening - Story Telling - Speaking - Singing' },
    { time: '01:30 PM', activity: 'Computer Class', location: 'Excel - Word - PowerPoint - Access - Web Developing' }
  ],
  wednesday: [
    { time: '08:00 AM', activity: 'Miracle Morning', location: 'Devotion - Prayer - Praise & Worship - Bible Study' },
    { time: '10:00 AM', activity: 'English Class', location: 'Reading - Listening - Story Telling - Speaking - Singing' },
    { time: '01:30 AM', activity: 'English Class', location: 'English Reading Books' }
  ],
  thursday: [
    { time: '08:00 AM', activity: 'Miracle Morning', location: 'Devotion - Prayer - Praise & Worship - Study' },
    { time: '10:00 AM', activity: 'English Class', location: 'Reading - Listening - Story Telling - Speaking - Singing' },
    { time: '01:30 PM', activity: 'Computer Class', location: 'Excel - Word - PowerPoint - Access - Web Developing' }
  ],
  friday: [
    { time: '06:00 PM', activity: 'Music Klass', location: 'Guitar - Piano - Singing' }
  ],
  saturday: [
    { time: '10:00 AM', activity: 'Coffee & Connect', location: 'Fellowship' }
  ],
  sunday: [
    { time: '02:00 PM', activity: 'Sunday Worship', location: 'Worship & Praise - Teaching - Scripture Reading' },
    { time: '03:00 PM', activity: 'Fellowship', location: 'Fellowship - Bible Study' }
  ]
};

export default function Schedule() {
  // État pour le filtre par jour (null = tous les jours)
  const [activeDay, setActiveDay] = useState(null);
  const days = Object.keys(schedule);
  const displayedSchedule = activeDay ? { [activeDay]: schedule[activeDay] } : schedule;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Hero */}
      <header className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent mb-6"
              >
                Weekly Schedule
              </motion.h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Find the perfect time to join our activities and events
            </p>
          </div>
        </div>
      </header>

      {/* Navigation par onglets pour filtrer par jour */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveDay(null)}
            className={`px-4 py-2 rounded-full transition-colors ${activeDay === null ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-full transition-colors capitalize ${activeDay === day ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {day}
            </button>
          ))}
        </div>
      </section>

      {/* Grille des activités */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <AnimatePresence>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(displayedSchedule).map(([day, activities]) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-indigo-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white capitalize">{day}</h2>
                </div>
                <div className="p-6 space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <Clock className="h-5 w-5 text-indigo-600" />
                        <div>
                          <p className="font-medium">{activity.activity}</p>
                          <p className="text-sm text-gray-600">{activity.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
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
