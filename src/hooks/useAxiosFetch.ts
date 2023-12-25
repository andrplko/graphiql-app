import axios, {
  AxiosError,
  AxiosResponse,
  Method,
  AxiosHeaderValue,
} from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useAxiosFetch = (
  url: string,
  method: Method | string,
  body?: { query: string },
  headers?: { [key: string]: AxiosHeaderValue }
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (url && body?.query) {
          const res: AxiosResponse = await axios({
            url,
            method,
            data: body,
            headers,
          });

          if (!didCancel) {
            setData(res.data);
            setError(null);
          }

          if (Object.hasOwn(res.data, 'errors')) {
            toast.error(res.data.errors[0].message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (!didCancel) {
            setError(error);
            setData(error.response?.data);
          }

          toast.error(error.response?.data.errors[0].message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url, body?.query]);

  return { data, loading, error };
};

export default useAxiosFetch;
