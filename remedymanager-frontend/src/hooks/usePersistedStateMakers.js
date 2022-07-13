import { useCallback, useEffect, useState } from 'react';
import { getMakers } from '../api/makerApi';

function usePersistedStateMakers() {
  const [data, dataSet] = useState([]);

  const fetchMyAPI = useCallback(async () => {
    const response = await getMakers();

    dataSet(response);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return [data, dataSet];
}

export default usePersistedStateMakers;
