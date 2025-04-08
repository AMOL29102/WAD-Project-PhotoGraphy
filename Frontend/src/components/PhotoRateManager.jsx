
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
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Photo Rates</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Min Photos"
            value={newRate.minPhotos}
            onChange={(e) => setNewRate({...newRate, minPhotos: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Max Photos"
            value={newRate.maxPhotos}
            onChange={(e) => setNewRate({...newRate, maxPhotos: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price Per Photo"
            value={newRate.pricePerPhoto}
            onChange={(e) => setNewRate({...newRate, pricePerPhoto: e.target.value})}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Rate
        </button>
      </form>

      <div className="space-y-4">
        {rates.map((rate) => (
          <div key={rate._id} className="bg-white p-4 rounded shadow">
            <p>Range: {rate.minPhotos} - {rate.maxPhotos} photos</p>
            <p>Price per photo: ₹{rate.pricePerPhoto}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoRateManager;
