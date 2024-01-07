import {
  auth,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
} from '@/lib/firebase/firebase';
import { waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

const mockEmail = 'test123@example.com';
const mockPassword = 'Password1!';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    POSITION: {
      TOP_RIGHT: 'top-right',
    },
  },
}));

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe('Authentication Functions', () => {
  test('logInWithEmailAndPassword - Successful Login', async () => {
    await logInWithEmailAndPassword(mockEmail, mockPassword);

    await waitFor(() => {
      expect(auth.currentUser).toBeDefined();
    });
  });

  test('registerWithEmailAndPassword - Successful Registration', async () => {
    await registerWithEmailAndPassword(mockEmail, mockPassword);

    await waitFor(() => {
      expect(auth.currentUser).toBeDefined();
    });
  });

  test('logout - Successful Logout', async () => {
    await logout();

    await waitFor(() => {
      expect(auth.currentUser).toBeNull();
    });
  });

  test('logout - Failed Logout', async () => {
    jest
      .spyOn(auth, 'signOut')
      .mockRejectedValueOnce(new Error('Logout failed'));

    await logout();

    expect(toast.error).toHaveBeenCalledWith('Logout failed', {
      position: 'top-right',
    });
  });
});
