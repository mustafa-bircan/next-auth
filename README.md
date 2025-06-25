# 🔐 KAYRA EXPORT NEXTAUTH

Role-based authentication system built with **Next.js**, **NextAuth.js**, **Auth0**, **TypeScript**, and **Tailwind CSS**. Includes a full-featured Admin & User panel with dark mode, animated transitions, test coverage, and modular architecture.

---

## 🚀 Features

- 🌐 **Next.js App Router (13+)**
- 🔐 **Role-based Authentication** with `Auth0` and `NextAuth`
- 🎨 **ThemeProvider** (light/dark toggle)
- 📊 **Admin & User Dashboards**
- 📦 Global State via React Context
- ✅ Unit Tests with `Jest` & `Testing Library`
- 🧪 `jsdom` test environment
- ⚙️ Page transition animations (Framer Motion)
- ✨ Polished UI with TailwindCSS
- 🧼 Clean, scalable project structure

---

## 🛠️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/your-username/next-auth.git
cd next-auth


##  Install Dependencies
npm install


##  Setup .env.local
NEXT_PUBLIC_AUTH0_CLIENT_ID=your_client_id
NEXT_PUBLIC_AUTH0_DOMAIN=your_auth0_domain
NEXTAUTH_SECRET=your_nextauth_secret
AUTH0_CLIENT_SECRET=your_auth0_secret


##  Run Locally
Visit http://localhost:3000



##  Run Tests
npm run test


Includes tests for:

Role-based access

Theme toggle

Dashboard render logic

Conditional navigation (useRouter mock)

Jest DOM assertions





About the Project
"next-auth" is a role-based platform that empowers admins and users with tailored dashboard experiences, responsive UI, and real-time data filtering. Designed with production readiness, scalability, and testing in mind.




