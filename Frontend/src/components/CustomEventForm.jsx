import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/slices/serviceSlice';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Added axios for fetching photo rates

const CustomEventForm = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { services, loading } = useSelector((state) => state.services);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    selectedServices: [],
    customEstimates: [],
  });
  const [newEstimate, setNewEstimate] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [photoEstimate, setPhotoEstimate] = useState({
    numberOfPhotographers: 1,
    estimatedPhotos: 0,
    ratePerPhoto: 0,
    totalPhotoPrice: 0
  });
  const [photoRates, setPhotoRates] = useState([]);

  useEffect(() => {
    dispatch(fetchServices());
    const fetchPhotoRates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/photo-rates');
        setPhotoRates(response.data);
      } catch (error) {
        console.error('Failed to fetch photo rates:', error);
      }
    };
    fetchPhotoRates();
  }, [dispatch]);

  const handleServiceSelect = (serviceId) => {
    const service = services.find(s => s._id === serviceId);
    if (service) {
      setFormData(prev => ({
        ...prev,
        selectedServices: [...prev.selectedServices, service]
      }));
    }
  };

  const handleAddEstimate = () => {
    if (newEstimate.name && newEstimate.price) {
      setFormData(prev => ({
        ...prev,
        customEstimates: [...prev.customEstimates, newEstimate]
      }));
      setNewEstimate({ name: '', price: '', description: '' });
    }
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...formData.selectedServices];
    updatedServices.splice(index, 1);
    setFormData(prev => ({ ...prev, selectedServices: updatedServices }));
  };

  const handleRemoveEstimate = (index) => {
    const updatedEstimates = [...formData.customEstimates];
    updatedEstimates.splice(index, 1);
    setFormData(prev => ({ ...prev, customEstimates: updatedEstimates }));
  };

  const calculatePhotoPrice = (photos) => {
    const applicableRate = photoRates.find(
      rate => photos >= rate.minPhotos && photos <= rate.maxPhotos
    );
    if (applicableRate) {
      return photos * applicableRate.pricePerPhoto;
    }
    return 0;
  };

  const handlePhotoEstimateChange = (field, value) => {
    setPhotoEstimate(prev => {
      const newEstimate = { ...prev, [field]: parseInt(value, 10) || 0 }; //parseInt for number inputs
      const totalPhotoPrice = calculatePhotoPrice(newEstimate.estimatedPhotos);
      return { ...newEstimate, totalPhotoPrice };
    });
  };

  const calculateTotalPrice = () => {
    const selectedServicesTotal = formData.selectedServices.reduce((total, service) => total + parseFloat(service.price || 0), 0);
    const customEstimatesTotal = formData.customEstimates.reduce((total, estimate) => total + parseFloat(estimate.price || 0), 0);
    return (selectedServicesTotal + customEstimatesTotal + photoEstimate.totalPhotoPrice).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();
    alert(`Your estimated total for this custom event is $${totalPrice}. Please contact us to finalize your booking.`);
  };

  if (!user) {
    return (
      <div className="text-center py-12 mt-16">
        <h2 className="text-2xl font-bold mb-4">Please Login</h2>
        <p className="text-gray-600">You need to log in to create custom event estimates.</p>
      </div>
    );
  }

  const totalItems = formData.selectedServices.length + formData.customEstimates.length;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h2 className="text-2xl font-bold mb-6">Create Custom Event Price Estimate</h2>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-700">
          This tool is for generating price estimates only. Your custom estimates are not saved to the database.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... existing form elements ... */}

        <div>
          <h3 className="text-lg font-medium text-gray-900">Photo Estimate</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Cameramen</label>
              <input
                type="number"
                value={photoEstimate.numberOfPhotographers}
                onChange={(e) => handlePhotoEstimateChange('numberOfPhotographers', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estimated Photos</label>
              <input
                type="number"
                value={photoEstimate.estimatedPhotos}
                onChange={(e) => handlePhotoEstimateChange('estimatedPhotos', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Photo Price</label>
              <input
                type="text"
                value={`$${photoEstimate.totalPhotoPrice.toFixed(2)}`}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>


        {/* ... existing form elements ... */}
      </form>
    </div>
  );
};

export default CustomEventForm;