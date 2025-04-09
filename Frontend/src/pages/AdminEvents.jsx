import React, { useState } from 'react';
import axios from 'axios';

function AdminEvents() {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    console.log(eventData, imageFile);

    const formData = new FormData();
    formData.append('name', eventData.name);
    formData.append('description', eventData.description);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await axios.post('http://localhost:3000/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', res.data);
      setMessage('Event added successfully!');
      setEventData({ name: '', description: '' });
      setImageFile(null);
    } catch (err) {
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
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1 block w-full"
              required
            />
          </div>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEvents;