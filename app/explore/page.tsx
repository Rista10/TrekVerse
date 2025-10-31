"use client";

import { useState, useEffect } from "react";
import SearchBar from "./_components/SearchBar";
import TrailCarousel from "@/components/trail/trailCarousel";
import Image from "next/image";
import { trailApi } from "@/lib/api";
import { Trail } from "@/types/trail";

const trailData = [
  { name: "Aanbu Kahireni Trail" },
  { name: "Annapurna Base Camp Heli Trek" },
  { name: "Annapurna Base Camp Short Trek" },
  { name: "Annapurna Base Camp Trek" },
  { name: "Annapurna Circle Trek" },
  { name: "Annapurna Circuit Short Trek" },
  { name: "Annapurna Circuit Trek" },
  { name: "Annapurna Circuit Trek with Tilicho Lake and Poon Hill" },
  { name: "Annapurna Panorama Trek" },
  { name: "Annapurna Sanctuary Trek" },
  { name: "Annapurna Sunrise and Everest View Trek" },
  { name: "Annapurna Tilicho Lake Trek" },
  { name: "Annapurna Trek: Manang to Tilicho Base Camp" },
  { name: "Annapurna With Tilicho Lake Trek" },
  { name: "Banthati Mohare Trail I" },
  { name: "Banthati Mohare Trail via Lespar Village" },
  { name: "Birendra Taal via Manaslu Base Camp" },
  { name: "Birendra Taal via Samagaun" },
  { name: "Champa Devi" },
  { name: "Chandragiri to Hattiban" },
  { name: "Chimp Tower Trail" },
  { name: "Chisapani Trek- Sundarijal to Chauki Bhanjyang" },
  { name: "Chitwan Safari" },
  { name: "Dadagaun - Surya Chaur Trek" },
  { name: "Daruabari Trail" },
  { name: "Dhaulagiri Circuit Trek" },
  { name: "Dhorpatan Trek" },
  { name: "Dingboche to Chukhung to Imja Tse Base Camp" },
  { name: "Everest Advanced Base Camp Trek from Tibet" },
  { name: "Everest Base Camp Heli Shuttle Trek" },
  { name: "Everest Base Camp Short Trek" },
  { name: "Everest Base Camp Trek" },
  { name: "Everest Base Camp Trek for Seniors" },
  { name: "Everest Base Camp Trek for Youths" },
  { name: "Everest Base Camp Trek via Gokyo Lake" },
  { name: "Everest Base Camp Trek via Gokyo Lakes and Cho La Pass" },
  { name: "Everest Base Camp Trek with Chola and Renjo La Pass" },
  { name: "Everest Chola Pass Trek" },
  { name: "Everest High Passes Trek" },
  { name: "Everest Kalapathar Trekking" },
  { name: "Everest Kangshung Face Trek" },
  { name: "Everest Panorama Trek" },
  { name: "Everest View Trek" },
  { name: "Fewa Lake Trek" },
  { name: "Ganja La Pass Trek" },
  { name: "Ghorepani Poon Hill Trek" },
  { name: "Gokyo Lake Renjo La Pass Trek" },
  { name: "Gokyo Lake Trek" },
  { name: "Gokyo Lakes and Gokyo Ri Trek" },
  { name: "Gokyo Ri Trek" },
  { name: "Gosaikunda Lake Trek" },
  { name: "Guerrilla Trail Trek" },
  { name: "Helambu Circuit Trek" },
  { name: "Helambu Trek" },
  { name: "HInku Cave" },
  { name: "Ice Lakes (Kicho Tal) Trail" },
  { name: "Jumla Rara Lake Trek" },
  { name: "Kanchenjunga Circuit Trek" },
  { name: "Kathmandu MTB to Tatopani Hot-Springs" },
  { name: "Kathmandu MTB Circuit" },
  { name: "Khopra Ridge Community Trek" },
  { name: "Kulekhani via Naubise" },
  { name: "Kuri Kalinchowk Hiking Trail" },
  { name: "Langtang Gosaikunda Trek" },
  { name: "Langtang Helambu Trek" },
  { name: "Langtang Trek" },
  { name: "Langtang Valley to Kganjin Ri" },
  { name: "Langtang Valley Trek" },
  { name: "Langtang Valley Trek with Ganja la Pass" },
  { name: "Langtang Valley Trekking" },
  { name: "Langtang, Gosainkunda and Helambu Trek" },
  { name: "Lukla Pakhding Namchebazar" },
  { name: "Makalu Base Camp Trek" },
  { name: "Makalu Base Camp Trek with Arun Valley" },
  { name: "Manang Trail" },
  { name: "Manaslu - Tsum Valley - Annapurna Trek" },
  { name: "Manaslu and Annapurna Trek with Tilicho Lake" },
  { name: "Manaslu Circuit Trek" },
  { name: "Manaslu Circuit Trekking" },
  { name: "Mardi Himal - Kande to High Camp Trail" },
  { name: "Mardi Himal Trek" },
  { name: "Mera Peak Trek" },
  { name: "Milerepa Cave and Glacier Trail" },
  { name: "Mohare Danda Segment 1" },
  { name: "Mohare Danda Segment 2" },
  { name: "Mohare Danda Segment 3" },
  { name: "Mohare Danda Segment 4" },
  { name: "Moharedada Trail" },
  { name: "Nagarjung HIll Top" },
  { name: "Nagarkot to Kattike Nature Trail" },
  { name: "Nar Phu Valley Trek" },
  { name: "Phulchowki" },
  { name: "Pikey Peak Trek" },
  { name: "Poon Hill Trek: Ghandruk to Naya Pol" },
  { name: "Poon Hill Trek: Ghorepani Doerali to Tadapani" },
  { name: "Poon Hill Trek: Naya Pol to Tikhedunga" },
  { name: "Poon Hill Trek: Tadapani to Ghandruk" },
  { name: "Poon Hill Trek: Tikhedhunga to Ghorepani Deorali" },
  { name: "Rara Lake Trek" },
  { name: "Ruby Valley Trek" },
  { name: "Samagaun - Gomba" },
  { name: "Sarangkot Tower" },
  { name: "Shey Phoksundo Lake Trek" },
  { name: "Tamang Heritage Trail" },
  { name: "Tamang Heritage Trek" },
  { name: "Tashi Lapcha Pass Trek" },
  { name: "Tenzing Hillary Everest Marathon" },
  { name: "The Royal Trek" },
  { name: "Three Passes Trek" },
  { name: "Tinpane Tower Ghusel" },
  { name: "Tokla to Chhomrong" },
  { name: "Tsum Valley and Manaslu Trek" },
  { name: "Tsum Valley Trek" },
  { name: "Tsum Valley with Manaslu Trek" },
  { name: "Upper Dolpo Circuit Trek" },
  { name: "Upper Mustang Tiji Festival Trek" },
  { name: "Upper Mustang Trek" },
  { name: "Upper Mustang Trek with Yara" },
  { name: "Valley Kora" },
  { name: "World Peace Pagoda" },
  { name: "Yalung Base Camp Trek" },
];

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