// import { useState } from 'react';
import TrekMap from './_components/Map';
import WeatherInfo from './_components/WeatherInfo';
import { trailData } from '../../../data/index';
import { TrailDetails } from './_components/TrailDetail';
import Image from 'next/image';

export default async function TrekTrails({ params }: { params: Promise<{ trailId: string }> }) {
    const { trailId } = await params; 

    const trail = trailData.find((t) => t.name === decodeURIComponent(trailId));

    if (!trail) {
        return <div>Trail not found</div>;
    }

    return (
<div className="flex">
  {/* Left scrolling content */}
  <div className="flex-1 pr-[50vw]">
    <TrailDetails
      name={trail.name}
      description={trail.description}
      duration={trail.duration}
      difficulty={trail.difficulty}
      checkpoints={trail.checkpoints}
      rating={4.5}
      reviewCount={200}
    />
  </div>

  {/* Right fixed panel */}
  <div className="w-[50vw] h-screen rounded-2xl overflow-hidden shadow-lg fixed right-0 top-0">
    <WeatherInfo latitude={trail.latitude} longitude={trail.longitude} />
    <TrekMap latitude={trail.latitude} longitude={trail.longitude} checkpoints={trail.checkpoints} />
  </div>
</div>

    );
}
        