import React, { useState } from 'react';
import { ChevronRight, Clock, Calendar, MapPin, TicketIcon } from 'lucide-react';

const PreviousTickets = () => {
  // Sample ticket data (in a real app, this would come from an API or state management)
  const [tickets] = useState([
    {
      id: 'BUS-2024-001',
      from: 'New York',
      to: 'Boston',
      date: '2024-02-15',
      time: '14:30',
      status: 'Completed',
      passengers: 2,
      price: 45.99
    },
    {
      id: 'BUS-2024-002',
      from: 'Chicago',
      to: 'Detroit',
      date: '2024-03-01',
      time: '10:15',
      status: 'Completed',
      passengers: 1,
      price: 35.50
    },
    {
      id: 'BUS-2024-003',
      from: 'San Francisco',
      to: 'Los Angeles',
      date: '2024-03-10',
      time: '16:45',
      status: 'Upcoming',
      passengers: 3,
      price: 55.25
    }
  ]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <TicketIcon className="mr-3" />
        <h1 className="text-xl font-bold">My Previous Tickets</h1>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No previous tickets found</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex items-center justify-between"
            >
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-semibold text-gray-800">
                    {ticket.from} → {ticket.to}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{ticket.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{ticket.time}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${ticket.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                    }
                  `}>
                    {ticket.status}
                  </span>
                  <span className="ml-2 text-gray-600">
                    {ticket.passengers} Passenger{ticket.passengers > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-gray-800 mr-3">
                  ${ticket.price.toFixed(2)}
                </span>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousTickets;