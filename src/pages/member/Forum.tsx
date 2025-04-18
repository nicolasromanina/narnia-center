import React from 'react';
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';

const Forum: React.FC = () => {
  const discussions = [
    {
      id: '1',
      title: 'Bonnes pratiques React en 2024',
      author: 'Marie Laurent',
      category: 'React',
      replies: 23,
      views: 156,
      likes: 45,
      lastActivity: '2024-03-15T10:30:00'
    },
    {
      id: '2',
      title: 'Migration vers TypeScript : retour d\'expérience',
      author: 'Thomas Dubois',
      category: 'TypeScript',
      replies: 15,
      views: 98,
      likes: 32,
      lastActivity: '2024-03-14T16:45:00'
    },
    {
      id: '3',
      title: 'Optimisation des performances React',
      author: 'Sophie Martin',
      category: 'Performance',
      replies: 18,
      views: 124,
      likes: 38,
      lastActivity: '2024-03-13T09:15:00'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Forum de discussion</h1>
        <button className="btn btn-primary">
          Nouvelle discussion
        </button>
      </div>

      <div className="card">
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 cursor-pointer">
                    {discussion.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Par {discussion.author} · {new Intl.DateTimeFormat('fr-FR', { 
                      day: '2-digit', month: '2-digit', year: 'numeric', 
                      hour: '2-digit', minute: '2-digit' 
                    }).format(new Date(discussion.lastActivity))}
                  </p>

                  <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
                    {discussion.category}
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{discussion.replies}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{discussion.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{discussion.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;