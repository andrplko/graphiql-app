import { render, screen, fireEvent } from '@testing-library/react';
import UserNavigation from '@/components/UserNavigation';
import { User } from 'firebase/auth';
import { act } from 'react-dom/test-utils';
import { Routes } from '@/constants/routes';
import { useRouter } from 'next/router';

const mockAuthState: (Partial<User> | null | boolean)[] = [null, false];
const mockLocaleContext = {
  language: 'En',
  setLanguage: jest.fn(),
  localeData: {
    header: {
      links: {
        welcome: 'Welcome',
        main: 'Main',
      },
      auth_buttons: {
        sign_in: 'Sign In',
        sign_up: 'Sign Up',
        sing_out: 'Sing Out',
      },
    },
  },
};

jest.mock('next/router', () => {
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    route: '/',
    pathname: '/',
    asPath: '',
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => mockAuthState),
}));

jest.mock('../context/locales', () => ({
  ...jest.requireActual('../context/locales'),
  useLocaleContext: jest.fn(() => mockLocaleContext),
}));

describe('UserNavigation component', () => {
  test('renders UserNavigation components when user is not authenticated', () => {
    render(<UserNavigation />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('En')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('redirects to SignIn/SignUp page when SignIn/SignUp button is clicked', () => {
    const router = useRouter();

    render(<UserNavigation />);

    fireEvent.click(screen.getByText('Sign In'));
    expect(router.push).toHaveBeenCalledWith(Routes.SIGN_IN);

    fireEvent.click(screen.getByText('Sign Up'));
    expect(router.push).toHaveBeenCalledWith(Routes.SIGN_UP);
  });

  test('handles click on localization button', () => {
    render(<UserNavigation />);

    const localizationButton = screen.getByText('En');
    expect(localizationButton).toBeInTheDocument();

    fireEvent.click(localizationButton);

    expect(mockLocaleContext.setLanguage).toHaveBeenCalled();
  });

  test('renders Main link and Sign Out button when user is authenticated', async () => {
    act(() => {
      mockAuthState[0] = {
        email: 'test123@example.com',
      };
    });

    render(<UserNavigation />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('En')).toBeInTheDocument();
    expect(screen.getByText('Sing Out')).toBeInTheDocument();
  });

  test('activates welcome link based on router.pathname', () => {
    const router = useRouter();

    act(() => {
      router.pathname = Routes.WELCOME;
    });

    render(<UserNavigation />);

    expect(screen.getByText('Welcome')).toHaveClass('active');
  });

  test('activates main link based on router.pathname', () => {
    const router = useRouter();

    act(() => {
      router.pathname = Routes.MAIN;
    });

    render(<UserNavigation />);

    expect(screen.getByText('Main')).toHaveClass('active');
  });

  test('renders loading state', () => {
    act(() => {
      mockAuthState[0] = null;
      mockAuthState[1] = true;
    });

    render(<UserNavigation />);

    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
    expect(screen.queryByText('En')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });
});
