"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { LocationHeader } from './AboutTab';
import { ReviewsTab } from './ReviewTab';
import { PhotosTab } from './PhotoTab';
import Image from 'next/image';

interface Checkpoint {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}

interface TrailDetailsProps {
    name: string;
    description: string;
    duration?: string;
    difficulty?: string;
    checkpoints?: Checkpoint[];
    rating: number;
    reviewCount: number;
}

interface Photo {
    id: string;
    url: string;
    caption?: string;
}

export const TrailDetails: React.FC<TrailDetailsProps> = ({
    name,
    description,
    duration,
    difficulty,
    checkpoints = [],
    rating,
    reviewCount,
}) => {
    const [activeTab, setActiveTab] = useState('about');

    const photos: Photo[] = [
        { id: '1', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop' },
        { id: '2', url: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&h=600&fit=crop' }]

    return (
        <div className="relative min-h-screen w-[50vw] h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/frames/frame_0192.png"
                    alt="Mountain background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Optional overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent backdrop-blur-sm">
                        <TabsTrigger
                            value="about"
                            className="rounded-none border-b-2 border-transparent  bg-transparent"
                        >
                            About
                        </TabsTrigger>
                        <TabsTrigger
                            value="reviews"
                            className="rounded-none border-b-2 border-transparent bg-transparent"
                        >
                            Reviews
                        </TabsTrigger>
                        <TabsTrigger
                            value="photos"
                            className="rounded-none border-b-2 border-transparent  bg-transparent"
                        >
                            Photos
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="mt-6  backdrop-blur-sm p-6 bg-transparent">
                        <LocationHeader
                            name={name}
                            description={description}
                            duration={duration}
                            difficulty={difficulty}
                            checkpoints={checkpoints}

                        />
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-6 bg-transparent backdrop-blur-sm p-6">
                        <ReviewsTab
                            trailId={name}
                            rating={rating}
                            reviewCount={reviewCount}
                        />
                    </TabsContent>

                    <TabsContent value="photos" className="mt-6 bg-transparent backdrop-blur-sm p-6">
                        <PhotosTab photos={photos} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};