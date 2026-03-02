import { db, auth } from './firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { SurveyData } from '../types';

export const api = {
  submitSurvey: async (data: Omit<SurveyData, 'id' | 'timestamp'>): Promise<void> => {
    if (!db) throw new Error("Firebase not initialized");
    await addDoc(collection(db, 'surveys'), {
      ...data,
      timestamp: Date.now()
    });
  },

  getSurveys: async (): Promise<SurveyData[]> => {
    if (!db) throw new Error("Firebase not initialized");
    const q = query(collection(db, 'surveys'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SurveyData));
  },

  loginAdmin: async (email: string, pass: string): Promise<User | { email: string }> => {
    if (!auth) throw new Error("Firebase not initialized");
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential.user;
  },

  logout: async () => {
    if (!auth) throw new Error("Firebase not initialized");
    await signOut(auth);
  }
};
