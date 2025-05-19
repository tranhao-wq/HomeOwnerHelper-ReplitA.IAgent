import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from "ws";

// Required for Neon serverless
neonConfig.webSocketConstructor = ws;

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not found");
  }

  console.log("Connecting to database...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // This will create or update the schema
  console.log("Pushing schema to database...");
  
  try {
    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        description TEXT,
        workshop_count INTEGER DEFAULT 0
      );
      
      CREATE TABLE IF NOT EXISTS hosts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT,
        description TEXT,
        rating REAL DEFAULT 0,
        review_count INTEGER DEFAULT 0
      );
      
      CREATE TABLE IF NOT EXISTS workshops (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        price REAL NOT NULL,
        date TIMESTAMP NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        formatted_date TEXT NOT NULL,
        formatted_time TEXT NOT NULL,
        location TEXT NOT NULL,
        distance REAL,
        total_spots INTEGER NOT NULL,
        available_spots INTEGER NOT NULL,
        is_available BOOLEAN DEFAULT true,
        category_id INTEGER NOT NULL,
        host_id INTEGER NOT NULL,
        featured BOOLEAN DEFAULT false,
        this_weekend BOOLEAN DEFAULT false
      );
      
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        initials TEXT NOT NULL
      );
    `);
    
    console.log("Schema push completed successfully!");
  } catch (error) {
    console.error("Error pushing schema:", error);
    process.exit(1);
  }

  await pool.end();
}

main().catch((err) => {
  console.error("Error in migration script:", err);
  process.exit(1);
});