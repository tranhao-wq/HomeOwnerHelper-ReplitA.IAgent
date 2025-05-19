import { createStarRating } from "@/lib/utils";
import { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { content, rating, name, location, initials } = testimonial;
  const stars = createStarRating(rating);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-amber-400 flex mb-4">
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
      <p className="text-neutral-700 mb-4">"{content}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center mr-3">
          <span className="font-medium text-neutral-700">{initials}</span>
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-neutral-500">{location}</p>
        </div>
      </div>
    </div>
  );
}
