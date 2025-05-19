import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { id, name, icon, workshopCount } = category;
  
  // Determine background color class based on category name
  const getBgColorClass = (categoryName: string) => {
    const colorMap: Record<string, string> = {
      'Home Repair': 'bg-primary/10',
      'DIY Decor': 'bg-accent/10',
      'Gardening': 'bg-secondary/10',
      'Electrical': 'bg-primary/10',
      'Plumbing': 'bg-accent/10',
      'Renovation': 'bg-secondary/10'
    };
    
    return colorMap[categoryName] || 'bg-primary/10';
  };
  
  // Determine text color class based on category name
  const getTextColorClass = (categoryName: string) => {
    const colorMap: Record<string, string> = {
      'Home Repair': 'text-primary',
      'DIY Decor': 'text-accent',
      'Gardening': 'text-secondary',
      'Electrical': 'text-primary',
      'Plumbing': 'text-accent',
      'Renovation': 'text-secondary'
    };
    
    return colorMap[categoryName] || 'text-primary';
  };
  
  return (
    <Link href={`/category/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center">
        <div className={cn("h-28 flex items-center justify-center", getBgColorClass(name))}>
          <i className={cn(`fa-solid ${icon} text-4xl group-hover:scale-110 transition-transform`, getTextColorClass(name))}></i>
        </div>
        <div className="p-3">
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-neutral-500">{workshopCount} workshops</p>
        </div>
      </div>
    </Link>
  );
}
