"use client";

import { useState } from "react";
import SearchBar from "./_components/SearchBar";
import Image from "next/image";

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