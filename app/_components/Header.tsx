'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { auth } from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { isFirebaseConfigured } from '../firebase/mockAuth';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMockAuth, setIsMockAuth] = useState(false);

  useEffect(() => {
    const checkFirebaseConfig = isFirebaseConfigured();
    setIsMockAuth(!checkFirebaseConfig);

    if (!checkFirebaseConfig) {
      // Using mock auth - simulate a logged-in user
      console.log('Header: Using mock authentication - user is considered logged in');
      setUser({
        uid: 'mock-user-' + Date.now(),
        email: 'mock@example.com',
        displayName: 'Mock User',
      } as User);
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    if (isMockAuth) {
      // For mock auth, just clear the user state
      console.log('Mock auth logout');
      setUser(null);
    } else if (auth) {
      // For Firebase auth, use the standard signOut
      auth.signOut();
    }
    setDropdownOpen(false);
  };

  return (
    <nav className={`border-b border-gray-200 bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
              <Image 
                src="/satya-logo.png" 
                alt="Satya Logo" 
                width={56}
                height={56}
                className="object-contain"
              />
              <h1 className="text-3xl font-bold text-[#1A237E] hover:text-[#283593] transition-colors">
                Satya
              </h1>
            </div>
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <>
                {/* Profile Link */}
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-[#1A237E] font-medium px-3 py-2 rounded-lg transition-colors hidden sm:block"
                >
                  Profile
                </Link>
                
                {/* Analysis Tool Link */}
                <Link
                  href="/check"
                  className="text-gray-600 hover:text-[#1A237E] font-medium px-3 py-2 rounded-lg transition-colors hidden sm:block"
                >
                  Analysis
                </Link>
                
                <div className="relative">
                  {/* Profile Icon/Avatar */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-[#1A237E] rounded-full flex items-center justify-center">
                        <FaUser size={16} color="white" />
                      </div>
                    )}
                    <span className="text-gray-700 font-medium hidden sm:block">
                      {user.displayName || 'User'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setDropdownOpen(false)}
                      ></div>
                      
                      {/* Dropdown Content */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                        <div className="py-2">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <div className="text-sm font-medium text-gray-900">
                              {user.displayName || 'User'}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {user.email}
                            </div>
                          </div>
                          
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            View Profile
                          </Link>
                          
                          <Link
                            href="/check"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Analysis Tool
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-[#1A237E] font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#1A237E] hover:bg-[#283593] text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
