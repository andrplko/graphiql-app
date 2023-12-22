import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const getData = async (url: string, query: string) => {
  try {
    const res = await axios.post(
      url,
      {
        query,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { data } = res;

    if (res.status !== 200 || Object.hasOwn(data, 'errors')) {
      const errorMessage = data.errors[0].message;

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });

      return data;
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      throw error;
    }
  }
};
