import React, { useState } from 'react';
import { FileText, Video, Globe, BookOpen, Search, Filter } from 'lucide-react';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const resources = [{
    id: '1',
    title: 'Guide du développeur React',
    type: 'document',
    description: 'Un guide complet pour maîtriser React et ses fonctionnalités avancées.',
    date: '2024-03-10'
  },
  {
    id: '2',
    title: 'Webinaire: Architecture Microservices',
    type: 'video',
    description: 'Présentation détaillée sur la conception de microservices.',
    date: '2024-03-08'
  },
  {
    id: '3',
    title: 'Article: Tendances DevOps 2024',
    type: 'article',
    description: 'Les dernières tendances et pratiques en matière de DevOps.',
    date: '2024-03-05'
  }];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    const iconClass = "h-8 w-8 p-1.5 rounded-lg";
    switch (type) {
      case 'document': return <FileText className={`${iconClass} bg-blue-100 text-blue-600`} />;
      case 'video': return <Video className={`${iconClass} bg-red-100 text-red-600`} />;
      case 'article': return <Globe className={`${iconClass} bg-green-100 text-green-600`} />;
      default: return <BookOpen className={`${iconClass} bg-gray-100 text-gray-600`} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">📚 Ressources exclusives</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="document">Documents</option>
              <option value="video">Vidéos</option>
              <option value="article">Articles</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div 
            key={resource.id} 
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-out border border-gray-100 hover:border-blue-100"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {getIcon(resource.type)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{resource.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{resource.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <time className="text-gray-500">{new Date(resource.date).toLocaleDateString()}</time>
                    <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                      Accéder
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Resources;