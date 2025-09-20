'use client';

import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function ProfilePage() {
  // State variables for user data and loading
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data with useEffect
  useEffect(() => {
    // Check if auth is available
    if (!auth) {
      setLoading(false);
      return;
    }

    // Set up a listener for the authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Update the user state if currentUser exists
        setUser(currentUser);
      } else {
        // Set user to null if not authenticated
        setUser(null);
      }
      // Set loading to false once the check is complete
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleChangePassword = () => {
    console.log('Change password clicked');
    // Handle password change - could open modal or redirect
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      console.log('Delete account confirmed');
      // Handle account deletion
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Conditional rendering based on loading and user states */}
        {loading ? (
          // Loading spinner when loading is true
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A237E]"></div>
            <p className="mt-4 text-gray-600">Loading your profile...</p>
          </div>
        ) : user ? (
          // Display user information when loading is false and user exists
          <>
            {/* Account Information Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
              
              <div className="space-y-6">
                {/* Full Name Field */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={user.displayName || 'Not provided'}
                    readOnly
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user.email || 'Not provided'}
                    readOnly
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* User ID Field (for debugging/development) */}
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                    User ID
                  </label>
                  <input
                    id="userId"
                    type="text"
                    value={user.uid}
                    readOnly
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed text-xs"
                  />
                </div>

                {/* Email Verification Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Verification Status
                  </label>
                  <div className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                    user.emailVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.emailVerified ? '✅ Verified' : '⚠️ Not Verified'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Change Password Button */}
                    <button
                      onClick={handleChangePassword}
                      className="bg-[#1A237E] hover:bg-[#283593] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
                    >
                      Change Password
                    </button>

                    {/* Delete Account Button */}
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md border border-red-600"
                    >
                      Delete Account
                    </button>
                  </div>
                  
                  {/* Warning Text for Delete Button */}
                  <p className="text-sm text-gray-500 mt-3">
                    <strong>Warning:</strong> Deleting your account will permanently remove all your data and analysis history. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">247</div>
                  <div className="text-sm text-blue-800">Analyses Completed</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">89%</div>
                  <div className="text-sm text-green-800">Accuracy Rate</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">45</div>
                  <div className="text-sm text-purple-800">Days Active</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Display message when loading is false and there is no user
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Not Logged In</h3>
            <p className="text-gray-600 mb-6">You must be logged in to view this page.</p>
            <div className="space-x-4">
              <a
                href="/login"
                className="bg-[#1A237E] hover:bg-[#283593] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}