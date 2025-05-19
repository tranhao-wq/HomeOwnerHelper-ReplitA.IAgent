import { createStarRating } from "@/lib/utils";
import { Host } from "@shared/schema";

interface HostCardProps {
  host: Host;
}

export default function HostCard({ host }: HostCardProps) {
  const { name, image, description, rating, reviewCount } = host;
  const stars = createStarRating(rating);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row">
      <img 
        src={image} 
        alt={name} 
        className="w-full md:w-1/3 h-32 md:h-auto object-cover"
      />
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-1">{name}</h3>
        <div className="flex items-center mb-2">
          <div className="text-amber-400 flex mr-1">
            {[...Array(stars.full)].map((_, i) => (
              <i key={`full-${i}`} className="fa-solid fa-star"></i>
            ))}
            {stars.half > 0 && (
              <i className="fa-solid fa-star-half-stroke"></i>
            )}
            {[...Array(stars.empty)].map((_, i) => (
              <i key={`empty-${i}`} className="fa-regular fa-star"></i>
            ))}
          </div>
          <span className="text-sm text-neutral-600">{rating.toFixed(1)} ({reviewCount} reviews)</span>
        </div>
        <p className="text-neutral-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
