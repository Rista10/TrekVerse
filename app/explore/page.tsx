"use client";

import { useState, useEffect } from "react";
import SearchBar from "./_components/SearchBar";
import TrailCarousel from "@/components/trail/trailCarousel";
import Image from "next/image";
import { trailApi } from "@/lib/api";
import { Trail } from "@/types/trail";

import { trailData } from "../../data/index";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        setLoading(true);
        const response = await trailApi.getAllTrails();
        setTrails(response.trails);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch trails");
        console.error("Error fetching trails:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrails();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter trails based on search query
  const filteredTrails = trails.filter((trail) =>
    trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trail.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trail.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="relative z-10 pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Explore Trails
            </h1>
            <p className="text-xl text-gray-800">
              Discover your next adventure in the Himalayas
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} trails={trailData} />

          {/* Trails Section */}
          <div className="mt-12">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
                <p className="font-semibold">Error loading trails</p>
                <p className="text-sm">{error}</p>
              </div>
            ) : filteredTrails.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600 text-lg">
                  {searchQuery
                    ? `No trails found matching "${searchQuery}"`
                    : "No trails available at the moment"}
                </p>
              </div>
            ) : (
              <>
                {searchQuery && (
                  <div className="mb-6">
                    <p className="text-gray-800 text-lg font-semibold">
                      Found {filteredTrails.length} trail{filteredTrails.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTrails.map((trail) => (
                    <TrailCarousel key={trail._id} trail={trail} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}