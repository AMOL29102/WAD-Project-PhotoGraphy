
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{booking.event.name}</h2>
            <p className="text-gray-600">
              Date: {new Date(booking.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
