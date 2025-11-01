import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const PhotoCarousel = () => {
  // Trek path images with labels
  const photoSets = [
    {
      label: "Stop 1",
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      ]
    },
    {
      label: "Stop 2",
      photos: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      ]
    },
    {
      label: "Stop 3",
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      ]
    },
    {
      label: "Stop 4",
      photos: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
      ]
    },
    {
      label: "Destination",
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      ]
    },
  ];

  const [currentIndexes, setCurrentIndexes] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const intervals = photoSets.map((photoSet, setIndex) => {
      return setInterval(() => {
        setCurrentIndexes(prev => {
          const next = [...prev];
          next[setIndex] = (next[setIndex] + 1) % photoSet.photos.length;
          return next;
        });
      }, 3000 + setIndex * 200);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Trek Journey</h2>
          <p className="text-slate-600">Explore the breathtaking views along the trail</p>
        </div>

        {photoSets.map((photoSet, setIndex) => (
          <div
            key={setIndex}
            className="group bg-linear-to-br from-blue-50 to-slate-100 backdrop-blur-md rounded-2xl p-8 border border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-400 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{setIndex + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800">{photoSet.label}</h3>
            </div>

            <div className="relative w-full h-96 overflow-hidden rounded-xl border border-blue-200 shadow-lg">
              {photoSet.photos.map((photo: string, photoIndex: number) => (
                <Card
                  key={`${setIndex}-${photoIndex}`}
                  className={`absolute inset-0 overflow-hidden shadow-2xl border-0 transition-all duration-700 ${photoIndex === currentIndexes[setIndex]
                    ? 'translate-x-0 opacity-100 z-10'
                    : photoIndex === (currentIndexes[setIndex] + photoSet.photos.length - 1) % photoSet.photos.length
                      ? '-translate-x-full opacity-0 z-0'
                      : 'translate-x-full opacity-0 z-0'
                    }`}
                >
                  <img
                    src={photo}
                    alt={`${photoSet.label} - Photo ${photoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Card>
              ))}

              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 z-20">
                <div className="flex gap-2 justify-center">
                  {photoSet.photos.map((_: string, idx: number) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndexes[setIndex]
                        ? 'w-8 bg-blue-400'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition">
                  ←
                </button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition">
                  →
                </button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-slate-600">
              Photo {currentIndexes[setIndex] + 1} of {photoSet.photos.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;