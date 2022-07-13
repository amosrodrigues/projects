import { useCallback, useEffect, useState } from 'react';
import { getTasks } from '../api';

function usePersistedState() {
  const [data, dataSet] = useState([]);

  const fetchMyAPI = useCallback(async () => {
    const order = {
      option: 'date',
      action: 1,
    };

    const response = await getTasks(order);

    dataSet(response);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return [data, dataSet];
}

export default usePersistedState;
