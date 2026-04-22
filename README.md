# La Balsa POS

A full-service, real-time restaurant POS (Point of Sale) system built as a CS542 Final Project.

Guests scan a QR code at their table, collaboratively build a shared cart in real-time, and push orders to the restaurant's admin dashboard. The admin staff can view incoming orders per table, merge orders, edit items, and finalize orders for the kitchen. 

## 🚀 Core Value Proposition

**Live Shared Carts:** Guests at the same table see the same cart updating live, and the restaurant receives those orders instantly. This real-time synchronization between guests, the server, and the admin dashboard is what elevates this from a simple menu website to a fully-fledged POS system.

## 🏗 Architecture & Stack

This project is structured as a Monorepo using `npm workspaces` to ensure type safety and seamless coordination between the frontend and backend.

- **Frontend (`apps/client`)**: High-performance React application powered by Vite, providing the guest-facing menu and cart.
- **Admin Panel (`apps/admin`)**: React application for restaurant staff to manage incoming orders.
- **Backend (`apps/server`)**: NestJS REST API with WebSocket gateway for real-time updates.
- **Database**: PostgreSQL for normalized data storage (Owner → Location → Menu → Item entities).
- **Caching & Pub/Sub (Pending)**: Redis for persistent cart storage and WebSocket event broadcasting.

## 🛠 Installation & Setup

### Prerequisites

Ensure your environment matches our production specifications:
- **Node.js**: v22.12.0 or higher
- **Package Manager**: npm
- **Docker & Docker Compose**: Required for running PostgreSQL and Redis locally

### Getting Started

1. **Install dependencies**
   From the root directory, install dependencies for all workspace applications simultaneously:
   ```bash
   npm install
   ```

2. **Launch the Application Stack**
   Start the Client, Admin, Server, PostgreSQL applications concurrently:
   ```bash
   npm run dev
   ```

## 📚 CS542 Deliverables

As part of the CS542 Database Systems course, the following database documentation will be included in the final submission:
- Entity-Relationship (ER) Diagrams
- BCNF Normalization Analysis
- Advanced SQL Query Examples (Multi-table joins, aggregations, transactions)
