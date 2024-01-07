import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { renderHook, waitFor } from '@testing-library/react';

const mock = new MockAdapter(axios);
const endpoint = 'https://rickandmortyapi.com/graphql';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    POSITION: {
      TOP_RIGHT: 'top-right',
    },
  },
}));

describe('useAxiosFetch hook', () => {
  afterEach(() => {
    mock.reset();
  });

  test('fetches data successfully with POST request', async () => {
    const responseData = {
      data: {
        characters: {
          results: [
            {
              name: 'Rick Sanchez',
            },
            {
              name: 'Morty Smith',
            },
            {
              name: 'Summer Smith',
            },
          ],
        },
      },
    };

    mock.onPost(endpoint).replyOnce(200, responseData);

    const { result } = renderHook(() =>
      useAxiosFetch(endpoint, 'post', {
        query: '{ characters { results { name }}}',
      })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(responseData);
  });

  test('handles errors for POST request', async () => {
    const responseData = { errors: [{ message: 'Error message' }] };

    mock.onPost(endpoint).replyOnce(400, responseData);

    const { result } = renderHook(() =>
      useAxiosFetch(endpoint, 'post', {
        query: '{ characters { results { name; }}}',
      })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toStrictEqual(responseData);
    expect(result.current.error).toBeDefined();
  });
});
