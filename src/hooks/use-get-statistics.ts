import { dispatchError } from "@/lib/toast";
import { api } from "@/services/api";
import { useState, useEffect, useCallback } from "react";

export const useGetStatistics = (url: string = "statistics") => {
  const [statistics, setStatistics] = useState<any>();
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);

  const getAvaliation = useCallback(async () => {
    try {
      const response = await api.get(url);
      setStatistics(response.data);
    } catch (error) {
      dispatchError(error);
    } finally {
      setIsLoadingStatistics(false);
    }
  }, [url]);

  useEffect(() => {
    getAvaliation();
  }, [getAvaliation]);

  return { statistics, isLoadingStatistics };
};
