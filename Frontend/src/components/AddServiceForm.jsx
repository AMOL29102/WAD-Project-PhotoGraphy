import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AddServiceForm = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
    if (!selectedEvent) return setError('Please select an event first');
    if (!formData.title.trim() || !formData.price) return setError('Title and Price are required');

    const serviceData = {
      ...formData,
      event: selectedEvent._id,
      teamCount: parseInt(formData.teamCount) || 0,
      peopleToShoot: parseInt(formData.peopleToShoot) || 0,
      price: parseFloat(formData.price),
    };

    setLoading(true);
    setError('');
    try {
      await axios.post(`http://localhost:3000/api/events/${selectedEvent._id}/services`, serviceData);
      alert('Service added successfully!');
      setFormData({ title: '', description: '', cameraEquipment: '', teamCount: '', peopleToShoot: '', price: '', isCustom: false });
    } catch (error) {
      setError('Error adding service: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEventChange = (e) => {
    const selected = events.find(ev => ev._id === e.target.value) || null;
    setSelectedEvent(selected);
    setError('');
  };

  if (!user?.isAdmin) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-600 mb-4 animate-pulse">Access Denied</h2>
        <p className="text-gray-600">Only administrators can add services.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4">
      <motion.div
        className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Add New Service</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Select Event</label>
          <select
            value={selectedEvent?._id || ''}
            onChange={handleEventChange}
            disabled={fetchingEvents || loading}
            className="w-full border rounded-lg px-4 py-2 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose an event --</option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>{event.name}</option>
            ))}
          </select>
          {fetchingEvents && <p className="text-sm text-gray-500 mt-2 animate-pulse">Loading events...</p>}
        </div>

        {selectedEvent && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Service Title', type: 'text', value: formData.title, key: 'title' },
              { label: 'Camera Equipment', type: 'text', value: formData.cameraEquipment, key: 'cameraEquipment' },
              { label: 'Team Count', type: 'number', value: formData.teamCount, key: 'teamCount' },
              { label: 'People to Shoot', type: 'number', value: formData.peopleToShoot, key: 'peopleToShoot' },
              { label: 'Price', type: 'number', value: formData.price, key: 'price', required: true },
            ].map(({ label, type, value, key, required }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  disabled={loading}
                  required={required}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={loading}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            {/* <div className="flex items-center space-x-3">
            <input
              id="isCustom"
              type="checkbox"
              checked={formData.isCustom}
              onChange={(e) => setFormData({ ...formData, isCustom: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isCustom" className="text-sm font-medium text-gray-700">Custom Service</label>
          </div> */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white text-lg font-semibold transition duration-300 ease-in-out ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Add Service'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AddServiceForm;