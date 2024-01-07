import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from '@/pages/main';
import LocaleProvider from '@/context/locales';

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

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  onAuthStateChanged: () => jest.fn(),
  getAuth: () => jest.fn(),
}));

describe('MainPage component', () => {
  it('handles endpoint submission correctly', () => {
    render(
      <LocaleProvider>
        <MainPage />
      </LocaleProvider>
    );

    const endpointInput = screen.getByPlaceholderText('Type endpoint');
    const submitButton = screen.getByAltText('change icon');

    fireEvent.change(endpointInput, {
      target: { value: 'https://example.com/graphql' },
    });
    fireEvent.submit(submitButton);

    expect(endpointInput).toHaveValue('https://example.com/graphql');
  });
});
