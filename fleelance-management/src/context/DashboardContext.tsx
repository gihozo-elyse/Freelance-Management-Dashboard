import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { DashboardState, DashboardAction, Payment } from '../types';

const initialState: DashboardState = {
  clients: [
    {
      id: "1",
      name: "Acme Corp",
      country: "United States",
      email: "contact@acme.com"
    },
    {
      id: "2",
      name: "Global Tech",
      country: "Germany",
      email: "info@globaltech.de"
    }
  ],
  projects: [
    {
      id: "1",
      clientId: "1",
      title: "E-commerce Website",
      budget: 5000,
      status: "in-progress",
      paymentStatus: "unpaid"
    },
    {
      id: "2",
      clientId: "2",
      title: "Mobile App Development",
      budget: 8000,
      status: "completed",
      paymentStatus: "paid"
    }
  ],
  payments: [
    {
      projectId: "2",
      amount: 8000,
      date: new Date().toISOString()
    }
  ]
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case "ADD_CLIENT":
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };

    case "UPDATE_CLIENT":
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.id ? action.payload : client
        )
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload : project
        )
      };

    case "ADD_PAYMENT":
      return {
        ...state,
        payments: [...state.payments, action.payload],
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, paymentStatus: "paid" as const }
            : project
        )
      };

    case "MARK_PROJECT_PAID":
      const { projectId, amount } = action.payload;
      const existingPayment = state.payments.find(p => p.projectId === projectId);
      
      if (existingPayment) {
        return state; // Already paid
      }

      const newPayment: Payment = {
        projectId,
        amount,
        date: new Date().toISOString()
      };

      return {
        ...state,
        payments: [...state.payments, newPayment],
        projects: state.projects.map(project =>
          project.id === projectId
            ? { ...project, paymentStatus: "paid" as const }
            : project
        )
      };

    case "UPDATE_PROJECT_STATUS":
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, status: action.payload.status }
            : project
        )
      };

    default:
      return state;
  }
}

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
} | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}