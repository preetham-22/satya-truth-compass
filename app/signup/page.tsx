'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { mockAuth, isFirebaseConfigured } from '../firebase/mockAuth';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if Firebase is properly configured
      if (!isFirebaseConfigured()) {
        console.log('Using mock authentication for development');
        await mockAuth.createUser(email, password);
        alert('Demo account created successfully! (Mock authentication)');
        router.push('/check');
        return;
      }

      // Use real Firebase authentication
      if (!auth) {
        throw new Error('Firebase auth not initialized');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user);
      router.push('/check');
      
    } catch (error: any) {
      console.error('Sign up error:', error.message);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/api-key-not-valid') {
        alert('Firebase configuration error. Using demo mode instead.');
        // Fall back to mock auth
        await mockAuth.createUser(email, password);
        router.push('/check');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please use a different email or try logging in.');
      } else if (error.code === 'auth/weak-password') {
        alert('Password is too weak. Please use a stronger password.');
      } else {
        alert(`Sign up failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Check if Firebase is properly configured
      if (!isFirebaseConfigured() || !auth) {
        console.log('Firebase not configured, using mock authentication');
        alert('Google sign-up not available in demo mode. Please use email/password signup.');
        return;
      }

      // Create a new instance of the GoogleAuthProvider
      const provider = new GoogleAuthProvider();
      
      // Use signInWithPopup to trigger the Google login pop-up
      const result = await signInWithPopup(auth, provider);
      
      console.log('Google sign-up successful:', result.user);
      
      // Redirect to the main dashboard
      router.push('/check');
      
    } catch (error: any) {
      console.error('Google sign-up error:', error);
      
      // Handle specific Google sign-in errors
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show error
        console.log('Google sign-up popup was closed by user');
      } else if (error.code === 'auth/popup-blocked') {
        alert('Popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Handle cancelled popup request
        console.log('Popup request was cancelled');
      } else {
        alert(`Google sign-up failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-[#1A237E] cursor-pointer hover:text-[#283593] transition-colors">
              Satya
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Satya to start verifying digital content
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#1A237E] focus:border-[#1A237E] sm:text-sm text-gray-900"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#1A237E] focus:border-[#1A237E] sm:text-sm text-gray-900"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#1A237E] focus:border-[#1A237E] sm:text-sm text-black"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#1A237E] hover:bg-[#283593] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A237E]'
                }`}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
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
                onClick={handleGoogleSignUp}
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors shadow-sm hover:shadow-md"
              >
                <div className="mr-3">
                  <FaGoogle size={20} color="#dc2626" />
                </div>
                Sign up with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-[#1A237E] hover:text-[#283593] transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}