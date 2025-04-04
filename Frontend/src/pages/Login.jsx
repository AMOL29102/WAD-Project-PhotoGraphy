import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";

export default function Login() {
  const [loginType, setLoginType] = useState(""); // "email" or "mobile"
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // NEW

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ identifier, password, isAdmin })); // pass isAdmin
    if (!result.error) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Login type selection */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className={`py-2 px-4 border rounded-md text-sm font-medium ${
                loginType === "email" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                setLoginType("email");
                setIdentifier("");
              }}
            >
              Login with Email
            </button>
            <button
              type="button"
              className={`py-2 px-4 border rounded-md text-sm font-medium ${
                loginType === "mobile" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                setLoginType("mobile");
                setIdentifier("");
              }}
            >
              Login with Mobile
            </button>
          </div>

          {/* Admin toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="adminCheck"
              className="mr-2"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor="adminCheck" className="text-sm text-gray-700">
              Login as Admin
            </label>
          </div>

          {/* Input Fields */}
          {loginType && (
            <div className="rounded-md shadow-sm space-y-4">
              <input
                type={loginType === "email" ? "email" : "tel"}
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
                placeholder={loginType === "email" ? "Enter Email" : "Enter Mobile Number"}
              />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
                placeholder="Password"
              />
            </div>
          )}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading || !loginType}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
