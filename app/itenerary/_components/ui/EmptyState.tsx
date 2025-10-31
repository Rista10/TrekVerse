import React from 'react';
import { MapPin } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-white rounded-2xl shadow-xl p-12 border border-gray-100 h-full">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <MapPin size={64} className="text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Your Itinerary Will Appear Here
        </h3>
        <p className="text-gray-600">
          Fill out the form and click "Generate Itinerary" to get started!
        </p>
      </div>
    </div>
  );
};
