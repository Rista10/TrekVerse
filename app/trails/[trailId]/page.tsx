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
        <div className='flex'>


            <TrailDetails
                name={trail.name}
                description= "Perfect for beginners, this trail offers gentle slopes and scenic views."
                rating={4.5}
                reviewCount={128}
                address="123 Mountain Rd, Hiker's Paradise"
            />
            <div className='w-[50vw] h-screen rounded-2xl overflow-hidden shadow-lg'>
                <WeatherInfo
                latitude={trail.latitude}
                longitude={trail.longitude}
            />
                <TrekMap latitude={trail.latitude} longitude={trail.longitude} />
            </div>
        </div>
    );
}
