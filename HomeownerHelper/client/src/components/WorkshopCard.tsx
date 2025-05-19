import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, truncateText } from "@/lib/utils";
import { Workshop } from "@shared/schema";

interface WorkshopCardProps {
  workshop: Workshop;
}

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  const {
    id,
    title,
    description,
    image,
    price,
    formattedDate,
    formattedTime,
    location,
    distance,
    availableSpots,
    isAvailable,
    categoryId
  } = workshop;
  
  // Get category name - normally would be passed in or fetched
  const getCategoryName = (categoryId: number) => {
    const categories: Record<number, string> = {
      1: 'Home Repair',
      2: 'DIY Decor',
      3: 'Gardening',
      4: 'Electrical',
      5: 'Plumbing',
      6: 'Renovation'
    };
    return categories[categoryId] || 'Workshop';
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 flex items-center">
          <Badge variant={isAvailable ? 'available' : 'unavailable'} className="text-xs font-bold px-2 py-1 flex items-center">
            <i className="fa-solid fa-circle mr-1 text-xs"></i>
            {isAvailable ? 'Spaces Available' : 'Fully Booked'}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge 
            variant="default" 
            className="bg-white/90 text-neutral-800 text-xs font-medium"
          >
            {getCategoryName(categoryId)}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-semibold text-lg">{title}</h3>
          <span className="text-lg font-bold text-neutral-800">{formatCurrency(price)}</span>
        </div>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {truncateText(description, 100)}
        </p>
        <div className="flex items-center text-sm text-neutral-500 mb-4">
          <i className="fa-solid fa-calendar-days mr-1"></i>
          <span>{formattedDate} • {formattedTime}</span>
        </div>
        <div className="flex items-center text-sm text-neutral-500 mb-4">
          <i className="fa-solid fa-location-dot mr-1"></i>
          <span>{location} • {distance} miles away</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {isAvailable ? (
              <span className="text-available font-medium">{availableSpots} spots left</span>
            ) : (
              <span className="text-unavailable font-medium">Waiting list available</span>
            )}
          </div>
          <Link href={`/workshop/${id}`}>
            <Button variant={isAvailable ? "default" : "outline"} className={!isAvailable ? "bg-neutral-200 text-neutral-700" : ""}>
              {isAvailable ? 'Book Now' : 'Join Waitlist'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
