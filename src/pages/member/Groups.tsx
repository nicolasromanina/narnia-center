import React from 'react';
import { Users, Calendar } from 'lucide-react';

const Groups: React.FC = () => {
  const groups = [
    {
      id: '1',
      name: 'React Enthusiasts',
      description: 'Groupe dédié aux passionnés de React et son écosystème.',
      members: 128,
      topics: ['React', 'Redux', 'Next.js'],
      lastActivity: '2024-03-15T14:30:00',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      name: 'DevOps Masters',
      description: 'Échangez sur les pratiques DevOps et l\'automatisation.',
      members: 95,
      topics: ['Docker', 'Kubernetes', 'CI/CD'],
      lastActivity: '2024-03-14T16:45:00',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3',
      name: 'Frontend Design',
      description: 'Pour les passionnés de design et d\'expérience utilisateur.',
      members: 156,
      topics: ['UI/UX', 'CSS', 'Design System'],
      lastActivity: '2024-03-13T09:15:00',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Groupes thématiques</h1>
          <p className="text-gray-600 mt-2">Rejoignez des groupes basés sur vos intérêts et expertises</p>
        </div>
        <button className="btn btn-primary">
          Créer un groupe
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="card hover:shadow-lg transition-shadow overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={group.image}
                alt={group.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
              <p className="text-gray-600">{group.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {group.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{group.members} membres</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Dernière activité : {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(group.lastActivity))}</span>

                </div>
              </div>

              <button className="btn btn-primary w-full">
                Rejoindre le groupe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;