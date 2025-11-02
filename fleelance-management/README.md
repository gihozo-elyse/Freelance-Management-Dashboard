# Freelance Dashboard (React + TypeScript)

A mini-dashboard that displays clients, projects, and payments using TypeScript for type safety.

## 🚀 Technologies Used

- React + TypeScript
- Context API + useReducer
- Tailwind CSS for styling
- Vite for build tooling
- React Router for navigation

## ✨ Main Features

- Type-safe React components with TypeScript
- Centralized state management using Context API + useReducer
- Responsive design with Tailwind CSS
- Client, Project, and Payment data models
- Filtering and searching functionality
- Interactive UI with hover and focus states

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gihozo-elyse/Freelance-Management-Dashboard.git
   cd Freelance-Management-Dashboard/fleelance-management
   ```

2. **Install dependencies**
   ```bash
   npm install
  

3. **Run the development server**
   ```bash
   npm run dev
  

4. **Open in browser**
   The application will be available at `http://localhost:5173`

## 🗂️ Project Structure

```
fleelance-management/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── clients/
│   │   └── projects/
│   │
│   ├── context/
│   │   └── DashboardContext.tsx
│   │
│   ├── hooks/
│   │   └── useDashboardData.ts
│   │
│   ├── types/
│   │   ├── client.types.ts
│   │   ├── project.types.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── formatters.ts
│   │
│   ├── views/
│   │   ├── DashboardView.tsx
│   │   ├── ProjectsView.tsx
│   │   └── ClientsView.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.tsx
│
├── .gitignore
├── package.json
└── tsconfig.json
```

### Key Features of This Structure:

- **Separation of Concerns**: Clear distinction between UI components, business logic, and data
- **Scalability**: Easy to add new features with organized domain grouping
- **Maintainability**: Clear file naming and related files kept together
- **Type Safety**: Dedicated types folder for TypeScript definitions
- **Assets Management**: Properly organized static assets
- **Testing Ready**: Easy to add test files next to components

## 📸 Screenshots

![Dashboard Preview](/screenshots/dashboard-preview.png)

## 🌐 Deployment

[Live Demo](#) (Add your deployment link here)

