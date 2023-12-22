import axios, { AxiosError } from 'axios';
import { getIntrospectionQuery } from 'graphql';
import { toast } from 'react-toastify';

export const getSchema = async (url: string) => {
  try {
    const res = await axios.post(url, {
      query: getIntrospectionQuery(),
    });

    if (res.status !== 200) {
      const errorMessage = res.statusText;

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });

      throw new Error('Failed to fetch schema');
    }

    const schema = res.data.data;

    return schema;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      throw error;
    }
  }
};
