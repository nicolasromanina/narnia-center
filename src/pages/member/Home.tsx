import React from 'react';
import { Calendar, Users, BookOpen, Bell } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Welcome Card */}
      <div className="card bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome back to Narnia Hub</h1>
        <p className="text-indigo-100 opacity-90">
          Your centralized platform to access resources, events, and collaborate with other members.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Calendar, title: "Upcoming Events", value: "3 events this week", bg: "bg-blue-100", text: "text-blue-600" },
          { icon: Users, title: "Active Members", value: "128 members", bg: "bg-green-100", text: "text-green-600" },
          { icon: BookOpen, title: "Resources", value: "45 documents available", bg: "bg-purple-100", text: "text-purple-600" },
          { icon: Bell, title: "Notifications", value: "3 new notifications", bg: "bg-red-100", text: "text-red-600" },
        ].map((item, index) => (
          <div key={index} className="card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex items-center space-x-4">
              <div className={`p-3 ${item.bg} rounded-lg`}>
                <item.icon className="h-8 w-8 ${item.text}" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="card bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent News</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-medium text-gray-900">New resource available</h3>
                <p className="text-sm text-gray-500">{i} day{i > 1 ? 's' : ''} ago</p>
              </div>
            ))}
          </div>
        </div>

        {/* Forum Activity */}
        <div className="card bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Forum Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-medium text-gray-900">Discussion on web development</h3>
                <p className="text-sm text-gray-500">5 new messages</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;