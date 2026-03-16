# SYplat — SAP Connectivity Automation Platform

A React + TypeScript frontend for configuring SAP identity provisioning systems (Source, Target, and Proxy). Built with Vite, Redux Toolkit, React Router, and CSS Modules.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (comes with Node.js)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:8080** (or the port shown in your terminal).

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the local development server with hot reload |
| `npm run build` | Build the app for production (outputs to `dist/`) |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run test` | Run all tests once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

---

## Project Structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Root component (providers + router)
├── routes/               # Route definitions and path constants
├── layout/               # AppLayout (TopBar + LeftSidebar + main)
├── pages/                # Page components per route
│   ├── Dashboard/
│   ├── Migration/        # Source / Target / Proxy system setup
│   ├── MasterIdentity/
│   └── EntryTypes/
├── UI/                   # Reusable, logic-free UI components
│   ├── Button/
│   ├── Dropdown/
│   ├── Label/
│   ├── CardTile/
│   ├── TopBar/
│   ├── LeftSidebar/
│   └── ...
├── components/
│   └── SystemSetup/      # Shared form sections for system configuration
├── hooks/                # Custom React hooks (useSystemSetup, useSidebar, etc.)
├── services/             # API client and service modules
├── state/                # Redux store and slices
├── constants/            # App-wide constants (labels, colors, sidebar config)
├── types/                # Shared TypeScript types
├── styles/               # Global CSS, variables, reset
└── utils/                # Pure utility functions
```

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **Redux Toolkit** — global state management
- **React Router v6** — client-side routing
- **TanStack Query** — server state and data fetching
- **CSS Modules** — scoped component styling
- **Tailwind CSS** — utility classes (shadcn/ui base)
- **Radix UI** — accessible headless UI primitives
- **Lucide React** — icon library
- **Vitest** + **Testing Library** — unit testing

---

## Environment Variables

Create a `.env` file in the project root to configure the API base URL:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

If not set, the API client defaults to an empty base URL (relative paths).

---

## Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder. You can preview it locally with:

```bash
npm run preview
```
