import React from 'react'
import TrekMap from './_components/Map'
import WeatherInfo from './_components/WeatherInfo'
import { trailData } from '../../../data/index'

export default async function TrekTrails({ params }: { params: Promise<{ trailId: string }> }) {
    const { trailId } = await params; 

    const trail = trailData.find((t) => t.name === decodeURIComponent(trailId));

    if (!trail) {
        return <div>Trail not found</div>;
    }

    return (
        <div>
            <div className='w-[50vw] h-[50vh] rounded-2xl overflow-hidden shadow-lg'>
                <TrekMap latitude={trail.latitude} longitude={trail.longitude} />
            </div>
            <WeatherInfo
                temperature={18}
                condition="Moderate rain"
                conditionIcon="//cdn.weatherapi.com/weather/64x64/day/302.png"
                visibility={5}
                precipitation={8.5}
                alert="Heavy rainfall expected in the next 2 hours. Stay indoors if possible."
            />
        </div>
    )
}
