import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AddServiceForm = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Changed to store full event object
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cameraEquipment: '',
    teamCount: '',
    peopleToShoot: '',
    price: '',
    isCustom: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchingEvents, setFetchingEvents] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setFetchingEvents(true);
        const response = await axios.get('http://localhost:3000/api/events');
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch events: ' + (err.response?.data?.message || err.message));
      } finally {
        setFetchingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent) {
      setError('Please select an event first');
      return;
    }

    if (!formData.title.trim() || !formData.price) {
      setError('Title and Price are required');
      return;
    }

    const serviceData = {
      ...formData,
      event: selectedEvent._id, // Use ID for API call
      teamCount: parseInt(formData.teamCount) || 0,
      peopleToShoot: parseInt(formData.peopleToShoot) || 0,
      price: parseFloat(formData.price),
    };

    setLoading(true);
    setError('');

    try {
      await axios.post(`http://localhost:3000/api/events/${selectedEvent._id}/services`, serviceData);
      alert('Service added successfully!');
      setFormData({
        title: '',
        description: '',
        cameraEquipment: '',
        teamCount: '',
        peopleToShoot: '',
        price: '',
        isCustom: false,
      });
    } catch (error) {
      setError('Error adding service: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    const selected = events.find(event => event._id === eventId) || null;
    setSelectedEvent(selected);
    setError('');
  };

  if (!user?.isAdmin) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600">Only administrators can add services.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Add Service to Event {selectedEvent ? `"${selectedEvent.title}"` : ''}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Events Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Select Event</label>
        <select
          style={{   color: 'black' }}
          value={selectedEvent?._id || ''}
          onChange={handleEventChange}
          disabled={fetchingEvents || loading}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:border-blue-500 focus:ring-blue-500"
        >
          {console.log(events)}
          <option value="">Select an event</option>
          {events.map((event) => (
            <option className="text-black" key={event._id} value={event._id}>
              {event.name} {/* Display event title */}
            </option>
          ))}
        </select>
        {fetchingEvents && <p className="text-black-500 mt-2">Loading events...</p>}
      </div>

      {/* Service Form - only show when an event is selected */}
      {selectedEvent && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Camera Equipment</label>
            <input
              type="text"
              value={formData.cameraEquipment}
              onChange={(e) => setFormData({ ...formData, cameraEquipment: e.target.value })}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Team Count</label>
            <input
              type="number"
              value={formData.teamCount}
              onChange={(e) => setFormData({ ...formData, teamCount: e.target.value })}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">People to Shoot</label>
            <input
              type="number"
              value={formData.peopleToShoot}
              onChange={(e) => setFormData({ ...formData, peopleToShoot: e.target.value })}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Is Custom</label>
            <input
              type="checkbox"
              checked={formData.isCustom}
              onChange={(e) => setFormData({ ...formData, isCustom: e.target.checked })}
              disabled={loading}
              className="mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? 'Adding...' : 'Add Service'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddServiceForm;