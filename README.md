# Lightweb Finance System

A modern membership and finance management system built for Lightweb Organization.

## Live Demo
- Frontend: [https://financelight.netlify.app/](https://financelight.netlify.app/)
- Backend API: Hosted on Render (Link TBD)

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Radix UI, Lucide Icons
- **Backend**: Node.js, Express, JWT, PDF-lib
- **Database**: Neon DB (PostgreSQL)
- **Hosting**: Netlify (Frontend), Render (Backend)

## Key Features
- **JWT Auth**: Role-based access (Admin/Member)
- **Payments**: Auto-invoice generation (LIGHTWEB-YYYYMM-XXXX)
- **PDF Receipts**: Professional automated PDF receipt generation
- **Dashboard**: Real-time financial stats and member tracking
- **Expenses**: Admin-only expense management and reporting

## Setup
1. Clone the repository
2. Install dependencies: `npm install` and `cd server && npm install`
3. Configure `.env` with your Neon DB connection string and JWT secret
4. Run locally: `npm run dev` (Frontend) and `node server/index.js` (Backend)
