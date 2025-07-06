# Noor Medical Center

> **Note**: This project is currently in the early stages of development and represents a work-in-progress demonstration. Many features are incomplete or only partially implemented. The application currently contains basic functionality for demonstration purposes only and is not suitable for real-world use.

A fictional full-stack web application built for demonstration purposes only, not affiliated with any real medical center. It includes managing patient appointments, authentication, and admin dashboards.

---

## 🏗️ Project Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **UI**: shadcn/ui, Tailwind CSS
- **State Management**: Redux Toolkit, RTK Query
- **Form Handling**: React Hook Form + Zod
- **i18n**: next-intl (English & Arabic)

### Backend

- **Framework**: Next.js 15 (API Router)
- **Database**: PostgreSQL (with Prisma ORM)
- **Auth**: JWT, hashed passwords
- **Docs**: Swagger (OpenAPI via Swagger JSDoc)

---

## 🚀 Features

### ✅ Authentication

- Sign up / Sign in
- JWT-based auth
- Email verification flow

### ✅ Admin Dashboard

- View patient and doctor statistics
- Admin-only access
- Responsive UI

### ✅ Appointment System

- Booking & management
- Calendar view
- Patient & Doctor roles

### ✅ Multi-language Support

- English and Arabic
- RTL support included

### ✅ Dark Mode

- Toggleable theme
- System theme detection

---

## 🧪 Technologies & Tools

| Purpose            | Tech/Tool                                     |
| ------------------ | --------------------------------------------- |
| Frontend           | Next.js (App Router), Tailwind CSS, shadcn/ui |
| State/Data         | Redux Toolkit, RTK Query                      |
| Forms & Validation | React Hook Form, Zod                          |
| Backend            | Next.js (API Router), Prisma, PostgreSQL      |
| Auth               | JWT, bcrypt                                   |
| API Docs           | Swagger JSDoc                                 |
| i18n               | next-intl                                     |
| Dev Tools          | ESLint, Prettier                              |

---

## 🗂️ Folder Structure

```bash
/src
  /app                    # App router pages
    /[locale]             # Locale-specific pages
    /api                  # API routes
    /api-doc              # API docs page
    /global.css           # Global styles (Tailwind CSS, shadcn/ui)
  /assets                 # Static assets
  /components             # UI components
    /ui                   # Shared UI components
    /utils                # Utility components
    /layout               # Layout components
    /...                  # Page-specific components
    /store-provider.tsx   # Redux store provider
  /hooks                  # Custom React hooks
    /submitions           # Form submission hooks
    /...                  # Other utility hooks
  /locales                # next-intl translations
  /lib                    # Shared logic
    /api                  # API routes (RTK Query)
    /features             # Redux slices
    /i18n                 # i18n config
    /prisma               # Prisma schema, client, seed, and migrations
    /types                # Type definitions
    /utils                # Utility functions
    /validations          # Form validation schemas
    /store.ts             # Redux store
    /swagger.ts           # Swagger config
```

---

## 📦 Setup & Installation

1. **Clone the repo**

```bash
git clone https://github.com/your-username/noor-medical-center.git
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set environment variables**

```bash
cp .env.example .env.local
# Then fill in the values (database URL, JWT secret, etc.)
```

4. **Run the app**

```bash
pnpm dev
```

---

## 📈 Database

- Using **PostgreSQL** with **Prisma** for the backend (Next.js).
- Migrations and seed setup are handled with the Prisma CLI.

---

## 🧾 API Documentation

- Swagger Docs available at:  
  `http://localhost:3000/api/docs` (Next.js dev server)

---

## 📍 Roadmap

- [x] Admin dashboard
- [x] Appointment system
- [ ] Email verification
- [x] Dark mode support
- [ ] Notifications system

---

## 📚 License

This project is licensed under the MIT License.
