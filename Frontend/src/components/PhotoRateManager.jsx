
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PhotoRateManager = () => {
  const [rates, setRates] = useState([]);
  const [newRate, setNewRate] = useState({
    minPhotos: '',
    maxPhotos: '',
    pricePerPhoto: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/photo-rates');
      setRates(response.data);
    } catch (error) {
      toast.error('Failed to fetch rates');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRate.minPhotos || !newRate.maxPhotos || !newRate.pricePerPhoto) {
      toast.error('Please fill all fields');
      return;
    }
    if (parseInt(newRate.minPhotos) >= parseInt(newRate.maxPhotos)) {
      toast.error('Maximum photos must be greater than minimum photos');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/photo-rates', newRate, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Rate added successfully');
      fetchRates();
      setNewRate({ minPhotos: '', maxPhotos: '', pricePerPhoto: '' });
    } catch (error) {
      toast.error('Failed to add rate');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (rateId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/photo-rates/${rateId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Rate deleted successfully');
      fetchRates();
    } catch (error) {
      toast.error('Failed to delete rate');
    }
  };

  return (
    <div className="pt-20 px-4">

      <div className="max-w-4xl mx-auto p-6 mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Photo Rate Management</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Photos</label>
              <input
                type="number"
                value={newRate.minPhotos}
                onChange={(e) => setNewRate({ ...newRate, minPhotos: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Photos</label>
              <input
                type="number"
                value={newRate.maxPhotos}
                onChange={(e) => setNewRate({ ...newRate, maxPhotos: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Photo (₹)</label>
              <input
                type="number"
                value={newRate.pricePerPhoto}
                onChange={(e) => setNewRate({ ...newRate, pricePerPhoto: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Rate Range'}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rates.map((rate) => (
            <div key={rate._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Range: {rate.minPhotos} - {rate.maxPhotos} photos</h3>
                <p className="text-gray-600">Price per photo: ₹{rate.pricePerPhoto}</p>
              </div>
              <button
                onClick={() => handleDelete(rate._id)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default PhotoRateManager;
