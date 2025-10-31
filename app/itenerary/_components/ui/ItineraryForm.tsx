import React from 'react';
import { MapPin, Calendar, Users, DollarSign, Clock, Sparkles } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent } from './card';

interface FormData {
  destination: string;
  days: string;
  people: string;
  budget: string;
  month: string;
}

interface ItineraryFormProps {
  formData: FormData;
  loading: boolean;
  hasItinerary: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ItineraryForm: React.FC<ItineraryFormProps> = ({ 
  formData, 
  loading, 
  hasItinerary,
  onFormChange, 
  onSubmit 
}) => {
  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Sparkles className="text-blue-600" size={24} />
          Plan Your Adventure
        </h2>
        
        <form onSubmit={onSubmit} className="space-y-5">
          <Input 
            label="Destination"
            placeholder="e.g., Annapurna Base Camp" 
            name="destination" 
            value={formData.destination} 
            onChange={onFormChange} 
            required 
            icon={MapPin}
          />

          <Input 
            label="Duration"
            placeholder="e.g., 7 days" 
            name="days" 
            value={formData.days} 
            onChange={onFormChange} 
            required 
            icon={Clock}
          />

          <Input 
            label="Group Size"
            placeholder="Number of people" 
            name="people" 
            value={formData.people} 
            onChange={onFormChange} 
            required 
            icon={Users}
          />

          <Input 
            label="Budget Range"
            placeholder="e.g., $300-$500" 
            name="budget" 
            value={formData.budget} 
            onChange={onFormChange} 
            required 
            icon={DollarSign}
          />

          <Input 
            label="Preferred Month"
            placeholder="e.g., October" 
            name="month" 
            value={formData.month} 
            onChange={onFormChange} 
            required 
            icon={Calendar}
          />

          <Button 
            type="submit"
            variant="primary"
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating Your Itinerary...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Itinerary
              </>
            )}
          </Button>
        </form>

        {!hasItinerary && !loading && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Pro tip:</strong> Be specific with your destination and preferences for the best results!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
