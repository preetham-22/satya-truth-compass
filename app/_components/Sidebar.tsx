'use client';

import Link from 'next/link';
import { FaPlus, FaUser, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { isFirebaseConfigured } from '../firebase/mockAuth';

interface SidebarProps {
  className?: string;
}

interface HistoryItem {
  id: string;
  title: string;
  timestamp: any;
  type: string;
  content?: string;
  results?: any;
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMockAuth, setIsMockAuth] = useState(false);

  // Fetch data in useEffect
  useEffect(() => {
    const checkFirebaseConfig = isFirebaseConfigured();
    setIsMockAuth(!checkFirebaseConfig);

    if (!checkFirebaseConfig) {
      // Using mock auth - simulate a logged-in user
      console.log('Sidebar: Using mock authentication - user is considered logged in');
      setUser({
        uid: 'mock-user-' + Date.now(),
        email: 'mock@example.com',
        displayName: 'Mock User',
      } as User);
      setLoading(false);
      
      // Set mock history
      setHistory([
        {
          id: '1',
          title: 'Analysis of news.com article',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          type: 'article'
        },
        {
          id: '2',
          title: 'Untitled Image Check', 
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          type: 'image'
        },
        {
          id: '3',
          title: 'Social media post verification',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          type: 'text'
        }
      ]);
      return;
    }

    if (!auth) {
      console.warn("Firebase auth not initialized");
      setLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser && db) {
        // Create Firestore query to get user's history
        const historyQuery = query(
          collection(db, 'users', currentUser.uid, 'history'),
          orderBy('timestamp', 'desc')
        );

        // Listen for real-time updates
        const unsubscribeHistory = onSnapshot(historyQuery, (snapshot) => {
          const historyItems: HistoryItem[] = [];
          snapshot.forEach((doc) => {
            historyItems.push({
              id: doc.id,
              ...doc.data()
            } as HistoryItem);
          });
          setHistory(historyItems);
        }, (error) => {
          console.error("Error fetching history:", error);
          // If Firestore fails, use mock data
          setHistory([
            {
              id: '1',
              title: 'Analysis of news.com article',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              type: 'article'
            },
            {
              id: '2', 
              title: 'Untitled Image Check',
              timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
              type: 'image'
            },
            {
              id: '3',
              title: 'Social media post verification',
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
              type: 'text'
            }
          ]);
        });

        return () => unsubscribeHistory();
      } else {
        // User not logged in or no db, use mock data
        setHistory([
          {
            id: '1',
            title: 'Analysis of news.com article',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            type: 'article'
          },
          {
            id: '2',
            title: 'Untitled Image Check', 
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
            type: 'image'
          },
          {
            id: '3',
            title: 'Social media post verification',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            type: 'text'
          }
        ]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Unknown time';
    
    let date: Date;
    if (timestamp.toDate) {
      // Firestore Timestamp
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      return 'Unknown time';
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Less than an hour ago';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const handleNewCheck = () => {
    console.log('New check clicked');
    // Navigate to analysis page or open new check modal
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    console.log('History item clicked:', item);
    // Navigate to specific analysis result
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    if (isMockAuth) {
      // For mock auth, just clear the user state
      console.log('Mock auth logout');
      setUser(null);
    } else if (auth) {
      // For Firebase auth, use the standard signOut
      auth.signOut();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`w-72 bg-slate-800 h-screen flex flex-col items-center justify-center ${className}`}>
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`w-72 bg-slate-800 h-screen flex flex-col ${className}`}>
      {/* Header with New Check Button */}
      <div className="p-6 border-b border-slate-700">
        <div className="mb-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white cursor-pointer hover:text-gray-200 transition-colors">Satya</h1>
          </Link>
        </div>
        <button
          onClick={handleNewCheck}
          className="w-full bg-[#1A237E] hover:bg-[#283593] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <div className="mr-2">
            <FaPlus size={16} />
          </div>
          New Check +
        </button>
      </div>

      {/* History Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="text-slate-400 mr-2">
              <FaHistory size={16} />
            </div>
            <h2 className="text-lg font-semibold text-slate-200">History</h2>
          </div>
          
          <div className="space-y-2">
            {history.length > 0 ? (
              history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleHistoryItemClick(item)}
                  className="w-full text-left p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors group"
                >
                  <div className="text-slate-200 font-medium text-sm mb-1 group-hover:text-white">
                    {item.title}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {formatTimestamp(item.timestamp)}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-slate-400 text-sm text-center py-4">
                No analysis history yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-slate-700 p-6">
        {user ? (
          <>
            <div className="flex items-center mb-4">
              {/* Avatar */}
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center mr-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="text-slate-300">
                    <FaUser size={20} />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="text-slate-200 font-medium text-sm truncate">
                  {user.displayName || 'User'}
                </div>
                <div className="text-slate-400 text-xs truncate">
                  {user.email}
                </div>
              </div>
            </div>
            
            {/* View Profile Button */}
            <Link 
              href="/profile"
              className="w-full bg-[#1A237E] hover:bg-[#283593] text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center mb-3"
            >
              <div className="mr-2">
                <FaUser size={14} />
              </div>
              View Profile
            </Link>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <div className="mr-2">
                <FaSignOutAlt size={14} />
              </div>
              Logout
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-slate-400 text-sm mb-3">
              Sign in to view your analysis history
            </div>
            <Link
              href="/login"
              className="inline-block bg-[#1A237E] hover:bg-[#283593] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}