import { render, screen } from '@testing-library/react';
import Layout from '@/components/Layout';
import { ClassAttributes, ImgHTMLAttributes } from 'react';
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

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  ) => <img {...props} />,
}));

describe('Layout component', () => {
  it('renders children correctly', () => {
    render(
      <LocaleProvider>
        <Layout>
          <div data-testid="test-child">Test Child</div>
        </Layout>
      </LocaleProvider>
    );

    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  it('renders logo correctly', () => {
    render(
      <LocaleProvider>
        <Layout />
      </LocaleProvider>
    );

    const titleElement = screen.getByText('GraphiQL');
    const logoIcon = screen.getByAltText('logo');

    expect(titleElement).toBeInTheDocument();
    expect(logoIcon).toBeInTheDocument();
  });
});
