import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../store/slices/serviceSlice';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { wishlist, loading } = useSelector((state) => state.services);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromWishlist = (serviceId) => {
    dispatch(removeFromWishlist(serviceId));
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Please login to view your wishlist</h2>
        <p className="text-gray-600">Sign in to save and manage your favorite services</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price}</span>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 