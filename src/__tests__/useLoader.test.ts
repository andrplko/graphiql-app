import useLoader from '@/hooks/useLoader';
import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => {
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    route: '/',
    pathname: '/',
    asPath: '',
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

describe('useLoader hook', () => {
  test('attaches and detaches event listeners correctly', () => {
    const router = useRouter();
    const { unmount } = renderHook(() => useLoader());

    expect(router.events.on).toHaveBeenCalledWith(
      'routeChangeStart',
      expect.any(Function)
    );
    expect(router.events.on).toHaveBeenCalledWith(
      'routeChangeComplete',
      expect.any(Function)
    );
    expect(router.events.on).toHaveBeenCalledWith(
      'routeChangeError',
      expect.any(Function)
    );

    unmount();

    expect(router.events.off).toHaveBeenCalledWith(
      'routeChangeStart',
      expect.any(Function)
    );
    expect(router.events.off).toHaveBeenCalledWith(
      'routeChangeComplete',
      expect.any(Function)
    );
    expect(router.events.off).toHaveBeenCalledWith(
      'routeChangeError',
      expect.any(Function)
    );
  });
});
