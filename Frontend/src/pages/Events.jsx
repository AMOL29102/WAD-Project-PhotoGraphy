import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('http://localhost:3000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-24 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Featured Events</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading events...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-600">No events available yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {events.map((event) => (
            <div
              key={event._id}
              className="relative rounded-2xl shadow-lg overflow-hidden group transition duration-300 hover:scale-[1.02]"
            >
              <div
                className="h-56 bg-cover bg-center bg-gray-200"
                style={{
                  backgroundImage: `url('https://source.unsplash.com/600x400/?${encodeURIComponent(event.name)},event')`,
                }}
                onError={(e) => {
                  e.target.style.backgroundImage = 'none';
                }}
              />
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate">{event.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description || 'No description available'}</p>
                <Link
                  to={`/events/${event._id}`}
                  state={{ event }} // Pass event data to EventDetails
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;