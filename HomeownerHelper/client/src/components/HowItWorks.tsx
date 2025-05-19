export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-center">How HomeSkills Works</h2>
      <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-10">
        Finding and booking local homeowner workshops has never been easier.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-magnifying-glass text-primary text-2xl"></i>
          </div>
          <h3 className="font-heading font-semibold text-xl mb-2">Find Workshops</h3>
          <p className="text-neutral-600">
            Browse local classes and workshops for homeowners filtered by category, date, or location.
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-calendar-check text-accent text-2xl"></i>
          </div>
          <h3 className="font-heading font-semibold text-xl mb-2">Book Instantly</h3>
          <p className="text-neutral-600">
            See real-time availability and secure your spot instantly with our easy booking system.
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-graduation-cap text-secondary text-2xl"></i>
          </div>
          <h3 className="font-heading font-semibold text-xl mb-2">Learn & Apply</h3>
          <p className="text-neutral-600">
            Attend your workshop, learn valuable skills, and apply them to make your house feel like home.
          </p>
        </div>
      </div>
    </section>
  );
}
