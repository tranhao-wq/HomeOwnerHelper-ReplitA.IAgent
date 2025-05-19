import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import WorkshopCard from "@/components/WorkshopCard";
import CategoryFilter from "@/components/CategoryFilter";
import FilterBar from "@/components/FilterBar";
import { Workshop, Category } from "@shared/schema";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:id");
  const categoryId = params?.id ? parseInt(params.id) : 0;

  // Fetch category details
  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['/api/categories', categoryId],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${categoryId}`);
      if (!response.ok) throw new Error('Failed to fetch category');
      return response.json();
    },
  });

  // Fetch workshops for this category
  const { data: workshops, isLoading: isLoadingWorkshops } = useQuery({
    queryKey: ['/api/categories', categoryId, 'workshops'],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${categoryId}/workshops`);
      if (!response.ok) throw new Error('Failed to fetch workshops for category');
      return response.json();
    },
  });

  const handleFilterChange = (filters: { [key: string]: string }) => {
    // In a real implementation, this would filter the workshops list
    console.log('Filters changed:', filters);
  };

  return (
    <>
      <div className="bg-neutral-50 py-8">
        <div className="container mx-auto px-4">
          {isLoadingCategory ? (
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-200 rounded w-1/3 mb-4"></div>
              <div className="h-5 bg-neutral-200 rounded w-2/3"></div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {category?.name} Workshops
              </h1>
              <p className="text-lg text-neutral-600 max-w-3xl">
                {category?.description || `Browse all ${category?.name} workshops and classes for homeowners. Learn essential skills, techniques, and get hands-on experience.`}
              </p>
            </>
          )}
        </div>
      </div>

      <CategoryFilter activeCategoryId={categoryId} />

      <div className="container mx-auto px-4 py-8">
        <FilterBar onFilterChange={handleFilterChange} />

        {isLoadingWorkshops ? (
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
            <h3 className="text-xl font-semibold mb-2">No workshops found in this category</h3>
            <p className="text-neutral-600">
              Please check back later or browse other categories.
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
