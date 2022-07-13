import { useCallback, useEffect, useState } from 'react';
import { getReacts } from '../api/reactApi';

function usePersistedStateReacts() {
  const [data, dataSet] = useState([]);

  const fetchMyAPI = useCallback(async () => {
    const response = await getReacts();

    dataSet(response);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return [data, dataSet];
}

export default usePersistedStateReacts;
