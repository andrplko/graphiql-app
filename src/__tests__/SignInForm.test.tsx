import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from '@/components/SignInForm';
import { logInWithEmailAndPassword } from '@/lib/firebase/firebase';
import LocaleProvider from '@/context/locales';

jest.mock('../lib/firebase/firebase', () => ({
  logInWithEmailAndPassword: jest.fn(),
}));

describe('SignInForm component', () => {
  test('renders SignInForm components', () => {
    render(
      <LocaleProvider>
        <SignInForm />
      </LocaleProvider>
    );

    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByRole('button');
    const authLink = screen.getByText("Don't have an account?");

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(authLink).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(
      <LocaleProvider>
        <SignInForm />
      </LocaleProvider>
    );

    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(emailField, {
      target: { value: 'test123@example.com' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'Password1!' },
    });

    fireEvent.submit(buttonElement);

    await waitFor(() =>
      expect(logInWithEmailAndPassword).toHaveBeenCalledTimes(1)
    );

    await waitFor(() =>
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith(
        'test123@example.com',
        'Password1!'
      )
    );
  });

  test('displays error messages for invalid data', async () => {
    render(
      <LocaleProvider>
        <SignInForm />
      </LocaleProvider>
    );

    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(emailField, {
      target: { value: '' },
    });
    fireEvent.change(passwordField, {
      target: { value: '' },
    });

    fireEvent.submit(buttonElement);

    const emailErrorMessage = await screen.findByText('Email is required');
    const passwordErrorMessage = await screen.findByText(
      'Password is required'
    );

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});
