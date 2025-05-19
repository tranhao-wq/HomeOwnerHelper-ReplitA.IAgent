import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import WorkshopCard from "@/components/WorkshopCard";
import WorkshopCardSmall from "@/components/WorkshopCardSmall";
import CategoryCard from "@/components/CategoryCard";
import HostCard from "@/components/HostCard";
import TestimonialCard from "@/components/TestimonialCard";
import SearchForm from "@/components/SearchForm";
import HowItWorks from "@/components/HowItWorks";
import CategoryFilter from "@/components/CategoryFilter";
import { Workshop, Category, Host, Testimonial } from "@shared/schema";

export default function Home() {
  // Featured workshops
  const { data: featuredWorkshops, isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['/api/workshops/featured'],
  });

  // Weekend workshops
  const { data: weekendWorkshops, isLoading: isLoadingWeekend } = useQuery({
    queryKey: ['/api/workshops/weekend'],
  });

  // Categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['/api/categories'],
  });

  // Hosts
  const { data: hosts, isLoading: isLoadingHosts } = useQuery({
    queryKey: ['/api/hosts'],
  });

  // Testimonials
  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  return (
    <>
      {/* Hero Section */}
      <section 
        className="bg-gradient-to-br from-primary/10 to-primary/5 py-10 md:py-16 lg:py-20 relative"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')",
          backgroundSize: "cover", 
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-neutral-900/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              Learn Skills for Your New Home
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover local workshops and classes designed specifically for new homeowners with real-time availability.
            </p>
            
            {/* Search Form */}
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <CategoryFilter />

      {/* Featured Workshops */}
      <section className="py-10 container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Trending Workshops</h2>
          <Link href="/workshops" className="text-primary font-medium hover:underline hidden md:block">
            View all
          </Link>
        </div>
        
        {isLoadingFeatured ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkshops?.map((workshop: Workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        )}
        
        <div className="mt-6 text-center md:hidden">
          <Link href="/workshops" className="text-primary font-medium hover:underline">
            View all workshops
          </Link>
        </div>
      </section>

      {/* This Weekend Section */}
      <section className="py-10 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">This Weekend Near You</h2>
            <Link href="/workshops?date=this-weekend" className="text-primary font-medium hover:underline hidden md:block">
              View all
            </Link>
          </div>
          
          {isLoadingWeekend ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className="h-40 bg-neutral-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {weekendWorkshops?.map((workshop: Workshop) => (
                <WorkshopCardSmall key={workshop.id} workshop={workshop} />
              ))}
            </div>
          )}
          
          <div className="mt-6 text-center md:hidden">
            <Link href="/workshops?date=this-weekend" className="text-primary font-medium hover:underline">
              View all weekend workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-10 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">Browse by Category</h2>
        
        {isLoadingCategories ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="h-28 bg-neutral-200"></div>
                <div className="p-3 space-y-2">
                  <div className="h-5 bg-neutral-200 rounded"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories?.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Hosts */}
      <section id="popular-hosts" className="py-10 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">Popular Workshop Hosts</h2>
          
          {isLoadingHosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row animate-pulse">
                  <div className="w-full md:w-1/3 h-32 md:h-auto bg-neutral-200"></div>
                  <div className="p-4 flex-1 space-y-3">
                    <div className="h-5 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hosts?.map((host: Host) => (
                <HostCard key={host.id} host={host} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-10 text-center">What Homeowners Say</h2>
          
          {isLoadingTestimonials ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 w-4 bg-neutral-200 rounded-full mr-1"></div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 mr-3"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-neutral-200 rounded w-24"></div>
                      <div className="h-3 bg-neutral-200 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials?.map((testimonial: Testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4">Ready to Build Your Home Skills?</h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto mb-8">
            Join thousands of homeowners learning practical skills from local experts. Find workshops with real-time availability today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/workshops">Find Workshops Near Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg bg-white text-primary border border-primary hover:bg-neutral-100">
              <Link href="/contact">Host a Workshop</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
