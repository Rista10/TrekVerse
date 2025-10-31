"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    trails: { name: string }[];
}

export default function SearchBar({ onSearch, placeholder = "Search trails...", trails }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredTrails, setFilteredTrails] = useState<{ name: string }[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (query.trim()) {
            const filtered = trails.filter((trail) =>
                trail.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTrails(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredTrails([]);
            setShowSuggestions(false);
        }
    }, [query, trails]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
        setShowSuggestions(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleTrailClick = (trailName: string) => {
        setQuery(trailName);
        onSearch(trailName);
        setShowSuggestions(false);
        router.push(`/trails/${encodeURIComponent(trailName)}`);
    };

    return (
        <div ref={wrapperRef} className="w-full max-w-2xl mx-auto relative">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                    <Input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        onFocus={() => query && setShowSuggestions(true)}
                        placeholder={placeholder}
                        className="h-14 pl-12 pr-4 rounded-full bg-background/50 backdrop-blur-md border-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-purple-500"
                    />
                </div>
            </form>

            {showSuggestions && filteredTrails.length > 0 && (
                <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 bg-background/95 backdrop-blur-md border-muted shadow-lg">
                    <div className="p-2">
                        {filteredTrails.map((trail, index) => (
                            <button
                                key={index}
                                onClick={() => handleTrailClick(trail.name)}
                                className="w-full text-left px-4 py-3 hover:bg-muted/50 rounded-lg transition-colors text-foreground"
                            >
                                <div className="flex items-center gap-2">
                                    <span>{trail.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}