import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/slices/serviceSlice';
import { useAuth } from '../context/AuthContext';

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

  useEffect(() => {
    dispatch(fetchServices());
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

  const calculateTotalPrice = () => {
    const selectedServicesTotal = formData.selectedServices.reduce((total, service) => total + parseFloat(service.price || 0), 0);
    const customEstimatesTotal = formData.customEstimates.reduce((total, estimate) => total + parseFloat(estimate.price || 0), 0);
    return (selectedServicesTotal + customEstimatesTotal).toFixed(2);
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
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Select Predefined Services</label>
          <select
            onChange={(e) => handleServiceSelect(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value=""
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>
                {service.name} - ${service.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Add Custom Estimate Item</h3>
          <p className="text-sm text-gray-500 mb-2">
            Add additional items not in the predefined list (e.g., catering for 500 people).
            These are for price calculation only and won't be stored.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Item Name"
              value={newEstimate.name}
              onChange={(e) => setNewEstimate({ ...newEstimate, name: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={newEstimate.price}
              onChange={(e) => setNewEstimate({ ...newEstimate, price: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddEstimate}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Item
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900">Selected Services</h3>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
              {formData.selectedServices.length} services selected
            </span>
          </div>
          <div className="mt-2 space-y-2">
            {formData.selectedServices.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No services selected yet</p>
            ) : (
              formData.selectedServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
                  <span>{service.name}</span>
                  <div className="flex items-center space-x-3">
                    <span>${parseFloat(service.price || 0).toFixed(2)}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveService(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900">Custom Estimate Items</h3>
            <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">
              {formData.customEstimates.length} custom items added
            </span>
          </div>
          <div className="mt-2 space-y-2">
            {formData.customEstimates.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No custom items added yet</p>
            ) : (
              formData.customEstimates.map((estimate, index) => (
                <div key={`custom-${index}`} className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
                  <span>{estimate.name}</span>
                  <div className="flex items-center space-x-3">
                    <span>${parseFloat(estimate.price || 0).toFixed(2)}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveEstimate(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-md flex justify-between items-center">
          <span className="text-lg font-bold">Total Estimate</span>
          <div className="text-right">
            <div className="text-sm text-gray-600">{totalItems} items total</div>
            <div className="text-xl font-bold text-blue-700">${calculateTotalPrice()}</div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Price Estimate
        </button>
      </form>
    </div>
  );
};

export default CustomEventForm; 