import { useCallback, useEffect, useState } from 'react';
import { getRemedys } from '../api/remedyApi';

function usePersistedStateRemedys() {
  const [data, dataSet] = useState(null);

  const fetchMyAPI = useCallback(async () => {
    const response = await getRemedys();

    dataSet(response);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return [data, dataSet];
}

export default usePersistedStateRemedys;
