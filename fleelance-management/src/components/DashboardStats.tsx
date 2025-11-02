import type { DashboardStats as DashboardStatsType } from '../types';

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: "📋"
    },
    {
      label: "Paid Projects",
      value: stats.paidProjects,
      icon: "✅"
    },
    {
      label: "Unpaid Projects",
      value: stats.unpaidProjects,
      icon: "⏳"
    },
    {
      label: "Total Clients",
      value: stats.totalClients,
      icon: "👥"
    },
    {
      label: "Total Revenue",
      value: `RWF ${stats.totalRevenue.toLocaleString()}`,
      icon: "💰"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-yellow-700 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-600"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-black">{stat.value}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}