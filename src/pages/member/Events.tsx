import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Events: React.FC = () => {
  const events = [
    {
      id: '1',
      title: 'Workshop React Avancé',
      description: 'Découvrez les fonctionnalités avancées de React et les meilleures pratiques de développement.',
      date: '2024-04-15T14:00:00',
      location: 'Salle de conférence A',
      capacity: 30,
      registered: 18
    },
    {
      id: '2',
      title: 'Meetup DevOps',
      description: 'Échangez avec des experts DevOps sur les dernières tendances et outils.',
      date: '2024-04-20T18:30:00',
      location: 'Espace de coworking Central',
      capacity: 50,
      registered: 35
    },
    {
      id: '3',
      title: 'Conférence Cybersécurité',
      description: 'Une journée dédiée à la sécurité informatique avec des intervenants de renom.',
      date: '2024-05-05T09:00:00',
      location: 'Centre de conventions',
      capacity: 100,
      registered: 75
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Événements à venir</h1>
        <button className="btn btn-primary">
          Créer un événement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {event.registered}/{event.capacity} places
                </span>
              </div>
              
              <p className="text-gray-600">{event.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.date), "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{event.registered} inscrits</span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button className="btn btn-secondary">
                  En savoir plus
                </button>
                <button className="btn btn-primary">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;