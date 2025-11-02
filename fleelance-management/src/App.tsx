import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDashboard } from './context/DashboardContext';
import { ClientCard } from './components/ClientCard';
import { ProjectList } from './components/ProjectList';
import { Sidebar } from './components/Sidebar';
import { calculateStats, findClientById } from './utils/helpers';
import type { ProjectStatus, Payment, Project, Client } from './types';

type MainContentProps = {
  state: {
    clients: Client[];
    projects: Project[];
    payments: Payment[];
  };
  onMarkAsPaid: (projectId: string, amount: number) => void;
  onStatusChange: (projectId: string, status: ProjectStatus) => void;
};

function MainContent({ state, onMarkAsPaid, onStatusChange }: MainContentProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = calculateStats(state);

  const filteredClients = state.clients.filter((client: Client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = state.projects.filter((project: Project) => {
    const client = findClientById(state.clients, project.clientId);
    return (
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );
  });

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen bg-black">
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-yellow-500 shadow-md text-black hover:bg-yellow-400 transition-colors lg:hidden"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64">
        <header className="bg-gradient-to-r from-black via-yellow-900 to-yellow-700 border-b border-yellow-500 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-semibold text-yellow-400">
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/projects' && 'Projects'}
              {location.pathname === '/clients' && 'Clients'}
              {location.pathname === '/payments' && 'Payments'}
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-black p-4 md:p-8">
          <div className="max-w-7xl mx-auto text-yellow-100">
            {location.pathname !== '/dashboard' && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-md border border-yellow-500 bg-black text-yellow-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-yellow-700"
                />
              </div>
            )}

            <Routes>
              <Route path="/dashboard" element={<DashboardView stats={stats} />} />
              <Route 
                path="/projects" 
                element={
                  <ProjectList 
                    projects={filteredProjects}
                    clients={state.clients}
                    onMarkAsPaid={onMarkAsPaid}
                    onStatusChange={onStatusChange}
                  />
                } 
              />
              <Route 
                path="/clients" 
                element={
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Clients</h2>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add Client
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredClients.map((client: Client) => (
                        <ClientCard key={client.id} client={client} onEdit={() => {}} />
                      ))}
                    </div>
                    {filteredClients.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No clients found{searchQuery ? ' matching your search' : ''}.
                      </div>
                    )}
                  </div>
                } 
              />
              <Route 
                path="/payments" 
                element={
                  <PaymentView 
                    payments={state.payments}
                    projects={state.projects}
                    clients={state.clients}
                  />
                } 
              />
              <Route path="/" element={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Welcome to Freelance Management</h2>
                    <p className="text-gray-600">Select an option from the sidebar to get started</p>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardView({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div 
            key={key} 
            className="bg-yellow-400 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-lg font-medium text-black capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {typeof value === 'number' && key.toLowerCase().includes('revenue') ? 
                `$${value.toLocaleString()}` : 
                value as any
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentView({ payments, projects, clients }: { payments: Payment[], projects: Project[], clients: Client[] }) {
  return (
    <div className="bg-yellow-700 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-yellow-100 mb-6 border-b border-yellow-500 pb-2">Payment Records</h2>
      {payments.length === 0 ? (
        <div className="text-center py-8 text-yellow-100 bg-yellow-600 bg-opacity-30 rounded-lg">
          No payment records found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-black bg-opacity-30 text-yellow-300">
                <th className="text-left py-4 px-4 font-semibold">Project</th>
                <th className="text-left py-4 px-4 font-semibold">Client</th>
                <th className="text-left py-4 px-4 font-semibold">Amount</th>
                <th className="text-left py-4 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => {
                const project = projects.find(p => p.id === payment.projectId);
                const client = project ? clients.find(c => c.id === project.clientId) : null;
                const title = project?.title || "Project not found";
                const clientName = client?.name || "Client not found";
                
                return (
                  <tr 
                    key={index} 
                    className="border-b border-yellow-600 hover:bg-yellow-600 transition-colors"
                  >
                    <td className="py-4 px-4 text-white font-medium">{title}</td>
                    <td className="py-4 px-4 text-yellow-100">{clientName}</td>
                    <td className="py-4 px-4 font-bold text-yellow-300">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-yellow-100">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function App() {
  const { state, dispatch } = useDashboard();

  const handleMarkAsPaid = (projectId: string, amount: number) => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    
    if (project.paymentStatus === 'paid') {
      console.log('Project is already paid');
      return;
    }
    dispatch({ 
      type: 'MARK_PROJECT_PAID', 
      payload: { projectId, amount } 
    });
  };

  const handleStatusChange = (projectId: string, status: ProjectStatus) => {
    dispatch({ type: "UPDATE_PROJECT_STATUS", payload: { projectId, status } });
  };

  return (
    <MainContent 
      state={state}
      onMarkAsPaid={handleMarkAsPaid}
      onStatusChange={handleStatusChange}
    />
  );
}

export default App;