export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string;
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: "pending" | "in-progress" | "completed";
  paymentStatus: "paid" | "unpaid";
}

export interface Payment {
  projectId: string;
  amount: number;
  date: string; // ISO format
}

export interface DashboardState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

export type ProjectStatus = Project["status"];
export type PaymentStatus = Project["paymentStatus"];

// Discriminated union for actions
export type DashboardAction =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "UPDATE_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: Project }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string; amount: number } }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: ProjectStatus } };

export type DashboardStats = {
  totalProjects: number;
  paidProjects: number;
  unpaidProjects: number;
  totalClients: number;
  totalRevenue: number;
};