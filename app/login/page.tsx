'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { mockAuth, isFirebaseConfigured } from '../firebase/mockAuth';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if Firebase is properly configured
      if (!isFirebaseConfigured()) {
        console.log('Using mock authentication for development');
        // Use mock authentication
        await mockAuth.signInUser(formData.email, formData.password);
        alert('Demo login successful! (Mock authentication)');
        router.push('/check');
        return;
      }

      // Use real Firebase authentication
      const firebaseConfig = await import('../firebase/config');
      const userCredential = await signInWithEmailAndPassword(
        firebaseConfig.auth as any, 
        formData.email, 
        formData.password
      );
      console.log('User logged in successfully:', userCredential.user);
      router.push('/check');
      
    } catch (error: any) {
      console.error('Login error:', error.message);
      
      // Handle specific Firebase errors and mock auth errors
      if (error.code === 'auth/api-key-not-valid') {
        alert('Firebase configuration error. Using demo mode instead.');
        router.push('/check');
      } else if (error.code === 'auth/user-not-found' || error.message === 'User not found') {
        alert('No account found with this email. Please sign up first.');
      } else if (error.code === 'auth/wrong-password' || error.message === 'Wrong password') {
        alert('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email address format.');
      } else if (error.code === 'auth/too-many-requests') {
        alert('Too many failed login attempts. Please try again later.');
      } else if (error.message === 'Email already in use') {
        alert('This email is already registered. Please try logging in instead.');
      } else {
        alert(`Login failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Check if Firebase is properly configured
      if (!isFirebaseConfigured() || !auth) {
        console.log('Firebase not configured, using mock authentication');
        alert('Google sign-in not available in demo mode. Please use email/password login.');
        return;
      }

      // Create a new instance of the GoogleAuthProvider
      const provider = new GoogleAuthProvider();
      
      // Use signInWithPopup to trigger the Google login pop-up
      const result = await signInWithPopup(auth, provider);
      
      console.log('Google sign-in successful:', result.user);
      
      // Redirect to the main dashboard
      router.push('/check');
      
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Handle specific Google sign-in errors
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show error
        console.log('Google sign-in popup was closed by user');
      } else if (error.code === 'auth/popup-blocked') {
        alert('Popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Handle cancelled popup request
        console.log('Popup request was cancelled');
      } else {
        alert(`Google sign-in failed: ${error.message}`);
      }
    }
    
    try {
      // Check if Firebase is properly configured
      if (!isFirebaseConfigured() || !auth) {
        console.log('Firebase not configured, using mock authentication');
        alert('Google sign-in not available in demo mode. Please use email/password login.');
        return;
      }

      // Create a new instance of the GoogleAuthProvider
      const provider = new GoogleAuthProvider();
      
      // Use signInWithPopup to trigger the Google login pop-up
      const result = await signInWithPopup(auth, provider);
      
      console.log('Google sign-in successful:', result.user);
      
      // Redirect to the main dashboard
      router.push('/check');
      
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Handle specific Google sign-in errors
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show error
        console.log('Google sign-in popup was closed by user');
      } else if (error.code === 'auth/popup-blocked') {
        alert('Popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('Popup request was cancelled');
      } else {
        alert(`Google sign-in failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center">
            <Link href="/">
              <img src="/satya-logo.png" alt="Satya Logo" className="h-16 w-auto mx-auto mb-8" />
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to your Satya account
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent placeholder-transparent text-gray-900"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent placeholder-transparent text-black"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#1A237E] focus:ring-[#1A237E] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#1A237E] hover:text-[#283593] transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-[#1A237E] hover:bg-[#283593] text-white'
                }`}
              >
                {isLoading ? 'Logging In...' : 'Log In'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors shadow-sm hover:shadow-md"
              >
                <div className="mr-3">
                  <FaGoogle size={20} color="#dc2626" />
                </div>
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-[#1A237E] hover:text-[#283593] transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}