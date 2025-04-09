import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email && !formData.mobile) {
      alert("Please provide either an Email or Mobile number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", formData);
      console.log("Registration successful:", response.data);
      alert("Registration Successful!");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <input
              type="tel"
              name="mobile"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Mobile (Optional)"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />

            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
