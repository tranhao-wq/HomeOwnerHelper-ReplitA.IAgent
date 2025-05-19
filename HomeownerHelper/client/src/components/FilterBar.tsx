import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  onFilterChange: (filters: { [key: string]: string }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [location] = useLocation();
  const [dateFilter, setDateFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [distanceFilter, setDistanceFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = () => {
    onFilterChange({
      date: dateFilter,
      price: priceFilter,
      distance: distanceFilter,
      query: searchQuery
    });
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search workshops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="tomorrow">Tomorrow</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-weekend">This Weekend</SelectItem>
            <SelectItem value="next-week">Next Week</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-25">Under $25</SelectItem>
            <SelectItem value="25-50">$25 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="over-100">Over $100</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={distanceFilter} onValueChange={setDistanceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Distance</SelectItem>
            <SelectItem value="1">Within 1 mile</SelectItem>
            <SelectItem value="5">Within 5 miles</SelectItem>
            <SelectItem value="10">Within 10 miles</SelectItem>
            <SelectItem value="25">Within 25 miles</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button onClick={handleSearch}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
