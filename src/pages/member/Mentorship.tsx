import React from 'react';
import { UserPlus, Star, Clock, Book } from 'lucide-react';

const Mentorship: React.FC = () => {
  const mentors = [
    {
      id: '1',
      name: 'Dr. Alexandre Dupont',
      title: 'Expert en Architecture Logicielle',
      specialties: ['React', 'Node.js', 'Architecture Cloud'],
      rating: 4.9,
      experience: '15 ans',
      availability: 'Lundi et Mercredi',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '2',
      name: 'Claire Bernard',
      title: 'Lead Developer Frontend',
      specialties: ['React', 'TypeScript', 'UX/UI'],
      rating: 4.8,
      experience: '10 ans',
      availability: 'Mardi et Jeudi',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '3',
      name: 'Marc Leblanc',
      title: 'Expert DevOps',
      specialties: ['Docker', 'Kubernetes', 'CI/CD'],
      rating: 4.7,
      experience: '12 ans',
      availability: 'Vendredi',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programme de Mentorat</h1>
          <p className="text-gray-600 mt-2">Connectez-vous avec des experts pour accélérer votre développement professionnel</p>
        </div>
        <button className="btn btn-primary">
          Devenir mentor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                  <p className="text-sm text-gray-500">{mentor.title}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-medium">{mentor.rating}</span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Book className="h-4 w-4" />
                  <span>Expertise : {mentor.specialties.join(', ')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Disponibilité : {mentor.availability}</span>
                </div>
              </div>

              <button className="btn btn-primary w-full">
                Demander un mentorat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentorship;