import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-24 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Featured Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {events.map((event) => (
          <div
            key={event._id}
            className="relative rounded-2xl shadow-lg overflow-hidden group transition duration-300 hover:scale-[1.02]"
          >
            <div
              className="h-56 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://source.unsplash.com/600x400/?${event.name},event')`, // Dynamic bg based on event name
              }}
            ></div>
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">₹{event.basePrice}</p>
              <Link
                to={`/events/${event._id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
