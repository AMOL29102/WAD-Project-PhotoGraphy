import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth is available

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('https://wad-project-photo-graphy.vercel.app/api/events');
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

  const handleDelete = async () => {
    try {
      await axios.delete(`https://wad-project-photo-graphy.vercel.app/api/events/${selectedEventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setShowDeleteModal(false);
      // Refresh events list -  A better approach would be to update the state directly
      window.location.reload();
    } catch (error) {
      // Consider using a toast library for better user feedback
      console.error('Failed to delete event:', error);
      alert('Failed to delete event'); //Temporary alert. Replace with toast
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-24 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Featured Events</h1>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Loading events...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-600">No events available yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {/* Custom Event Card */}
          <div className="relative rounded-2xl shadow-lg overflow-hidden group transition duration-300 hover:scale-[1.02]">
            <div className="h-56 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-4xl text-white">✨</span>
            </div>
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Custom Event</h2>
              <p className="text-gray-600 mb-4">Create your own customized event package with our flexible options.</p>
              <Link
                to="/custom-event"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                Create Custom Package
              </Link>
            </div>
          </div>
          {events.map((event) => (
            <div
              key={event._id}
              className="relative rounded-2xl shadow-lg overflow-hidden group transition duration-300 hover:scale-[1.02]"
            >
              <div
                className="h-56 bg-cover bg-center bg-gray-200"
                style={{
                  backgroundImage: `url(https://wad-project-photo-graphy.vercel.app/${event.imageUrl || `uploads/temp.png`})`,
                }}
              />


              <div className="p-6 bg-white">
                {user?.isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEventId(event._id);
                      setShowDeleteModal(true);
                    }}
                    className="absolute top-2 right-2 p-2 text-red-600 hover:text-red-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
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