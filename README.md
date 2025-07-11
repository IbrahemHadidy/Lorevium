# Lorevium

> **Note**: This project was originally built as a team project. I later rebuilt the frontend from scratch for learning and practice purposes. The original team version is saved in the `backup/main-before-replacement` branch.

---

## 🏗️ Project Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **UI**: shadcn/ui, Tailwind CSS
- **State Management**: Redux Toolkit, RTK Query
- **Form Handling**: React Hook Form + Zod
- **i18n**: next-intl (English & Arabic)

---

## 🚀 Features

### ✅ Authentication

- Sign up / Sign in / Reset Password
- Email verification flow

### ✅ Admin Dashboard

- View all admins and users (Super Admin only)
- View all users (Admin only)
- Responsive UI

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
| i18n               | next-intl                                     |
| Dev Tools          | ESLint, Prettier                              |

---

## 🗂️ Folder Structure

```bash
/src
  /app                    # App router pages
    /[locale]             # Locale-specific pages
  /assets                 # Static assets
  /components             # UI components
    /ui                   # Shared UI components
    /utils                # Utility components
    /layout               # Layout components
    /...                  # Page-specific components
    /providers            # Provider components
  /hooks                  # Custom React hooks
    /submitions           # Form submission hooks
    /...                  # Other utility hooks
  /locales                # next-intl translations
  /lib                    # Shared logic
    /api                  # API routes (RTK Query)
    /enums                # Enum definitions
    /features             # Redux slices
    /i18n                 # i18n config
    /types                # Type definitions
    /utils                # Utility functions
    /validations          # Form validation schemas
    /store.ts             # Redux store
  /styles                 # Styles
    /globals.css          # Global styles (Tailwind CSS, shadcn/ui)
```

---

## 📦 Setup & Installation

1. **Clone the repo**

```bash
git clone https://github.com/IbrahemHadidy/Lorevium.git
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set environment variables**

```bash
cp .env.example .env.local
# Then fill in the values (backend URL)
```

4. **Run the app**

```bash
pnpm dev
```
