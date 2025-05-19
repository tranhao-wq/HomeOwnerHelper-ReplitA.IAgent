import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import WorkshopCard from "@/components/WorkshopCard";
import CategoryFilter from "@/components/CategoryFilter";
import FilterBar from "@/components/FilterBar";
import { Workshop } from "@shared/schema";

export default function Workshops() {
  const [, params] = useRoute("/workshops");
  const [location] = useLocation();
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  
  // Parse URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newFilters: { [key: string]: string } = {};
    
    for (const [key, value] of searchParams.entries()) {
      newFilters[key] = value;
    }
    
    setFilters(newFilters);
  }, [location]);
  
  // Fetch workshops with filter parameters
  const { data: workshops, isLoading } = useQuery({
    queryKey: ['/api/workshops', filters],
  });
  
  const handleFilterChange = (newFilters: { [key: string]: string }) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  return (
    <>
      <div className="bg-neutral-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Workshops & Classes
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl">
            Browse and book local workshops designed specifically for new homeowners. 
            Learn essential skills from experts and meet other homeowners in your area.
          </p>
        </div>
      </div>
      
      <CategoryFilter />
      
      <div className="container mx-auto px-4 py-8">
        <FilterBar onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-neutral-200"></div>
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-neutral-200 rounded"></div>
                  <div className="h-4 bg-neutral-200 rounded"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-5 bg-neutral-200 rounded w-1/4"></div>
                    <div className="h-10 bg-neutral-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : workshops?.length === 0 ? (
          <div className="text-center py-12">
            <i className="fa-solid fa-face-sad-tear text-neutral-400 text-5xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">No workshops found</h3>
            <p className="text-neutral-600">
              Try adjusting your filters or search for something else.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops?.map((workshop: Workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
