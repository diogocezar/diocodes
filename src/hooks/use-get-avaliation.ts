import { dispatchError } from "@/lib/toast";
import { api } from "@/services/api";
import { TypeAvaliation } from "@/types/type-avaliation";
import { useState, useEffect, useCallback } from "react";

export const useGetAvaliation = (url: string = "admin/avaliation") => {
  const [avaliation, setAvaliation] = useState<TypeAvaliation[]>([]);
  const [isLoadingAvaliation, setIsLoadingAvaliation] = useState(true);

  const getAvaliation = useCallback(async () => {
    try {
      const response = await api.get(url);
      setAvaliation(response.data);
    } catch (error) {
      dispatchError(error);
    } finally {
      setIsLoadingAvaliation(false);
    }
  }, [url]);

  useEffect(() => {
    getAvaliation();
  }, [getAvaliation]);

  return { avaliation, isLoadingAvaliation };
};
