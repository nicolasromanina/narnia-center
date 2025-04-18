import { HeartHandshake, Target, Quote, Users, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";
import team from '../../assets/images/team.jpg';
import testimonial1 from '../../assets/images/testimony.jpg';
import testimonial2 from '../../assets/images/leadership.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const testimonialVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent"
            >
              Shaping a Better Future
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto"
            >
              Empowering communities through sustainable innovation and compassionate action
            </motion.p>
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mt-16"
              variants={stagger}
            >
              {[
                { icon: Globe, title: "Global Reach", value: "10+ Regions", text: "Active projects nationwide" },
                { icon: Users, title: "Community", value: "1k+ Lives", text: "Positively impacted" },
                { icon: Award, title: "Recognition", value: "5+ Awards", text: "For social innovation" },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="p-8 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <item.icon className="h-12 w-12 mx-auto mb-6 text-indigo-300 group-hover:text-white transition-colors" />
                  <h3 className="text-3xl font-bold mb-2">{item.value}</h3>
                  <p className="font-semibold text-indigo-200 group-hover:text-white">{item.title}</p>
                  <p className="text-sm text-indigo-100 mt-2">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-28 max-w-7xl mx-auto px-4">
        <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col lg:flex-row gap-16 items-center"
        >
          <motion.div 
            variants={fadeInUp}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
              <img 
                src={team} 
                className="w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-500"
                alt="Our dedicated team"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold">Our Global Family</h3>
                <p className="text-indigo-100">500+ dedicated members nationwide</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={stagger}
            className="lg:w-1/2 space-y-12"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Our Evolution
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since our inception in 2022, we've transformed from a grassroots movement into a global force for good. 
                Our journey has been marked by relentless innovation and deep community engagement.
              </p>
            </motion.div>

            <motion.div 
              variants={stagger}
              className="space-y-8"
            >
              {[
                {
                  icon: Target,
                  title: "2025 Vision",
                  content: "Empower 2k+ people through leadership, education, health, nutrition and sustainable infrastructure",
                  color: "text-blue-600",
                },
                {
                  icon: HeartHandshake,
                  title: "Core Philosophy",
                  content: "Community-driven solutions with measurable, lasting impact",
                  color: "text-indigo-600",
                },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="flex gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`${item.color} flex-shrink-0`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 bg-indigo-900/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
            >
              Voices of Impact
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              Hear from those whose lives we've touched and partners who've joined our mission
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                image: testimonial1,
                name: "Jesska RANDRIANARIVELO",
                role: "Economy Student, Antanananarivo",
                text: "Their Scholarship program opened doors I never thought possible. I am now pursuing my dream career.",
              },
              {
                image: testimonial2,
                name: "Hans ANDRIAMAMONJY",
                role: "Medical Student, Antanananarivo",
                text: "Their mentorship and resources have been invaluable. I am grateful for their support. I am now a proud member of the team.",
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={testimonialVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <Quote className="absolute top-8 right-8 h-12 w-12 text-indigo-100 group-hover:text-indigo-200 transition-colors" />
                <div className="flex items-center gap-6 mb-6">
                  <img 
                    src={testimonial.image} 
                    className="w-16 h-16 rounded-full object-cover border-4 border-indigo-100"
                    alt={testimonial.name}
                  />
                  <div>
                    <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                    <p className="text-indigo-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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