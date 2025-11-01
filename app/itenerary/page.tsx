'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { ItineraryForm } from './_components/ui/ItineraryForm';
import { ItineraryDisplay } from './_components/ui/ItineraryDisplay';
import { EmptyState } from './_components/ui/EmptyState';
import { generatePDF } from './utils/pdfGenerator';
import Image from 'next/image';

interface FormData {
  destination: string;
  days: string;
  people: string;
  budget: string;
  month: string;
}

export default function ItineraryPage() {
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    days: '',
    people: '',
    budget: '',
    month: ''
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setItinerary('');

    try {
      const res = await fetch('http://localhost:5050/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setItinerary(data.itinerary);
    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    generatePDF(itinerary, formData.destination);
  };

  return (
    <div className="relative min-h-screen py-12 px-4">
      {/* Background Image - stays behind */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/frames/frame_0192.png"
          alt="Mountain background"
          fill
          className="object-cover"
          priority
        />
        {/* Optional: Add overlay for better text readability */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
      
      {/* Content - appears above background */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <MapPin size={36} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            TrekVerse Itinerary Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your perfect trek itinerary in seconds. Powered by AI to give you the best adventure experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <ItineraryForm 
            formData={formData}
            loading={loading}
            hasItinerary={!!itinerary}
            onFormChange={handleChange}
            onSubmit={handleSubmit}
          />

          {/* Itinerary Display Section */}
          {itinerary ? (
            <div className="lg:sticky lg:top-6">
              <ItineraryDisplay 
                itinerary={itinerary} 
                onDownload={handleDownloadPDF}
              />
            </div>
          ) : (
            !loading && <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}