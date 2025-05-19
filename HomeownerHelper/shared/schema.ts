import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories Table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  description: text("description"),
  workshopCount: integer("workshop_count").default(0),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  icon: true,
  description: true,
  workshopCount: true,
});

// Hosts Table
export const hosts = pgTable("hosts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  description: text("description"),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
});

export const insertHostSchema = createInsertSchema(hosts).pick({
  name: true,
  image: true,
  description: true,
  rating: true,
  reviewCount: true,
});

// Workshops Table 
export const workshops = pgTable("workshops", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  price: real("price").notNull(),
  date: timestamp("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  formattedDate: text("formatted_date").notNull(),
  formattedTime: text("formatted_time").notNull(),
  location: text("location").notNull(),
  distance: real("distance"),
  totalSpots: integer("total_spots").notNull(),
  availableSpots: integer("available_spots").notNull(),
  isAvailable: boolean("is_available").default(true),
  categoryId: integer("category_id").notNull(),
  hostId: integer("host_id").notNull(),
  featured: boolean("featured").default(false),
  thisWeekend: boolean("this_weekend").default(false),
});

export const insertWorkshopSchema = createInsertSchema(workshops).pick({
  title: true,
  description: true,
  image: true,
  price: true,
  date: true,
  startTime: true,
  endTime: true,
  formattedDate: true,
  formattedTime: true,
  location: true,
  distance: true,
  totalSpots: true,
  availableSpots: true,
  isAvailable: true,
  categoryId: true,
  hostId: true,
  featured: true,
  thisWeekend: true,
});

// Testimonials Table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  name: text("name").notNull(),
  location: text("location").notNull(),
  initials: text("initials").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  content: true,
  rating: true,
  name: true,
  location: true,
  initials: true,
});

// Create types for our schemas
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Host = typeof hosts.$inferSelect;
export type InsertHost = z.infer<typeof insertHostSchema>;

export type Workshop = typeof workshops.$inferSelect;
export type InsertWorkshop = z.infer<typeof insertWorkshopSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
