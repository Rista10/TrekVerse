"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock, TrendingUp } from "lucide-react";

interface TrailCarouselProps {
  trail: {
    _id: string;
    name: string;
    location: string;
    description: string;
    difficulty: string;
    distance: number;
    duration: string;
    images: string[];
  };
}

const TrailCarousel = ({ trail }: TrailCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = trail.images || [];

  // Handle empty images case
  if (images.length === 0) {
    return (
      <div className="w-full backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{trail.name}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{trail.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{trail.duration}</span>
            </div>
            
          </div>
          <p className="text-gray-600 mt-4 line-clamp-2">{trail.description}</p>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full backdrop-blur-lg text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Carousel Section */}
      <div className="relative w-full h-80 overflow-hidden">
        {/* Main Image Container with Slide Animation */}
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <img
                src={image}
                alt={`${trail.name} - Image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    idx === currentIndex
                      ? "bg-white w-8"
                      : "bg-white bg-opacity-50 w-2"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Difficulty Badge */}
      </div>

      {/* Trail Info Section */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 hover:text-gray-600 transition-colors">
          {trail.name}
        </h3>

        <div className="flex flex-wrap gap-4 text-sm text-white mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{trail.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{trail.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>{trail.distance} km</span>
          </div>
        </div>

        <p className="text-white line-clamp-3 leading-relaxed">
          {trail.description}
        </p>

        <button className="mt-4 w-full bg-background/50 backdrop-blur-md border-muted hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        onClick={() => window.location.href = `/trails/${trail._id}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TrailCarousel;