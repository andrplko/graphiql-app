import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { registerWithEmailAndPassword } from '@/lib/firebase/firebase';
import SignUpForm from '@/components/SignUpForm';

const mockLocaleContext = {
  localeData: {
    sign_up_page: {
      title: 'Sign Up',
      email: 'Email',
      password: 'Password',
      button: 'Sign Up',
      auth_link: {
        text: 'Already have an account?',
        label: 'Sign In',
      },
    },
    validation: {
      email: {
        required: 'Email is required',
        message: 'Please enter a valid email address',
      },
      password: {
        required: 'Password is required',
        messages: {
          eight_symbols: 'Password must contain minimum 8 symbols',
          one_letter: 'Password must contain at least one letter',
          one_digit: 'Password must contain one digit',
          one_special: 'Password must contain one special character',
        },
      },
    },
  },
};

jest.mock('../lib/firebase/firebase', () => ({
  registerWithEmailAndPassword: jest.fn(),
}));

jest.mock('../context/locales', () => ({
  ...jest.requireActual('../context/locales'),
  useLocaleContext: jest.fn(() => mockLocaleContext),
}));

describe('SignUpForm component', () => {
  test('renders SignUpForm components', () => {
    render(<SignUpForm />);

    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByRole('button');
    const authLink = screen.getByText('Already have an account?');

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(authLink).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(<SignUpForm />);

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
      expect(registerWithEmailAndPassword).toHaveBeenCalledTimes(1)
    );

    await waitFor(() =>
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
        'test123@example.com',
        'Password1!'
      )
    );
  });

  test('displays error messages for invalid data', async () => {
    render(<SignUpForm />);

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
