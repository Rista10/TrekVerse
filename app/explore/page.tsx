"use client";

import { useState } from "react";
import SearchBar from "./_components/SearchBar";
import Image from "next/image";
import { trailData } from "../../data/index";

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/frames/frame_0192.png"
                    alt="Mountain background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
                           Explore Trails
                        </h1>
                        <p className="text-xl text-gray-800">
                            Discover your next adventure in the Himalayas
                        </p>
                    </div>

                    <SearchBar onSearch={handleSearch} trails={trailData} />
                </div>
            </div>
        </div>
    );
}