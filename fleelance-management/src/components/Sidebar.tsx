import { NavLink } from 'react-router-dom';

type MenuItem = {
  name: string;
  icon: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: '📊', path: '/dashboard' },
  { name: 'Projects', icon: '📋', path: '/projects' },
  { name: 'Clients', icon: '👥', path: '/clients' },
  { name: 'Payments', icon: '💰', path: '/payments' },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } lg:hidden`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black via-yellow-900 to-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4 border-b border-yellow-500 bg-black bg-opacity-50">
          <h2 className="text-xl font-bold text-yellow-400">Freelance Hub</h2>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-yellow-500 text-black font-semibold transform scale-105' 
                        : 'text-yellow-200 hover:bg-yellow-800 hover:text-white hover:translate-x-1'
                    }`
                  }
                  onClick={onClose}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
