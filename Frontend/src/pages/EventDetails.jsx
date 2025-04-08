import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';



function EventDetails() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem('userData')
  const [event, setEvent] = useState(location.state?.event || null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEstimationForm, setShowEstimationForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [estimationData, setEstimationData] = useState({
    people: '',
    hours: '',
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const { user } = useAuth();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesRes = await axios.get(
          `http://localhost:3000/api/events/${eventId}/services`
        );
        setServices(servicesRes.data);
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [eventId]);

  const handleEstimation = async (service) => {
    setSelectedService(service);
    setShowEstimationForm(true);
  };

  const handleDeleteService = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/events/${eventId}/services/${selectedServiceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowDeleteModal(false);
      setServices(services.filter(service => service._id !== selectedServiceId));
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete service');
      console.error('Failed to delete service:', error);
    }
  };

  const calculateEstimation = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/services/${selectedService._id}/estimate`,
        estimationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEstimatedPrice(res.data.estimatedPrice);
      toast.success('Price estimation calculated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Estimation failed');
    }
  };
  const token = localStorage.getItem('token');
  console.log(userInfo)
  const [addingToWishlist, setAddingToWishlist] = useState({});

  const addToWishlist = async (serviceId) => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setAddingToWishlist(prev => ({ ...prev, [serviceId]: true }));
    try {
      const response = await axios.post(
        `http://localhost:3000/api/wishlist/${serviceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Added to wishlist');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Wishlist update failed');
    } finally {
      setAddingToWishlist(prev => ({ ...prev, [serviceId]: false }));
    }
  };

  if (loading) return <div className="text-center py-24">Loading...</div>;
  if (error) return <div className="text-center py-24 text-red-600">{error}</div>;
  if (!event) return <div className="text-center py-24">Event not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-24 px-6">
      {/* ... existing event details header ... */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">{event.name}</h1>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Description</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {event.description || 'We’re crafting unforgettable experiences just for you. Description will be available soon!'}
          </p>

          <h3 className="text-xl font-medium text-gray-800 mb-2">Base Price</h3>
          <p className="text-2xl font-bold text-blue-600">
            ₹{event.basePrice.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {console.log(services)}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this service? This action cannot be undone.</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteService}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          {services.map((service) => (
            <div key={service._id} className="bg-white p-6 rounded-lg shadow-lg relative">
              {user?.isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedServiceId(service._id);
                    setShowDeleteModal(true);
                  }}
                  className="absolute top-2 right-2 p-2 text-red-600 hover:text-red-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">People Capacity</p>
                  <p className="font-medium">{service.peopleToShoot || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="font-medium">{service.teamCount || 'N/A'}</p>
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600">
                ₹{service.price.toLocaleString()}
              </p>

              <div className="mt-4 flex gap-2">
                { }

                {!user.isAdmin && (<button
                  onClick={() => addToWishlist(service._id)}
                  disabled={addingToWishlist[service._id]}
                  className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 ${addingToWishlist[service._id] ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                >
                  {addingToWishlist[service._id] ? (
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    (<span>Add to Wishlist</span>)
                  )}
                </button>)}
              </div>
            </div>
          ))}
        </div>

        {/* Estimation Modal */}
        {showEstimationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <form onSubmit={calculateEstimation}>
                <div className="mb-4">
                  <label className="block mb-2">Number of People</label>
                  <input
                    type="number"
                    value={estimationData.people}
                    onChange={(e) => setEstimationData({ ...estimationData, people: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Duration (hours)</label>
                  <input
                    type="number"
                    value={estimationData.hours}
                    onChange={(e) => setEstimationData({ ...estimationData, hours: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                {estimatedPrice && (
                  <div className="mb-4 p-4 bg-blue-50 rounded">
                    <p className="font-bold text-blue-600">
                      Estimated Price: ₹{estimatedPrice.toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEstimationForm(false);
                      setEstimatedPrice(null);
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Calculate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetails;