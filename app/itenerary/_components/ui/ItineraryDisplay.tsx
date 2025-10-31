import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Sparkles } from 'lucide-react';
import { Button } from './button';

interface ItineraryDisplayProps {
  itinerary: string;
  onDownload: () => void;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ 
  itinerary, 
  onDownload 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles size={24} />
          Your Custom Itinerary
        </h2>
        <p className="text-blue-100 mt-1">Ready for your adventure!</p>
      </div>
      
      <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
        <div className="prose prose-sm max-w-none text-gray-800">
          <ReactMarkdown
            components={{
              h1: ({children}) => (
                <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                  {children}
                </h1>
              ),
              h2: ({children}) => (
                <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5 pb-2 border-b-2 border-blue-200">
                  {children}
                </h2>
              ),
              h3: ({children}) => (
                <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-4">
                  {children}
                </h3>
              ),
              ul: ({children}) => (
                <ul className="space-y-2 my-3">{children}</ul>
              ),
              li: ({children}) => (
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{children}</span>
                </li>
              ),
              p: ({children}) => (
                <p className="text-gray-700 leading-relaxed mb-3">{children}</p>
              ),
              strong: ({children}) => (
                <strong className="text-gray-900 font-semibold">{children}</strong>
              ),
            }}
          >
            {itinerary}
          </ReactMarkdown>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <Button 
          onClick={onDownload} 
          variant="success"
          className="w-full"
        >
          <Download size={20} />
          Download PDF
        </Button>
      </div>
    </div>
  );
};
