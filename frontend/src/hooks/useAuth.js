import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUserProfile, getUserProfile } from '../services/userService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  const register = async (email, password, userData) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });

    await createUserProfile(user.uid, {
      ...userData,
      email: email,
      createdAt: new Date().toISOString(),
      role: 'student'
    });

    return user;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    const userProfile = await getUserProfile(result.user.uid);
    if (!userProfile) {
      await createUserProfile(result.user.uid, {
        email: result.user.email,
        firstName: result.user.displayName?.split(' ')[0] || '',
        lastName: result.user.displayName?.split(' ')[1] || '',
        createdAt: new Date().toISOString(),
        role: 'student'
      });
    }

    return result;
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  const logout = () => signOut(auth);

  return { 
    user, 
    userProfile, 
    login, 
    register, 
    logout, 
    resetPassword,
    loginWithGoogle,
    loading 
  };
};
