"use client";

import React,{useEffect, useState} from 'react';
import { Eye} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherInfoProps {
  latitude?: number;
  longitude?: number;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  latitude,longitude
}) => {
   const [temperature, setTemperature] = useState(0);
    const [condition, setCondition] = useState("");
    const [humidity, setHumidity] = useState(0);
    const [conditionIcon, setConditionIcon] = useState("");

    const fetchWeatherData = async (lat?: number, lon?: number) => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lon}`
            );
            const data = await response.json();
            setTemperature(data.current.temp_c);
            setCondition(data.current.condition.text);
            setHumidity(data.current.humidity);
            setConditionIcon(data.current.condition.icon);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(()=>{
        fetchWeatherData(latitude,longitude);
    },[latitude,longitude])

  return (
    <Card className="w-full">
      <CardContent className="p-6">
 <div className="flex flex-col items-center justify-center text-center mb-8">
          <img
            src={conditionIcon}
            alt={condition}
            className="w-20 h-20 mb-4 drop-shadow-lg"
          />
          <div className="text-6xl font-light text-gray-700 drop-shadow-md mb-2">
            {temperature}°
          </div>
          <div className="text-base text-gray-700 font-medium">
            {condition}
          </div>
        </div>

        {/* Weather Details - Centered */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <svg 
              className="w-5 h-5 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
              />
            </svg>
            <div className="text-center">
              <div className="text-xs text-gray-700 font-medium">Humidity</div>
              <div className="text-lg font-semibold text-gray-700">{humidity}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherInfo;
