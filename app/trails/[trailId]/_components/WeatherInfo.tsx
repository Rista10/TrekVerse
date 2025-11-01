"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

interface WeatherInfoProps {
  latitude?: number;
  longitude?: number;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ latitude, longitude }) => {
  const [temperature, setTemperature] = useState(0);
  const [condition, setCondition] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [conditionIcon, setConditionIcon] = useState("");
  const [alert, setAlert] = useState("");

  const fetchGeminiAlert = async (lat: number, lon: number, temp: number, hum: number, cond: string) => {
    try {
      const prompt = `
        Provide a concise weather alert for the following conditions:
        Latitude: ${lat}, Longitude: ${lon}, 
        Temperature: ${temp}°C, Humidity: ${hum}%, Condition: ${cond}.
        If there are no alerts, respond with 'No alerts'.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      console.log("Gemini full response:", response);
      setAlert(response.text || "No alerts");
    } catch (error) {
      console.error("Error fetching Gemini alert:", error);
      setAlert("Error fetching alert");
    }
  };

  const fetchWeatherData = async (lat?: number, lon?: number) => {
    if (!lat || !lon) return;
    try {
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lon}`
      );
      const weatherData = await weatherResponse.json();

      setTemperature(weatherData.current.temp_c);
      setCondition(weatherData.current.condition.text);
      setHumidity(weatherData.current.humidity);
      setConditionIcon(weatherData.current.condition.icon);

      // Fetch Gemini alert after getting weather
      fetchGeminiAlert(
        lat,
        lon,
        weatherData.current.temp_c,
        weatherData.current.humidity,
        weatherData.current.condition.text
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (latitude && longitude) fetchWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div className="flex">
      <Card className="w-full border-none">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center mb-4">
            <img
              src={conditionIcon}
              alt={condition}
              className="w-20 h-20 mb-4 drop-shadow-lg"
            />
            <div className="text-6xl font-light text-gray-700 drop-shadow-md mb-2">
              {temperature}°
            </div>
            <div className="text-base text-gray-700 font-medium">{condition}</div>
          </div>

          <div className="flex justify-center mb-4">
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

      {alert && (
        <Card className="w-full border-none justify-center ">
          <CardHeader>
            <CardTitle className="text-red-600 text-3xl text-center">Weather Alert</CardTitle>
            <CardDescription className="text-gray-600 text-lg text-center">{alert}</CardDescription>
          </CardHeader>

        </Card>
      )}
    </div>
  );
};

export default WeatherInfo;
