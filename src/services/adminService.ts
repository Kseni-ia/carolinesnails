import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface AdminSettings {
  password: string;
  updatedAt: any;
}

const ADMIN_SETTINGS_DOC = 'admin-settings';

export const getAdminPassword = async (): Promise<string | null> => {
  try {
    const docRef = doc(db, 'config', ADMIN_SETTINGS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as AdminSettings;
      return data.password;
    } else {
      // Initialize with default password if not exists
      await setDoc(docRef, {
        password: 'admin123',
        updatedAt: serverTimestamp()
      });
      return 'admin123';
    }
  } catch (error) {
    console.error('Error fetching admin password:', error);
    return null;
  }
};

export const updateAdminPassword = async (newPassword: string): Promise<boolean> => {
  try {
    const docRef = doc(db, 'config', ADMIN_SETTINGS_DOC);
    await setDoc(docRef, {
      password: newPassword,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating admin password:', error);
    return false;
  }
};
