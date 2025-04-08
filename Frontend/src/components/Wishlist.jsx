
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../store/slices/serviceSlice';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { wishlist, loading } = useSelector((state) => state.services);
  const [removingItems, setRemovingItems] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromWishlist = async (serviceId) => {
    setRemovingItems(prev => ({ ...prev, [serviceId]: true }));
    try {
      await dispatch(removeFromWishlist(serviceId)).unwrap();
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    } finally {
      setRemovingItems(prev => ({ ...prev, [serviceId]: false }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Please login to view your wishlist</h2>
          <p className="text-gray-600">Sign in to save and manage your favorite services</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 mt-16">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <p className="text-xl text-gray-600">Your wishlist is empty</p>
            <p className="mt-2 text-gray-500">Add some services to get started!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">₹{item.price}</span>
                  <button
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    disabled={removingItems[item._id]}
                    className={`text-red-600 hover:text-red-800 font-medium flex items-center ${
                      removingItems[item._id] ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {removingItems[item._id] ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Removing...
                      </span>
                    ) : (
                      <span>Remove</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
