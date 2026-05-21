# ShoeMART - E-Commerce Platform

A full-stack e-commerce platform for selling shoes with customer portal, admin dashboard, and backend API.

## Tech Stack

- **Frontend:** React 18 + Vite + Context API
- **Admin Panel:** React 18 + Vite
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Image Upload:** Cloudinary

## Project Structure

```
shoemart/
├── backend/              # Express API server
│   ├── controllers/      # Request handlers (cart, order, product, user)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & file upload
│   ├── config/          # DB & cloud config
│   └── server.js        # Entry point
├── frontend/            # Customer React app
│   ├── src/
│   │   ├── pages/       # 17 pages (Home, Product, Cart, Checkout, Auth, etc)
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth, Cart, Products context
│   │   └── App.jsx      # Main app
├── admin/               # Admin React dashboard
│   ├── src/
│   │   ├── pages/       # Dashboard, Products, Orders, Users
│   │   └── components/  # Admin layout & routes
└── README.md
```

## Features

**Customer Features:**

- User authentication (Sign up, Sign in, Verify email)
- Product browsing (Home, Collections, Men's/Women's shoes)
- Search and filter products
- Shopping cart management
- Checkout process
- Order history & tracking
- Wishlist
- User profile management

**Admin Features:**

- Admin authentication
- Dashboard with metrics
- Product management (CRUD)
- Order management & tracking
- User management
- Protected admin routes

**Backend Features:**

- RESTful API for all operations
- User & admin authentication with JWT
- Product catalog management
- Shopping cart operations
- Order processing & tracking
- Cloudinary image uploads
- MongoDB data persistence

## Installation

### Prerequisites

- Node.js (v14+)
- MongoDB local/cloud
- Cloudinary account (for image uploads)

### Setup Steps

**1. Backend Setup**

```bash
cd backend
npm install
# Create .env file with:
# - MONGODB_URI=your_mongodb_url
# - CLOUDINARY_NAME=your_cloudinary_name
# - CLOUDINARY_API_KEY=your_api_key
# - CLOUDINARY_API_SECRET=your_api_secret
npm start
# Runs on http://localhost:5000
```

**2. Frontend Setup**

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

**3. Admin Setup**

```bash
cd admin
npm install
npm run dev
# Runs on http://localhost:5174
```

## API Routes

**User Routes:** `/api/users` - signup, login, profile, update
**Product Routes:** `/api/products` - get all, get by id, create, update, delete
**Cart Routes:** `/api/cart` - add, remove, update quantities
**Order Routes:** `/api/orders` - create, get history, track orders

## Key Components

| Component          | Purpose                           |
| ------------------ | --------------------------------- |
| **ProtectedRoute** | Guards authenticated pages        |
| **AuthContext**    | Manages user authentication state |
| **CartContext**    | Manages shopping cart state       |
| **shoeContext**    | Manages product data globally     |
| **ProductCard**    | Displays individual products      |
| **Header/Footer**  | Navigation & layout               |

## Environment Setup

Create `.env` files in backend, frontend, and admin with appropriate API endpoints and configurations.

## Git Commits

```
- 9b291a2: Initial backend setup
- 33b2946: Frontend customer application
- 585f29e: Admin dashboard
- 3fdef8b: Project documentation
```

## Running the Full Application

Open 3 terminals:

```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Admin
cd admin && npm run dev
```

Visit:

- Customer: http://localhost:5173
- Admin: http://localhost:5174
- API: http://localhost:5000

## Author

Sharath Pillai
