import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { registerWithEmailAndPassword } from '../lib/firebase/firebase';
import SignUpForm from '@/components/SignUpForm';
import LocaleProvider from '@/context/locales';

jest.mock('../lib/firebase/firebase', () => ({
  registerWithEmailAndPassword: jest.fn(),
}));

describe('SignUpForm', () => {
  it('renders correctly', () => {
    render(
      <LocaleProvider>
        <SignUpForm />
      </LocaleProvider>
    );
    const signUpElements = screen.getAllByText(/sign in/i);
    expect(signUpElements.length).toBeGreaterThan(0);
    signUpElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(
      <LocaleProvider>
        <SignUpForm />
      </LocaleProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123!' },
    });

    const signUpForm = screen.getByTestId('form');

    fireEvent.submit(signUpForm);

    await waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        'password123!'
      );
    });
  });

  it('disables submit button when form is not dirty or not valid', () => {
    render(
      <LocaleProvider>
        <SignUpForm />
      </LocaleProvider>
    );

    expect(screen.getByRole('button')).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
