import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

// Main App component that wraps everything with Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Auto-close sidebar on route change
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
            <Routes>
              <Route path="/dashboard" element={<ProjectList 
                    projects={filteredProjects}
                    clients={state.clients}
                    onMarkAsPaid={onMarkAsPaid}
                    onStatusChange={onStatusChange}
                  />} 
                  />
              <Route path="/projects" element={<div>Projects Content</div>} />
              <Route path="/clients" element={<div>Clients Content</div>} />
              <Route path="/payments" element={<div>Payments Content</div>} />
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


export default AppWrapper;