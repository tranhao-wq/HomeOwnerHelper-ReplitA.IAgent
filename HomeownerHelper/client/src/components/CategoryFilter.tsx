import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Category } from "@shared/schema";

interface CategoryFilterProps {
  activeCategoryId?: number;
}

export default function CategoryFilter({ activeCategoryId }: CategoryFilterProps) {
  const [location] = useLocation();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-6 container mx-auto px-4">
        <div className="flex overflow-x-auto pb-2 gap-2 justify-center">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i}
              className="bg-neutral-100 animate-pulse h-10 w-28 rounded-full"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 container mx-auto px-4">
      <div className="flex flex-wrap gap-2 justify-center">
        <Link 
          href="/workshops" 
          className={cn(
            "bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-full text-sm font-medium transition-colors",
            !activeCategoryId && "bg-primary/10 hover:bg-primary/20 text-primary"
          )}
        >
          All Categories
        </Link>
        
        {categories?.map((category: Category) => (
          <Link 
            key={category.id} 
            href={`/category/${category.id}`}
            className={cn(
              "bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategoryId === category.id && "bg-primary/10 hover:bg-primary/20 text-primary"
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
