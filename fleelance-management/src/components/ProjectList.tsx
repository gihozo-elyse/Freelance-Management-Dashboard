
import { useState } from 'react';
import type { Project, ProjectStatus, PaymentStatus } from '../types';

type Props = {
  projects: Project[];
  clients: { id: string; name: string }[];
  onMarkAsPaid: (projectId: string, amount: number) => void;
  onStatusChange: (projectId: string, status: ProjectStatus) => void;
};

type Filter = ProjectStatus | 'all';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];


function Select({ value, onChange, options }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-black text-yellow-400 border border-yellow-500 rounded p-2 text-sm min-w-[120px] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
    >
      {options.map(option => (
        <option 
          key={option.value} 
          value={option.value}
          className="bg-black text-yellow-400 hover:bg-yellow-800"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}


function ProjectCard({ 
  project, 
  clientName,
  onStatusChange,
  onStatusChangeStart,
  activeProjectId,
  onMarkAsPaid 
}: {
  project: Project;
  clientName: string;
  onStatusChange: (id: string, status: ProjectStatus) => void;
  onStatusChangeStart: (id: string) => void;
  activeProjectId: string | null;
  onMarkAsPaid: (id: string, amount: number) => void;
}) {
  const isActive = activeProjectId === project.id;
  
  return (
    <div 
      className={`rounded-xl shadow-lg p-6 transform transition-all duration-300 ${
        isActive 
          ? 'bg-yellow-700 scale-[1.02] ring-2 ring-black ring-offset-2' 
          : 'bg-yellow-700 hover:scale-[1.01] hover:shadow-xl hover:bg-yellow-600'
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-800">Client: {clientName}</p>
        </div>
        <p className="font-bold text-xl text-gray-900">RWF {project.budget.toLocaleString()}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={project.status} />
          <StatusBadge status={project.paymentStatus} />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={project.status}
            onFocus={() => onStatusChangeStart(project.id)}
            onChange={e => onStatusChange(project.id, e.target.value as ProjectStatus)}
            className={`bg-black text-yellow-400 border border-yellow-500 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              isActive ? 'ring-1 ring-yellow-200' : ''
            }`}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-black text-yellow-400">
                {opt.label}
              </option>
            ))}
          </select>

          {project.paymentStatus === 'unpaid' && (
            <button
              onClick={() => onMarkAsPaid(project.id, project.budget)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                isActive 
                  ? 'bg-yellow-200 text-black hover:bg-yellow-100' 
                  : 'bg-black text-yellow-400 hover:bg-gray-900'
              }`}
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


function StatusBadge({ status }: { status: ProjectStatus | PaymentStatus }) {
  const colorMap = {
    'pending': 'bg-yellow-200 text-yellow-900',
    'in-progress': 'bg-yellow-300 text-yellow-900',
    'completed': 'bg-yellow-500 text-black',
    'paid': 'bg-green-500 text-black',
    'unpaid': 'bg-red-400 text-black',
    'partially-paid': 'bg-yellow-400 text-black',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status] || 'bg-gray-200'}`}>
      {status.replace('-', ' ').toUpperCase()}
    </span>
  );
}

export function ProjectList({ projects, clients, onMarkAsPaid, onStatusChange }: Props) {
  const [statusFilter, setStatusFilter] = useState<Filter>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | 'all'>('all');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  const handleStatusChangeStart = (projectId: string) => {
    setActiveProjectId(projectId);
  };

  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || project.paymentStatus === paymentFilter;
    return matchesStatus && matchesPayment;
  });

  const getClientName = (clientId: string) => 
    clients.find(c => c.id === clientId)?.name || 'Client not found';

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-black via-yellow-900 to-yellow-800 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        
        <div className="flex gap-2">
          <Select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as Filter)}
            options={[{ value: 'all', label: 'All Statuses' }, ...statusOptions]}
          />
          <Select 
            value={paymentFilter}
            onChange={e => setPaymentFilter(e.target.value as PaymentStatus | 'all')}
            options={[
              { value: 'all', label: 'All Payments' },
              { value: 'paid', label: 'Paid' },
              { value: 'unpaid', label: 'Unpaid' }
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            clientName={getClientName(project.clientId)}
            onStatusChange={onStatusChange}
            onStatusChangeStart={handleStatusChangeStart}
            activeProjectId={activeProjectId}
            onMarkAsPaid={onMarkAsPaid}
          />
        ))}
        {filteredProjects.length === 0 && (
          <div className="text-center py-8 px-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 font-medium">
              No projects found matching the current filters.
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              Try adjusting your filters or add a new project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}