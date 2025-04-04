import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Make sure axios is installed

function AdminEvents() {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    basePrice: 20000,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const eventTypes = [
    'Prewedding',
    'Engagement',
    'Birthday',
    'Corporate Function',
    'Gathering',
    'Baby Shower',
    'Conference',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    const token = localStorage.getItem('token'); // assuming the token is stored like this
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/events',
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Event added successfully!');
      setEventData({ name: '', description: '', basePrice: 20000 });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Type</label>
            <input
              type="text"
              placeholder="Enter event name"
              value={eventData.name}
              onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
            <input
              type="number"
              value={eventData.basePrice}
              onChange={(e) => setEventData({ ...eventData, basePrice: Number(e.target.value) })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0"
              required
            />
          </div>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEvents;
