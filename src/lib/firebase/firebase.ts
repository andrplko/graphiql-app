import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import firebaseApp from './config';
import { toast } from 'react-toastify';

const auth = getAuth(firebaseApp);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
};

export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
