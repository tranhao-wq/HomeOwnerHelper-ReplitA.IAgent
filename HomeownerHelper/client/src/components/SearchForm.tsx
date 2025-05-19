import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchForm() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [userLocation, setUserLocation] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/workshops?q=${encodeURIComponent(query)}&location=${encodeURIComponent(userLocation)}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-3">
      <div className="flex-1">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"></i>
          <Input
            type="text"
            placeholder="What do you want to learn?"
            className="w-full pl-10 pr-4 py-6 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="relative">
          <i className="fa-solid fa-location-dot absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"></i>
          <Input
            type="text"
            placeholder="Your location"
            className="w-full pl-10 pr-4 py-6 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="whitespace-nowrap h-12">
        Find Workshops
      </Button>
    </form>
  );
}
