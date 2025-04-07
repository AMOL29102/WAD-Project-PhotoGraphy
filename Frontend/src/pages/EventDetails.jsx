import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';


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
  const addToWishlist = async (serviceId) => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
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
      
      console.log(response.data)
      toast.success('Added to wishlist');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Wishlist update failed');
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
          <p className="text-gray-600 mb-4">{event.description || 'No description available'}</p>
          <p className="text-lg font-bold text-blue-600">Base Price: ₹{event.basePrice.toLocaleString()}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {console.log(services)}
          {services.map((service) => (
            <div key={service._id} className="bg-white p-6 rounded-lg shadow-lg relative">
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
              {}

                <button
                  onClick={() => addToWishlist(service._id)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Add to Wishlist
                </button>
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