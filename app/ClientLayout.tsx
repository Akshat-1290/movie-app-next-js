'use client'

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useAuth, UserData } from './AuthContext';
import { useRouter } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, setUserData } = useAuth();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Check if user document exists, if not create it
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserData({
            email: userData.email,
            plan: userData.plan,
            favorites: userData.favorites || []
          } as UserData);
        } else {
          const newUserData = {
            email: user.email || `guest${Math.floor(Math.random() * 1000000)}@gmail.com`,
            plan: 'premium',
            favorites: []
          };
          await setDoc(userDocRef, newUserData);
          setUserData(newUserData as UserData);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
      setIsDataLoaded(true);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setUserData]);

  // if (!isDataLoaded) {
  //   return null; // or a loading spinner
  // }

  return <>{children}</>;
}