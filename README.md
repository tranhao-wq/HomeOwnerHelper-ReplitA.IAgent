# HomeOwnerHelper-ReplitA.IAgent
# 🏠 HomeSkills – Find Local Workshops for New Homeowners
HomeSkills is a mobile-first web application designed to help new homeowners discover local home improvement classes and workshops with real-time availability. From plumbing basics to DIY furniture building, this platform connects users with hands-on learning opportunities in their area.
_______________________________________________
### 🚀 Features
•	✅ Mobile-First Responsive Design – Optimized UI for all devices
•	📅 Real-Time Workshop Availability – See open spots instantly
•	🔍 Search and Filter – Easily find classes by category or keyword
•	📚 Workshop Details Pages – Learn more and book your spot
•	💬 Testimonials – Hear from past attendees
•	📌 Category Filters – Browse workshops by topics like Electrical, Gardening, DIY, and more
•	📍 Location-Based Discovery (planned)
•	📩 Contact Form – Submit inquiries directly
•	📬 Email Alerts (planned) – Get notified when new spots open
•	💳 Payment Integration (future feature)
•	🌟 Favorites and User Accounts (future feature)
_______________________________________________
### 🧱 Tech Stack
![image](https://github.com/user-attachments/assets/4f96c0c7-10ef-43fa-b232-6003ff640604)
_______________________________________________
### 🗂️ Project Structure
![image](https://github.com/user-attachments/assets/be978c73-b9f2-4a45-abb0-7f9167178eef)
_______________________________________________
### 🛠️ Key Improvements Made
•	✅ Replaced in-memory storage with PostgreSQL database
•	✅ Created database schema for workshops, categories, hosts, and testimonials
•	✅ Built seed script to populate initial data
•	✅ Fixed DOM nesting warnings in CategoryFilter component
•	✅ Improved error handling in DB operations
_______________________________________________
### 📌 Next Steps
•	Add user registration & login
•	Implement booking and payment flow
•	Add map integration for workshop locations
•	Enable user reviews and ratings
•	Add calendar and date filtering
_______________________________________________
### 📸 Screenshots
![image](https://github.com/user-attachments/assets/0b92b8aa-31b9-41b4-9796-281c61cd292e)
![image](https://github.com/user-attachments/assets/4e89af25-03c0-4988-bc4a-612a420f6394)
![image](https://github.com/user-attachments/assets/1d402d62-063f-418f-ac4b-f88e1736274e)
![image](https://github.com/user-attachments/assets/dc954b8d-1bb0-4c44-8837-c5c48e6e89c6)
![image](https://github.com/user-attachments/assets/85c47f47-848c-4269-a5f1-a084d587bb3b)
![image](https://github.com/user-attachments/assets/51530980-2db9-4225-b7fb-99a26f00737d)
![image](https://github.com/user-attachments/assets/b7cbc1c6-1a37-4ddc-bda7-2a51b15b76e1)
![image](https://github.com/user-attachments/assets/f40ce46a-0854-4086-b84c-987d4e034ab3)
![image](https://github.com/user-attachments/assets/0d26d64c-2e18-4f92-b135-dcf125d4eb5c)
![image](https://github.com/user-attachments/assets/9948ffb8-7012-4d1d-99d1-19bd065ab882)
![image](https://github.com/user-attachments/assets/0b0df1f1-1286-4f6f-a148-7174b1ba8600)
![image](https://github.com/user-attachments/assets/17fcb966-6ec7-46ec-ab7b-5484fdf91c06)
![image](https://github.com/user-attachments/assets/f32b4c3d-27bd-4e24-b555-07bd439249a9)
(screenshots of homepage, filters, workshop details page showcase UI)
________________________________________
### 📦 Setup Instructions
# Clone the repo
git clone https://github.com/yourusername/HomeownerHelper.git
cd HomeownerHelper
# Install dependencies
npm install

# Run database migration
npx tsx scripts/db-push.ts

# Start the server
npm run dev
________________________________________
### 📝 License
MIT

