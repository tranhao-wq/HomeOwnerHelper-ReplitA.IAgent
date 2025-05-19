import {
  categories, 
  workshops, 
  hosts, 
  testimonials,
  type Category, 
  type InsertCategory,
  type Workshop, 
  type InsertWorkshop,
  type Host, 
  type InsertHost,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, or, desc } from "drizzle-orm";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Workshops
  getWorkshops(): Promise<Workshop[]>;
  getWorkshopById(id: number): Promise<Workshop | undefined>;
  getWorkshopsByCategory(categoryId: number): Promise<Workshop[]>;
  getFeaturedWorkshops(): Promise<Workshop[]>;
  getWeekendWorkshops(): Promise<Workshop[]>;
  createWorkshop(workshop: InsertWorkshop): Promise<Workshop>;
  updateWorkshopAvailability(id: number, availableSpots: number): Promise<Workshop | undefined>;
  searchWorkshops(query: string, categoryId?: number): Promise<Workshop[]>;
  
  // Hosts
  getHosts(): Promise<Host[]>;
  getHostById(id: number): Promise<Host | undefined>;
  createHost(host: InsertHost): Promise<Host>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const results = await db.select().from(categories).where(eq(categories.id, id));
    return results.length ? results[0] : undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const results = await db.insert(categories).values(category).returning();
    return results[0];
  }

  // Workshops
  async getWorkshops(): Promise<Workshop[]> {
    return await db.select().from(workshops).orderBy(desc(workshops.date));
  }

  async getWorkshopById(id: number): Promise<Workshop | undefined> {
    const results = await db.select().from(workshops).where(eq(workshops.id, id));
    return results.length ? results[0] : undefined;
  }

  async getWorkshopsByCategory(categoryId: number): Promise<Workshop[]> {
    return await db
      .select()
      .from(workshops)
      .where(eq(workshops.categoryId, categoryId))
      .orderBy(desc(workshops.date));
  }

  async getFeaturedWorkshops(): Promise<Workshop[]> {
    return await db
      .select()
      .from(workshops)
      .where(eq(workshops.featured, true))
      .orderBy(desc(workshops.date));
  }

  async getWeekendWorkshops(): Promise<Workshop[]> {
    return await db
      .select()
      .from(workshops)
      .where(eq(workshops.thisWeekend, true))
      .orderBy(desc(workshops.date));
  }

  async createWorkshop(workshop: InsertWorkshop): Promise<Workshop> {
    const results = await db.insert(workshops).values(workshop).returning();
    
    // Update category workshop count
    const category = await this.getCategoryById(workshop.categoryId);
    if (category) {
      await db
        .update(categories)
        .set({ workshopCount: (category.workshopCount || 0) + 1 })
        .where(eq(categories.id, category.id));
    }
    
    return results[0];
  }

  async updateWorkshopAvailability(id: number, availableSpots: number): Promise<Workshop | undefined> {
    const results = await db
      .update(workshops)
      .set({
        availableSpots,
        isAvailable: availableSpots > 0
      })
      .where(eq(workshops.id, id))
      .returning();
    
    return results.length ? results[0] : undefined;
  }
  
  async searchWorkshops(query: string, categoryId?: number): Promise<Workshop[]> {
    let conditions = [];
    
    if (categoryId) {
      conditions.push(eq(workshops.categoryId, categoryId));
    }
    
    if (query && query.trim() !== '') {
      const searchTerms = query.toLowerCase().split(' ');
      const searchConditions = searchTerms.map(term => 
        or(
          like(workshops.title, `%${term}%`),
          like(workshops.description, `%${term}%`),
          like(workshops.location, `%${term}%`)
        )
      );
      
      if (searchConditions.length > 0) {
        conditions = conditions.length > 0 ? 
          [...conditions, ...searchConditions] : 
          searchConditions;
      }
    }
    
    if (conditions.length === 0) {
      return this.getWorkshops();
    }
    
    return await db
      .select()
      .from(workshops)
      .where(and(...conditions))
      .orderBy(desc(workshops.date));
  }

  // Hosts
  async getHosts(): Promise<Host[]> {
    return await db.select().from(hosts).orderBy(desc(hosts.rating));
  }

  async getHostById(id: number): Promise<Host | undefined> {
    const results = await db.select().from(hosts).where(eq(hosts.id, id));
    return results.length ? results[0] : undefined;
  }

  async createHost(host: InsertHost): Promise<Host> {
    const results = await db.insert(hosts).values(host).returning();
    return results[0];
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.rating));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const results = await db.insert(testimonials).values(testimonial).returning();
    return results[0];
  }
  
  // Helper to seed initial data if needed
  async seedDatabase() {
    try {
      const existingCategories = await this.getCategories();
      
      if (existingCategories.length === 0) {
      // Seed Categories
      const categories: InsertCategory[] = [
        { name: 'Home Repair', icon: 'fa-hammer', description: 'Essential home repair and maintenance skills', workshopCount: 0 },
        { name: 'DIY Decor', icon: 'fa-palette', description: 'Creative home decoration workshops', workshopCount: 0 },
        { name: 'Gardening', icon: 'fa-leaf', description: 'Garden design and plant care', workshopCount: 0 },
        { name: 'Electrical', icon: 'fa-bolt', description: 'Basic to advanced electrical repairs', workshopCount: 0 },
        { name: 'Plumbing', icon: 'fa-faucet', description: 'Plumbing maintenance and fixes', workshopCount: 0 },
        { name: 'Renovation', icon: 'fa-paint-roller', description: 'Home renovation and remodeling projects', workshopCount: 0 },
      ];
      
      const createdCategories = await Promise.all(
        categories.map(category => this.createCategory(category))
      );
      
      // Seed Hosts
      const hosts: InsertHost[] = [
        { 
          name: 'Home Depot Workshop Team', 
          image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80', 
          description: 'Expert-led workshops on home improvement basics, repairs, and DIY projects.',
          rating: 4.7,
          reviewCount: 126
        },
        { 
          name: 'Green Thumb Gardening Club', 
          image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80', 
          description: 'Community-based gardening experts specializing in organic techniques and landscaping.',
          rating: 4.9,
          reviewCount: 87
        },
        { 
          name: 'Modern Renovations Co.', 
          image: 'https://pixabay.com/get/g763893a40e3835661c42c28914d960d3b53c8a2efa6cc9bc297d96b46845a06f623132629cb001ec3e72ab3a46c823d48266a5198f58b805ef4d53ae02c05144_1280.jpg', 
          description: 'Professional contractors offering advanced renovation and remodeling workshops.',
          rating: 4.2,
          reviewCount: 54
        }
      ];
      
      const createdHosts = await Promise.all(
        hosts.map(host => this.createHost(host))
      );
      
      // Seed Workshops
      const workshops: InsertWorkshop[] = [
        {
          title: 'Basic Electrical Repairs',
          description: 'Learn how to safely handle common electrical issues every homeowner should know.',
          image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
          price: 45,
          date: new Date('2023-10-15T10:00:00'),
          startTime: '10:00 AM',
          endTime: '12:30 PM',
          formattedDate: 'Oct 15, 2023',
          formattedTime: '10:00 AM - 12:30 PM',
          location: 'HomeDepot Community Center',
          distance: 2.3,
          totalSpots: 20,
          availableSpots: 8,
          isAvailable: true,
          categoryId: 4, // Electrical
          hostId: 1, // Home Depot Workshop Team
          featured: true,
          thisWeekend: false
        },
        {
          title: 'DIY Furniture Basics',
          description: 'Create your own custom furniture pieces and learn woodworking fundamentals.',
          image: 'https://images.unsplash.com/photo-1538307602205-80b5c2ff26ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
          price: 65,
          date: new Date('2023-10-18T13:00:00'),
          startTime: '1:00 PM',
          endTime: '4:00 PM',
          formattedDate: 'Oct 18, 2023',
          formattedTime: '1:00 PM - 4:00 PM',
          location: 'Maker Space Workshop',
          distance: 4.1,
          totalSpots: 15,
          availableSpots: 0,
          isAvailable: false,
          categoryId: 2, // DIY Decor
          hostId: 3, // Modern Renovations Co.
          featured: true,
          thisWeekend: false
        },
        {
          title: 'Garden Planning 101',
          description: 'Design and plan your perfect home garden with expert guidance and tips.',
          image: 'https://pixabay.com/get/g1b4e646abd7f29c920f207e79760643e91e1a96af6c52c246d52213490ddce4c5263ad0426670f3b142b75d82292cb87c488265177341a7e72426d105a5be371_1280.jpg',
          price: 35,
          date: new Date('2023-10-22T09:00:00'),
          startTime: '9:00 AM',
          endTime: '11:00 AM',
          formattedDate: 'Oct 22, 2023',
          formattedTime: '9:00 AM - 11:00 AM',
          location: 'Community Garden Center',
          distance: 1.7,
          totalSpots: 25,
          availableSpots: 12,
          isAvailable: true,
          categoryId: 3, // Gardening
          hostId: 2, // Green Thumb Gardening Club
          featured: true,
          thisWeekend: false
        },
        {
          title: 'Plumbing Basics',
          description: 'Learn essential plumbing skills to handle common home plumbing issues.',
          image: 'https://pixabay.com/get/gaee83ac78c4cadd73a14a159b65f91058084dd4d93f00bdb6333fde3f9d9de47034ed486d490266bb4f645c0b9e95753c5973529ad8ea3ae0a16578fddb729c9_1280.jpg',
          price: 40,
          date: new Date('2023-10-14T14:00:00'),
          startTime: '2:00 PM',
          endTime: '4:30 PM',
          formattedDate: 'Sat, Oct 14',
          formattedTime: '2:00 PM',
          location: 'Community Center',
          distance: 3.2,
          totalSpots: 15,
          availableSpots: 3,
          isAvailable: true,
          categoryId: 5, // Plumbing
          hostId: 1, // Home Depot Workshop Team
          featured: false,
          thisWeekend: true
        },
        {
          title: 'Wall Painting Techniques',
          description: 'Learn professional wall painting and texturing techniques.',
          image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          price: 35,
          date: new Date('2023-10-14T10:00:00'),
          startTime: '10:00 AM',
          endTime: '12:30 PM',
          formattedDate: 'Sat, Oct 14',
          formattedTime: '10:00 AM',
          location: 'Design Studio',
          distance: 2.8,
          totalSpots: 12,
          availableSpots: 7,
          isAvailable: true,
          categoryId: 6, // Renovation
          hostId: 3, // Modern Renovations Co.
          featured: false,
          thisWeekend: true
        },
        {
          title: 'Smart Home Setup',
          description: 'Set up and configure smart home devices for convenience and automation.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          price: 50,
          date: new Date('2023-10-15T13:00:00'),
          startTime: '1:00 PM',
          endTime: '3:30 PM',
          formattedDate: 'Sun, Oct 15',
          formattedTime: '1:00 PM',
          location: 'Tech Hub',
          distance: 5.4,
          totalSpots: 10,
          availableSpots: 0,
          isAvailable: false,
          categoryId: 4, // Electrical
          hostId: 1, // Home Depot Workshop Team
          featured: false,
          thisWeekend: true
        },
        {
          title: 'Kitchen Organization',
          description: 'Optimize your kitchen space with practical organization solutions.',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          price: 30,
          date: new Date('2023-10-15T11:00:00'),
          startTime: '11:00 AM',
          endTime: '1:00 PM',
          formattedDate: 'Sun, Oct 15',
          formattedTime: '11:00 AM',
          location: 'Home Living Center',
          distance: 1.9,
          totalSpots: 15,
          availableSpots: 4,
          isAvailable: true,
          categoryId: 2, // DIY Decor
          hostId: 3, // Modern Renovations Co.
          featured: false,
          thisWeekend: true
        }
      ];
      
      const createdWorkshops = await Promise.all(
        workshops.map(workshop => this.createWorkshop(workshop))
      );
      
      // Update category workshop counts
      const categoryWorkshopCounts = new Map<number, number>();
      
      for (const workshop of createdWorkshops) {
        const currentCount = categoryWorkshopCounts.get(workshop.categoryId) || 0;
        categoryWorkshopCounts.set(workshop.categoryId, currentCount + 1);
      }
      
      // Update each category workshop count
      for (const entry of categoryWorkshopCounts.entries()) {
        const categoryId = entry[0];
        const count = entry[1];
        
        await db
          .update(categories)
          .set({ workshopCount: count })
          .where(eq(categories.id, categoryId));
      }
      
      // Seed Testimonials
      const testimonials: InsertTestimonial[] = [
        {
          content: "The electrical basics workshop saved me so much money! I can now handle simple repairs myself instead of calling an electrician every time.",
          rating: 5,
          name: "James Miller",
          location: "New homeowner in Portland",
          initials: "JM"
        },
        {
          content: "I loved the garden planning workshop! The instructor was knowledgeable and I left with a complete plan for my backyard. Highly recommend!",
          rating: 5,
          name: "Amanda Rodriguez",
          location: "Homeowner in Austin",
          initials: "AR"
        },
        {
          content: "The real-time availability feature is amazing! No more calling around to check if spots are open. Booked my plumbing workshop in seconds.",
          rating: 4,
          name: "David Kim",
          location: "First-time homeowner in Chicago",
          initials: "DK"
        }
      ];
      
      await Promise.all(
        testimonials.map(testimonial => this.createTestimonial(testimonial))
      );
    }
    } catch (error) {
      console.error("Error seeding database:", error);
      throw error;
    }
  }
}

// Export the database storage instance
export const storage = new DatabaseStorage();
