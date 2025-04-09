
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CustomEventForm = () => {
  const [photoEstimate, setPhotoEstimate] = useState({
    numberOfPhotographers: 1,
    estimatedPhotos: 0,
    numberOfDays: 1
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [photoRates, setPhotoRates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotoRates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/photo-rates');
        setPhotoRates(response.data);
      } catch (error) {
        toast.error('Failed to fetch photo rates');
      }
    };
    fetchPhotoRates();
  }, []);

  const calculatePhotoPrice = () => {
    const { estimatedPhotos, numberOfPhotographers, numberOfDays } = photoEstimate;

    const applicableRate = photoRates.find(
      rate => estimatedPhotos >= rate.minPhotos && estimatedPhotos <= rate.maxPhotos
    );

    if (!applicableRate) {
      toast.error('No applicable rate found for this number of photos');
      return;
    }

    const basePrice = estimatedPhotos * applicableRate.pricePerPhoto * numberOfPhotographers;
    const additionalPrice = (numberOfPhotographers - 1) * numberOfDays * 1000;
    const calculatedPrice = basePrice + additionalPrice;
    
    setTotalPrice(calculatedPrice);
    toast.success('Price calculated successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photoEstimate.estimatedPhotos || !photoEstimate.numberOfPhotographers || !photoEstimate.numberOfDays) {
      toast.error('Please fill all fields');
      return;
    }
    calculatePhotoPrice();
  };

  return (
    <div className="pt-20 px-4">
      <div className="max-w-4xl mx-auto p-6 mt-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Custom Photo Package Calculator</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Photographers
                </label>
                <input
                  type="number"
                  min="1"
                  value={photoEstimate.numberOfPhotographers}
                  onChange={(e) => setPhotoEstimate({
                    ...photoEstimate,
                    numberOfPhotographers: parseInt(e.target.value) || 1
                  })}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Number of Photos
                </label>
                <input
                  type="number"
                  min="1"
                  value={photoEstimate.estimatedPhotos}
                  onChange={(e) => setPhotoEstimate({
                    ...photoEstimate,
                    estimatedPhotos: parseInt(e.target.value) || 0
                  })}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Days
                </label>
                <input
                  type="number"
                  min="1"
                  value={photoEstimate.numberOfDays}
                  onChange={(e) => setPhotoEstimate({
                    ...photoEstimate,
                    numberOfDays: parseInt(e.target.value) || 1
                  })}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Calculate Price
            </button>
          </form>

          {totalPrice > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Estimated Price</h3>
              <p className="text-3xl font-bold text-blue-600">₹{totalPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-2">
                Based on {photoEstimate.estimatedPhotos} photos with {photoEstimate.numberOfPhotographers} photographer(s) for {photoEstimate.numberOfDays} day(s)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomEventForm;
