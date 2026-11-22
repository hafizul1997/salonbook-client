# SalonBook – Salon Appointment Booking Platform

SalonBook is a full-stack salon appointment booking platform that allows customers to explore salon services, book appointments, manage their bookings, and make secure online payments. Administrators can manage services, appointments, customers, and transactions through a dedicated dashboard.

## Features

### Customer Features
- Browse all available salon services.
- Search services by name.
- Sort services by price.
- View detailed service information, pricing, and duration.
- Register and sign in securely.
- Book salon appointments.
- View personal appointments and booking status.
- Cancel pending appointments.
- Pay for confirmed appointments using Stripe Checkout.
- View payment status and transaction information.
- Update personal profile information and profile image.

### Admin Features
- Admin dashboard with overview statistics.
- Create, update, and delete salon services.
- Upload service images using ImgBB.
- Activate or deactivate services.
- View and manage customer appointments.
- Confirm or cancel appointments.
- View customer information.
- Block or unblock customer accounts.
- View and manage transaction records.
- Update administrator profile information.

## Technology Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- React Hook Form
- Zod
- Sonner
- Lucide React
- Framer Motion

### Backend
The frontend communicates with a REST API built using Node.js, Express.js, TypeScript, and MongoDB.

### Integrations
- Better Auth – Authentication
- Google OAuth – Social authentication
- Stripe – Online payment processing
- ImgBB – Image hosting

## Project Structure

```text
salonbook-client/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── services/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── components/
│   │   ├── home/
│   │   └── ui/
│   ├── data/
│   └── lib/
├── .env
├── package.json
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js (LTS recommended)
- npm
- Git
- Running SalonBook backend server

### 1. Clone the repository

```bash
git clone YOUR_CLIENT_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd salonbook-client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Use the appropriate backend API URL when deploying to production.

Never commit `.env` files or expose secret credentials.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Backend Repository

The SalonBook backend is maintained in a separate repository.

**Backend GitHub Repository:** YOUR_SERVER_GITHUB_REPOSITORY_URL

The backend provides REST APIs for authentication, services, appointments, users, image uploads, payments, and transactions.

## Live Demo

**Live Application:** YOUR_LIVE_DEPLOYMENT_URL

*Replace this placeholder with the deployed application URL when available.*

## Security

- Authentication and authorization are handled through secure authentication mechanisms.
- Protected operations require appropriate user roles.
- Payment status is updated through verified Stripe webhook events.
- Environment variables and secret credentials must never be committed to Git.

## Author

Developed as a full-stack web development assignment.

