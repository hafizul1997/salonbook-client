# SalonBook – Salon Appointment Booking Platform

SalonBook is a full-stack salon appointment booking platform. Customers can explore salon services, create and manage appointments, and pay for confirmed bookings. Administrators can manage services, appointments, customers, and transaction records through a role-based dashboard.

## Live Application

- **Frontend:** https://salonbook-client-5blk.vercel.app/
- **Backend API:** https://salonbook-server-9hvv.onrender.com
- **Client repository:** https://github.com/hafizul1997/salonbook-client
- **Server repository:** https://github.com/hafizul1997/salonbook-server

## Features

### Customer
- Browse active salon services and view service details.
- Search services by name and filter by category.
- Sort services by price.
- Register and sign in with email/password or Google.
- Book appointments for available dates and time slots.
- View appointment status and payment status.
- Cancel pending appointments.
- Prevent duplicate active bookings for the same date and time slot.
- Pay for confirmed appointments through Stripe Checkout.
- View and update profile information.

### Administrator
- Access a role-based admin dashboard.
- Create, update, activate/deactivate, and delete salon services.
- Upload service images through ImgBB.
- View and manage appointment requests.
- Confirm or cancel appointments.
- View registered customers and block/unblock customer accounts.
- View transaction records.
- Update administrator profile information.
- Admin accounts cannot create customer appointments.

## Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Better Auth
- React Hook Form and Zod
- Sonner notifications
- Lucide React

### Backend and Services
- Node.js
- Express.js
- TypeScript
- MongoDB and Mongoose
- Better Auth and JWT
- Google OAuth
- Stripe Checkout and webhooks
- ImgBB image hosting

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm
- Git
- A running SalonBook backend

### 1. Clone the repository

```bash
git clone https://github.com/hafizul1997/salonbook-client.git
cd salonbook-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_AUTH_URL=http://localhost:5000
```

For production, the Vercel project uses:

```env
NEXT_PUBLIC_API_URL=https://salonbook-server-9hvv.onrender.com/api
NEXT_PUBLIC_AUTH_URL=https://salonbook-server-9hvv.onrender.com
```

Do not commit `.env`, `.env.local`, or any file containing real credentials.

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Backend

The backend is maintained in a separate repository:

https://github.com/hafizul1997/salonbook-server

The backend provides REST APIs for authentication, services, appointments, user management, image uploads, payments, and transactions.

## Deployment

- The frontend is deployed on Vercel.
- The backend is deployed on Render.
- Production API base URL: `https://salonbook-server-9hvv.onrender.com/api`

## Security

- Authentication is handled by Better Auth.
- Protected features use authenticated sessions/JWT-based backend authorization.
- Admin and customer permissions are enforced by the backend.
- Blocked users are restricted from protected platform features.
- Payment status must be updated only after a verified Stripe webhook event.
- Secret keys and database credentials must be stored in environment variables, never committed to Git.

## Project Status

The frontend and backend are deployed. Email/password and Google sign-in have been tested with current accounts. An older customer account still has a sign-in issue and requires separate account-level investigation. Payment/webhook production verification should be completed before final submission.

## Author

SalonBook – Full-Stack Web Development Assignment.
