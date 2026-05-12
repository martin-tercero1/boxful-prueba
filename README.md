# Boxful App

Frontend for the Boxful platform, built as part of technical test.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Ant Design 5
- **Language**: TypeScript
- **HTTP Client**: Axios

## Features

- User authentication (signup, login, logout)
- Create orders with a two-step form (order details + products)
- Order history with filters
- Real-time settlement amount displayed in the header

---

## Prerequisites

- Node.js 18+
- pnpm
- Boxful API running locally or use the live deployment

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/martin-tercero1/boxful-prueba.git
cd boxful-prueba
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root of the project:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

> To use the live API instead, replace the URL with the deployed backend URL.

### 4. Start the development server
```bash
pnpm dev
```

The app will be running at `http://localhost:3000`

---

## Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Login | `/iniciar-sesion` | Email and password authentication |
| Sign Up | `/registro` | New user registration |
| Create Order | `/crear-orden` | Two-step order creation form |
| Order History | `/historial` | List of orders with filters |

---

## Notes

- Authentication tokens are stored in `localStorage`
- The access token is automatically attached to every API request via an Axios interceptor
- If the access token expires, it is refreshed automatically using the refresh token
- If the refresh token is also expired, the user is redirected to `/login`

---

## Live Demo

App: `https://boxful-prueba.vercel.app/`
API: `https://boxful-api.vercel.app/docs`
