import { useState, useEffect } from 'react';
import type { ApiState } from './types';

export function useApi<T>(url: string) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ 
        data: null, 
        loading: false, 
        error: err instanceof Error ? err.message : 'Error desconocido' 
      });
    }
  };

  const refetch = () => {
    fetchData();
  };

  return { ...state, refetch };
}
