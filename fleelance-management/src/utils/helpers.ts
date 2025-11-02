import type { Client, Project, DashboardState, ProjectStatus, PaymentStatus, DashboardStats } from '../types';

export function countPaymentStatus(projects: Project[]): { paid: number; unpaid: number } {
  return projects.reduce(
    (acc, project) => {
      if (project.paymentStatus === "paid") {
        acc.paid += 1;
      } else {
        acc.unpaid += 1;
      }
      return acc;
    },
    { paid: 0, unpaid: 0 }
  );
}

export function findClientById(clients: Client[], clientId: string): Client | undefined {
  return clients.find(client => client.id === clientId);
}

export function recordPayment(
  projectId: string, 
  amount: number, 
  projects: Project[]
): { isValid: boolean; error?: string } {
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return { isValid: false, error: "Project not found" };
  }
  
  if (project.paymentStatus === "paid") {
    return { isValid: false, error: "Project is already paid" };
  }
  
  if (amount <= 0) {
    return { isValid: false, error: "Amount must be positive" };
  }
  
  return { isValid: true };
}

export function filterProjects(
  projects: Project[], 
  filters: { status?: ProjectStatus; paymentStatus?: PaymentStatus }
): Project[] {
  return projects.filter(project => {
    if (filters.status && project.status !== filters.status) return false;
    if (filters.paymentStatus && project.paymentStatus !== filters.paymentStatus) return false;
    return true;
  });
}

export function searchItems<T extends { name?: string; title?: string }>(
  items: T[], 
  query: string
): T[] {
  if (!query.trim()) return items;
  
  const lowerQuery = query.toLowerCase();
  return items.filter(item => {
    const name = (item.name || item.title || "").toLowerCase();
    return name.includes(lowerQuery);
  });
}

export function calculateStats(state: DashboardState): DashboardStats {
  const { paid, unpaid } = countPaymentStatus(state.projects);
  const totalRevenue = state.payments.reduce((sum, payment) => sum + payment.amount, 0);
  
  return {
    totalProjects: state.projects.length,
    paidProjects: paid,
    unpaidProjects: unpaid,
    totalClients: state.clients.length,
    totalRevenue
  };
}

export function getStatusColor(status: ProjectStatus | PaymentStatus): string {
  switch (status) {
    case "completed":
    case "paid":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "unpaid":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}