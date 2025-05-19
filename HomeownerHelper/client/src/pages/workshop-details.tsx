import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { createStarRating, formatCurrency } from "@/lib/utils";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import WorkshopCardSmall from "@/components/WorkshopCardSmall";

export default function WorkshopDetails() {
  const [, params] = useRoute("/workshop/:id");
  const { toast } = useToast();
  const workshopId = params?.id ? parseInt(params.id) : 0;
  
  // Fetch workshop details
  const { data: workshop, isLoading: isLoadingWorkshop } = useQuery({
    queryKey: ['/api/workshops', workshopId],
    queryFn: async () => {
      const response = await fetch(`/api/workshops/${workshopId}`);
      if (!response.ok) throw new Error('Failed to fetch workshop');
      return response.json();
    },
  });
  
  // Fetch host details if we have the workshop
  const { data: host, isLoading: isLoadingHost } = useQuery({
    queryKey: ['/api/hosts', workshop?.hostId],
    queryFn: async () => {
      const response = await fetch(`/api/hosts/${workshop.hostId}`);
      if (!response.ok) throw new Error('Failed to fetch host');
      return response.json();
    },
    enabled: !!workshop?.hostId,
  });
  
  // Fetch similar workshops in the same category
  const { data: similarWorkshops, isLoading: isLoadingSimilar } = useQuery({
    queryKey: ['/api/categories', workshop?.categoryId, 'workshops'],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${workshop.categoryId}/workshops`);
      if (!response.ok) throw new Error('Failed to fetch similar workshops');
      return response.json();
    },
    enabled: !!workshop?.categoryId,
  });
  
  // Book workshop mutation
  const bookWorkshop = useMutation({
    mutationFn: async () => {
      // Update the available spots
      const newAvailableSpots = workshop.availableSpots - 1;
      return apiRequest('PATCH', `/api/workshops/${workshopId}/availability`, {
        availableSpots: newAvailableSpots
      });
    },
    onSuccess: () => {
      toast({
        title: "Workshop booked successfully!",
        description: "Check your email for confirmation details.",
      });
      // Invalidate the workshop query to refetch
      queryClient.invalidateQueries({ queryKey: ['/api/workshops', workshopId] });
    },
    onError: (error) => {
      toast({
        title: "Booking failed",
        description: `Something went wrong: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });
  
  // Join waitlist mutation
  const joinWaitlist = useMutation({
    mutationFn: async () => {
      // This would normally send a waitlist request to the server
      // For now, we're just simulating a successful request
      return new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      toast({
        title: "Added to waitlist!",
        description: "We'll notify you if a spot becomes available.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to join waitlist",
        description: `Something went wrong: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });
  
  // Handler for booking a workshop
  const handleBookWorkshop = () => {
    bookWorkshop.mutate();
  };
  
  // Handler for joining the waitlist
  const handleJoinWaitlist = () => {
    joinWaitlist.mutate();
  };
  
  if (isLoadingWorkshop) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-80 bg-neutral-200"></div>
          <div className="p-6 space-y-4">
            <div className="h-8 bg-neutral-200 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-200 rounded"></div>
            <div className="h-4 bg-neutral-200 rounded"></div>
            <div className="h-10 bg-neutral-200 rounded w-1/4 mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Workshop Not Found</h1>
        <p>The workshop you're looking for doesn't exist or may have been removed.</p>
        <Button asChild className="mt-6">
          <a href="/workshops">Browse All Workshops</a>
        </Button>
      </div>
    );
  }

  // Format the star rating for the host
  const hostStars = host ? createStarRating(host.rating) : { full: 0, half: 0, empty: 5 };
  
  // Filter out the current workshop from similar workshops
  const filteredSimilarWorkshops = similarWorkshops ? 
    similarWorkshops.filter((w: any) => w.id !== workshop.id).slice(0, 3) : 
    [];
  
  return (
    <div className="bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workshop Image and Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={workshop.image} 
                  alt={workshop.title} 
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={workshop.isAvailable ? 'available' : 'unavailable'} 
                    className="text-sm font-bold px-3 py-1 flex items-center"
                  >
                    <i className="fa-solid fa-circle mr-1 text-xs"></i>
                    {workshop.isAvailable ? `${workshop.availableSpots} spots left` : 'Fully Booked'}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-heading font-bold mb-4">{workshop.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-neutral-700">
                    <i className="fa-solid fa-calendar-days mr-2 text-primary"></i>
                    <span>{workshop.formattedDate}</span>
                  </div>
                  <div className="flex items-center text-neutral-700">
                    <i className="fa-solid fa-clock mr-2 text-primary"></i>
                    <span>{workshop.formattedTime}</span>
                  </div>
                  <div className="flex items-center text-neutral-700">
                    <i className="fa-solid fa-location-dot mr-2 text-primary"></i>
                    <span>{workshop.location} • {workshop.distance} miles away</span>
                  </div>
                </div>
                
                <div className="border-t border-b border-neutral-200 py-4 my-6">
                  <h2 className="font-semibold text-lg mb-3">About This Workshop</h2>
                  <p className="text-neutral-700 whitespace-pre-line mb-4">{workshop.description}</p>
                  
                  <h3 className="font-semibold mt-6 mb-2">What You'll Learn</h3>
                  <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                    <li>Essential skills for new homeowners</li>
                    <li>Practical techniques you can apply immediately</li>
                    <li>Cost-saving tips and tricks</li>
                    <li>Safety best practices</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-6 mb-2">What to Bring</h3>
                  <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                    <li>Notepad and pen</li>
                    <li>Water bottle</li>
                    <li>Comfortable clothing</li>
                  </ul>
                </div>
                
                {isLoadingHost ? (
                  <div className="animate-pulse">
                    <div className="h-6 bg-neutral-200 rounded w-48 mb-4"></div>
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-200 mr-3"></div>
                      <div>
                        <div className="h-5 bg-neutral-200 rounded w-32 mb-1"></div>
                        <div className="h-4 bg-neutral-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  </div>
                ) : host && (
                  <div>
                    <h2 className="font-semibold text-lg mb-4">Hosted By</h2>
                    <div className="flex items-center mb-3">
                      <img 
                        src={host.image} 
                        alt={host.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="font-medium">{host.name}</h3>
                        <div className="flex items-center">
                          <div className="text-amber-400 flex mr-1">
                            {[...Array(hostStars.full)].map((_, i) => (
                              <i key={`full-${i}`} className="fa-solid fa-star text-xs"></i>
                            ))}
                            {hostStars.half > 0 && (
                              <i className="fa-solid fa-star-half-stroke text-xs"></i>
                            )}
                            {[...Array(hostStars.empty)].map((_, i) => (
                              <i key={`empty-${i}`} className="fa-regular fa-star text-xs"></i>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-600">{host.rating.toFixed(1)} ({host.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-700 text-sm">{host.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">{formatCurrency(workshop.price)}</span>
                  <Badge variant={workshop.isAvailable ? 'available' : 'unavailable'} className="text-xs font-bold px-2 py-1">
                    {workshop.isAvailable ? 'Available' : 'Fully Booked'}
                  </Badge>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <i className="fa-solid fa-calendar-days w-6 text-primary"></i>
                    <span>{workshop.formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa-solid fa-clock w-6 text-primary"></i>
                    <span>{workshop.formattedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa-solid fa-location-dot w-6 text-primary"></i>
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa-solid fa-user-group w-6 text-primary"></i>
                    <span>
                      {workshop.isAvailable 
                        ? `${workshop.availableSpots} spots left out of ${workshop.totalSpots}`
                        : `0 spots left (${workshop.totalSpots} capacity)`
                      }
                    </span>
                  </div>
                </div>
                
                {workshop.isAvailable ? (
                  <Button
                    className="w-full mb-3 text-base py-6"
                    onClick={handleBookWorkshop}
                    disabled={bookWorkshop.isPending}
                  >
                    {bookWorkshop.isPending ? "Processing..." : "Book Now"}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full mb-3 text-base py-6 bg-neutral-200 text-neutral-700"
                    onClick={handleJoinWaitlist}
                    disabled={joinWaitlist.isPending}
                  >
                    {joinWaitlist.isPending ? "Processing..." : "Join Waitlist"}
                  </Button>
                )}
                
                <p className="text-xs text-neutral-500 text-center">
                  No payment required. Pay at venue on the day.
                </p>
              </div>
              
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-semibold mb-4">Share This Workshop</h3>
                <div className="flex space-x-4 justify-center">
                  <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                    <i className="fa-brands fa-facebook-f text-lg"></i>
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                    <i className="fa-brands fa-twitter text-lg"></i>
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                    <i className="fa-solid fa-envelope text-lg"></i>
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Workshops */}
        {isLoadingSimilar ? (
          <div className="mt-10">
            <h2 className="text-2xl font-heading font-bold mb-6">Similar Workshops</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
          </div>
        ) : filteredSimilarWorkshops.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-heading font-bold mb-6">Similar Workshops</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSimilarWorkshops.map((similarWorkshop: any) => (
                <WorkshopCardSmall key={similarWorkshop.id} workshop={similarWorkshop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
