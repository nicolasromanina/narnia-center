import React from 'react';
import { Bell, Calendar, MessageSquare, BookOpen, UserPlus } from 'lucide-react';

const Notifications: React.FC = () => {
  const notifications = [
    {
      id: '1',
      type: 'event',
      message: 'Nouvel événement : Workshop React Avancé le 15 avril',
      date: '2024-03-15T10:30:00',
      read: false
    },
    {
      id: '2',
      type: 'forum',
      message: 'Nouvelle réponse à votre discussion sur TypeScript',
      date: '2024-03-14T16:45:00',
      read: true
    },
    {
      id: '3',
      type: 'resource',
      message: 'Nouvelle ressource disponible : Guide DevOps 2024',
      date: '2024-03-13T09:15:00',
      read: false
    },
    {
      id: '4',
      type: 'mentorship',
      message: 'Demande de mentorat acceptée par Claire Bernard',
      date: '2024-03-12T14:20:00',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'forum':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'resource':
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      case 'mentorship':
        return <UserPlus className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Restez informé des dernières activités</p>
        </div>
        <button className="btn btn-secondary">
          Tout marquer comme lu
        </button>
      </div>

      <div className="card divide-y divide-gray-100">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-4 p-4 ${
              notification.read ? 'bg-white' : 'bg-indigo-50'
            }`}
          >
            <div className="p-2 bg-white rounded-lg shadow-sm">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                {notification.message}
              </p>
              <p className="text-sm text-gray-500 mt-1">
              {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(notification.date))}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Fermer</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;