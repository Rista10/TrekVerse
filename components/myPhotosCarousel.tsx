import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const PhotoCarousel = () => {
  // Sample photo URLs - replace with your actual photos
  const photoSets = [
    [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    ],
    [
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=300&fit=crop',
    ],
    [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
    ],
    [
      'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop',
    ],
    [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516996087931-5ae405802f9f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    ],
  ];

  const [currentIndexes, setCurrentIndexes] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const intervals = photoSets.map((photos, setIndex) => {
      return setInterval(() => {
        setCurrentIndexes(prev => {
          const next = [...prev];
          next[setIndex] = (next[setIndex] + 1) % photos.length;
          return next;
        });
      }, 3000 + setIndex * 200);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="min-h-screen  p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {photoSets.map((photos, setIndex) => (
          <div 
            key={setIndex} 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20  items-center justify-center"
          >
            <p>This is a P tag</p>
            <div className="relative w-120 h-70 overflow-hidden rounded-lg">
              {photos.map((photo, photoIndex) => (
                <Card
                  key={`${setIndex}-${photoIndex}`}
                  className={`absolute inset-0 overflow-hidden shadow-2xl border-2 border-white/40 transition-all duration-700 ${
                    photoIndex === currentIndexes[setIndex]
                      ? 'translate-x-0 opacity-100 z-10'
                      : photoIndex === (currentIndexes[setIndex] + photos.length - 1) % photos.length
                      ? '-translate-x-full opacity-0 z-0'
                      : 'translate-x-full opacity-0 z-0'
                  }`}
                >
                  <img
                    src={photo}
                    alt={`Photo ${photoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Card>
              ))}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 z-20">
                <div className="flex gap-1.5 justify-center">
                  {photos.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndexes[setIndex]
                          ? 'w-8 bg-white'
                          : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;