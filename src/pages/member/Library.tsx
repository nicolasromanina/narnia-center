import React from 'react';
import { BookOpen, Download, Search } from 'lucide-react';

const Library: React.FC = () => {
  const resources = [
    {
      id: '1',
      title: 'Guide complet React 2024',
      type: 'Guide',
      category: 'Frontend',
      downloads: 234,
      size: '2.5 MB',
      lastUpdate: '2024-03-01'
    },
    {
      id: '2',
      title: 'Architecture Microservices',
      type: 'Documentation',
      category: 'Backend',
      downloads: 156,
      size: '1.8 MB',
      lastUpdate: '2024-02-28'
    },
    {
      id: '3',
      title: 'Sécurité des applications web',
      type: 'Guide',
      category: 'Sécurité',
      downloads: 189,
      size: '3.2 MB',
      lastUpdate: '2024-02-25'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bibliothèque de ressources</h1>
          <p className="text-gray-600 mt-2">Accédez à notre collection de guides et documentation technique</p>
        </div>
        <button className="btn btn-primary">
          Ajouter une ressource
        </button>
      </div>

      <div className="card">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Rechercher une ressource..."
                className="input pl-10"
              />
            </div>
          </div>
          <select className="select w-48">
            <option value="">Toutes les catégories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="security">Sécurité</option>
          </select>
        </div>

        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-100 rounded">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{resource.type}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{resource.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{resource.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  <Download className="h-4 w-4 inline mr-1" />
                  {resource.downloads} téléchargements
                </div>
                <button className="btn btn-secondary">
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;