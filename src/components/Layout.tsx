import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Users, BookOpen, Calendar, MessageSquare, Bell, UserPlus, FileText, Group, Home, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Supprimer les données d'authentification de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Rediriger vers la page de connexion
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/member/welcome" className="flex items-center space-x-2 hover:text-white/90 transition-colors">
              <Users className="h-8 w-8" />
              <span className="font-bold text-xl">Narnia</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/member/notifications" className="relative hover:text-white/90 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </Link>
              <button onClick={handleLogout} className="p-2 rounded-full hover:bg-indigo-700 transition-colors">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-lg h-[calc(100vh-4rem)] fixed">
          <nav className="p-4 space-y-1">
            <Link to="/member/welcome" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg transition-colors">
              <Home className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Home</span>
            </Link>
            <Link to="/member/resources" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Ressources</span>
            </Link>
            <Link to="/member/events" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg transition-colors">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Events</span>
            </Link>
            <Link to="/member/forum" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg transition-colors">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Forum</span>
            </Link>
            <Link to="/member/mentorship" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg transition-colors">
              <UserPlus className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Mentorat</span>
            </Link>
            <Link to="/member/library" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg transition-colors">
              <FileText className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Library</span>
            </Link>
            <Link to="/member/groups" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg transition-colors">
              <Group className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Groupes</span>
            </Link>
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;