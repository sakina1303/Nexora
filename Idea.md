# Nexora – Digital Service Marketplace

---

## Project Overview

Nexora is a full-stack Digital Service Marketplace developed using modern web technologies. The platform allows users to explore, select, and purchase digital services such as web development, UI/UX design, and AI integration solutions.

Unlike traditional product-based e-commerce platforms, Nexora structures digital services as purchasable products. Users can browse services, add them to a cart, and place orders online.

The system follows a Web Service Architecture where:

- The backend provides RESTful APIs.
- The frontend consumes these APIs.
- The database is managed using Prisma ORM with SQLite.
- Backend and frontend are deployed independently.

---

## Objective

The primary objectives of Nexora are:

- To implement full CRUD functionality.
- To design and develop RESTful APIs.
- To use Prisma ORM with SQLite for database management.
- To follow a proper client-server architecture.
- To deploy backend and frontend separately using cloud platforms.

This project simulates a real-world startup platform offering digital services through an e-commerce structure.

---

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript (or React)
- Fetch API for backend communication
- Deployment on Vercel

### Backend

- Node.js
- Express.js
- Prisma ORM
- SQLite database
- CORS configuration
- Deployment on Render

---

## Database Design

### Service Model

Represents the digital services offered on the platform.

- `id` (Int, Primary Key, Auto Increment)
- `title` (String)
- `description` (String)
- `price` (Float)
- `createdAt` (DateTime, Default: current timestamp)

### Order Model

Represents customer service bookings.

- `id` (Int, Primary Key, Auto Increment)
- `customerName` (String)
- `email` (String)
- `serviceId` (Int, Foreign Key reference)
- `createdAt` (DateTime, Default: current timestamp)

---

## Core Features

### User Features

- View all available services
- View service details and pricing
- Add services to cart
- Place an order
- Submit project request information

### Admin Features

- Create a new service (CREATE)
- View all services (READ)
- Update service details (UPDATE)
- Delete a service (DELETE)
- View customer orders

---

## RESTful API Endpoints

### Service APIs

- `POST /services` – Create a new service  
- `GET /services` – Retrieve all services  
- `PUT /services/:id` – Update a service  
- `DELETE /services/:id` – Delete a service  

### Order APIs

- `POST /orders` – Create a new order  
- `GET /orders` – Retrieve all orders  

These endpoints ensure implementation of at least one complete CRUD RESTful API as required.

---

## System Architecture

```
Frontend (Vercel Deployment)
        ↓
REST API Calls
        ↓
Backend (Render Deployment – Express with Prisma)
        ↓
SQLite Database
```

This architecture ensures proper separation of concerns and follows web service principles.

---

## Key Highlights

- Full-stack web application
- RESTful API implementation
- ORM-based database management
- Client-server separation
- Cloud deployment
- Real-world digital marketplace simulation

---

## Future Enhancements

- User authentication (Login/Signup)
- Payment gateway integration
- Admin dashboard interface
- Order status tracking
- Reviews and ratings system

---

## Conclusion

Nexora is a scalable digital service marketplace built to simulate a real-world startup model. It demonstrates backend API development, database design using Prisma, frontend-backend integration, and deployment practices aligned with industry standards.

