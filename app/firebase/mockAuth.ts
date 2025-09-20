// Mock auth service for development when Firebase is not configured

// Browser localStorage key for mock users
const MOCK_USERS_KEY = 'satya_mock_users';

// Helper functions for localStorage persistence
const loadMockUsers = (): { [email: string]: { password: string; uid: string } } => {
  if (typeof window === 'undefined') return {}; // Server-side rendering check
  
  try {
    const stored = localStorage.getItem(MOCK_USERS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading mock users:', error);
    return {};
  }
};

const saveMockUsers = (users: { [email: string]: { password: string; uid: string } }) => {
  if (typeof window === 'undefined') return; // Server-side rendering check
  
  try {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving mock users:', error);
  }
};

export const mockAuth = {
  createUser: async (email: string, password: string) => {
    console.log('Mock: Creating user with email:', email);
    
    // Load existing users from localStorage
    const mockUsers = loadMockUsers();
    
    // Check if user already exists
    if (mockUsers[email]) {
      throw new Error('Email already in use');
    }

    // Store user credentials
    const uid = 'mock-user-' + Date.now();
    mockUsers[email] = { password, uid };
    
    // Save to localStorage
    saveMockUsers(mockUsers);
    
    console.log('Mock: User created and saved to localStorage');
    
    // Simulate Firebase user creation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            uid: uid,
            email: email,
            emailVerified: false
          }
        });
      }, 1000);
    });
  },

  signInUser: async (email: string, password: string) => {
    console.log('Mock: Signing in user with email:', email);
    
    // Load existing users from localStorage
    const mockUsers = loadMockUsers();
    
    console.log('Mock: Available users:', Object.keys(mockUsers));
    
    // Check if user exists
    if (!mockUsers[email]) {
      console.log('Mock: User not found in localStorage');
      throw new Error('User not found');
    }

    // Check password
    if (mockUsers[email].password !== password) {
      console.log('Mock: Password mismatch');
      throw new Error('Wrong password');
    }

    console.log('Mock: Login successful');

    // Simulate successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            uid: mockUsers[email].uid,
            email: email,
            emailVerified: false
          }
        });
      }, 1000);
    });
  },

  // Helper function to check if user exists (for debugging)
  getUserList: () => {
    const mockUsers = loadMockUsers();
    return Object.keys(mockUsers);
  }
};

export const isFirebaseConfigured = () => {
  // Check if we have valid Firebase config
  return process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
         process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-api-key';
};