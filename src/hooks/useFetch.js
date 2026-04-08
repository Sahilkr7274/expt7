import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    api.get(url, { signal: controller.signal })
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.name !== 'CanceledError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}