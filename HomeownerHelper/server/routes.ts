import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Get all categories
  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  // Get category by ID
  app.get("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  
  // Get all workshops
  app.get("/api/workshops", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string | undefined;
      const categoryId = req.query.categoryId ? 
        parseInt(req.query.categoryId as string) : 
        undefined;
      
      if (query || categoryId) {
        const workshops = await storage.searchWorkshops(query || "", categoryId);
        return res.json(workshops);
      }
      
      const workshops = await storage.getWorkshops();
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshops" });
    }
  });
  
  // Get featured workshops
  app.get("/api/workshops/featured", async (_req: Request, res: Response) => {
    try {
      const featuredWorkshops = await storage.getFeaturedWorkshops();
      res.json(featuredWorkshops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured workshops" });
    }
  });
  
  // Get weekend workshops
  app.get("/api/workshops/weekend", async (_req: Request, res: Response) => {
    try {
      const weekendWorkshops = await storage.getWeekendWorkshops();
      res.json(weekendWorkshops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch weekend workshops" });
    }
  });
  
  // Get workshop by ID
  app.get("/api/workshops/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid workshop ID" });
      }
      
      const workshop = await storage.getWorkshopById(id);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      
      res.json(workshop);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshop" });
    }
  });
  
  // Get workshops by category ID
  app.get("/api/categories/:id/workshops", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const workshops = await storage.getWorkshopsByCategory(id);
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshops for category" });
    }
  });
  
  // Update workshop availability
  app.patch("/api/workshops/:id/availability", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid workshop ID" });
      }
      
      const schema = z.object({
        availableSpots: z.number().min(0)
      });
      
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request body" });
      }
      
      const workshop = await storage.updateWorkshopAvailability(id, result.data.availableSpots);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      
      res.json(workshop);
    } catch (error) {
      res.status(500).json({ message: "Failed to update workshop availability" });
    }
  });
  
  // Get all hosts
  app.get("/api/hosts", async (_req: Request, res: Response) => {
    try {
      const hosts = await storage.getHosts();
      res.json(hosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hosts" });
    }
  });
  
  // Get host by ID
  app.get("/api/hosts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid host ID" });
      }
      
      const host = await storage.getHostById(id);
      if (!host) {
        return res.status(404).json({ message: "Host not found" });
      }
      
      res.json(host);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch host" });
    }
  });
  
  // Get all testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // Create the server
  const httpServer = createServer(app);
  return httpServer;
}
