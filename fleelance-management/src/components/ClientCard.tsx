import type { Client } from '../types';

type Props = {
  client: Client;
  onEdit?: (client: Client) => void;
};

export function ClientCard({ client, onEdit }: Props) {
  return (
    <div className="bg-yellow-400 rounded-lg shadow-lg p-6 hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
        {onEdit && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(client);
            }}
            className="px-3 py-1 bg-black text-yellow-400 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="text-gray-900 font-medium w-20">Country:</span>
          <span className="text-gray-800">{client.country}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-900 font-medium w-20">Email:</span>
          <span className="text-gray-800">{client.email || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
}