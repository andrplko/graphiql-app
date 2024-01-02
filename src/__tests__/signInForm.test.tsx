import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { logInWithEmailAndPassword } from '../lib/firebase/firebase';
import SignInForm from '@/components/SignInForm';
import LocaleProvider from '@/context/locales';

jest.mock('../lib/firebase/firebase', () => ({
  logInWithEmailAndPassword: jest.fn(),
}));

describe('SignInForm', () => {
  it('renders correctly', () => {
    render(
      <LocaleProvider>
        <SignInForm />
      </LocaleProvider>
    );
    const signInElements = screen.getAllByText(/sign in/i);
    expect(signInElements.length).toBeGreaterThan(1);
    signInElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(
      <LocaleProvider>
        <SignInForm />
      </LocaleProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123!' },
    });

    const signInForm = screen.getByTestId('form');

    fireEvent.submit(signInForm);

    await waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        'password123!'
      );
    });
  });

  it('disables submit button when form is not dirty or not valid', () => {
    render(
      <LocaleProvider>
        <SignInForm />
      </LocaleProvider>
    );

    expect(screen.getByRole('button')).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
