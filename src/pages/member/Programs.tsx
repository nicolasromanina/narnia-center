import React from 'react';
import { BookOpen, Brain, Users, Heart, Utensils, Award } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      title: "Educational Support",
      icon: BookOpen,
      description: "Comprehensive academic assistance including tutoring, mentoring, and resources.",
      features: [
        "One-on-one tutoring",
        "Homework assistance",
        "STEM workshops",
        "College preparation"
      ]
    },
    {
      title: "Nutrition Program",
      icon: Utensils,
      description: "Ensuring access to healthy meals and nutrition education for growing minds.",
      features: [
        "Daily healthy meals",
        "Nutrition education",
        "Cooking classes",
        "Family meal planning"
      ]
    },
    {
      title: "Leadership Development",
      icon: Users,
      description: "Building future leaders through comprehensive skill development programs.",
      features: [
        "Public speaking",
        "Project management",
        "Team building",
        "Community service"
      ]
    },
    {
      title: "Mental Health Support",
      icon: Brain,
      description: "Professional counseling and emotional support services for youth.",
      features: [
        "Individual counseling",
        "Group therapy",
        "Stress management",
        "Family support"
      ]
    },
    {
      title: "Health & Wellness",
      icon: Heart,
      description: "Promoting physical and mental well-being through various activities.",
      features: [
        "Sports programs",
        "Fitness classes",
        "Health education",
        "Wellness workshops"
      ]
    },
    {
      title: "Youth Achievement",
      icon: Award,
      description: "Recognition and rewards program for outstanding youth accomplishments.",
      features: [
        "Academic awards",
        "Leadership recognition",
        "Community service awards",
        "Talent showcases"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive support systems designed to nurture and empower youth through various stages of development.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div key={program.title} className="bg-white rounded-lg shadow-md p-8">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{program.title}</h2>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <ul className="space-y-3">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 text-sm">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories of impact from our program participants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Student Success Story"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Maria's Journey</h3>
                <p className="text-gray-600">
                  "The tutoring program helped me improve my grades and gain confidence. Now I'm heading to college with a scholarship!"
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488998527040-85054a85150e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Leadership Program Success"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">James's Growth</h3>
                <p className="text-gray-600">
                  "Through the leadership program, I discovered my passion for community service and developed valuable skills."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Health Program Impact"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sarah's Transformation</h3>
                <p className="text-gray-600">
                  "The health and wellness program taught me the importance of self-care and maintaining a healthy lifestyle."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Programs</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards a brighter future. Enroll in our programs today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-white text-purple-600 px-8 py-3 rounded-md hover:bg-gray-100 text-lg font-semibold">
              Enroll Now
            </a>
            <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-purple-600 text-lg font-semibold">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;