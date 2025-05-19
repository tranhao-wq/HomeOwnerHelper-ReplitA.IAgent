import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Workshop } from "@shared/schema";

interface WorkshopCardSmallProps {
  workshop: Workshop;
}

export default function WorkshopCardSmall({ workshop }: WorkshopCardSmallProps) {
  const {
    id,
    title,
    image,
    price,
    formattedDate,
    formattedTime,
    availableSpots,
    isAvailable
  } = workshop;
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant={isAvailable ? 'available' : 'unavailable'} 
            className="text-xs font-bold px-2 py-1 flex items-center"
          >
            <i className="fa-solid fa-circle mr-1 text-xs"></i>
            {isAvailable ? 'Available' : 'Booked'}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <Link href={`/workshop/${id}`}>
          <h3 className="font-heading font-semibold mb-1 hover:text-primary transition-colors">{title}</h3>
        </Link>
        <p className="text-neutral-600 text-sm mb-2">{formattedDate} • {formattedTime.split(" - ")[0]}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{formatCurrency(price)}</span>
          {isAvailable ? (
            <span className="text-available text-sm">{availableSpots} spots left</span>
          ) : (
            <span className="text-unavailable text-sm">Waitlist ({Math.floor(Math.random() * 5) + 1})</span>
          )}
        </div>
      </div>
    </div>
  );
}
