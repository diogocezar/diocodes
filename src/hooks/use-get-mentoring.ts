import { dispatchError } from "@/lib/toast";
import { api } from "@/services/api";
import { TypeMentoring } from "@/types/type-mentoring";
import { useState, useEffect, useCallback } from "react";

export const useGetMentoring = (url: string = "admin/mentoring/done") => {
  const [mentoring, setMentoring] = useState<TypeMentoring[]>([]);
  const [isLoadingMentoring, setIsLoadingMentoring] = useState(false);

  const getMentoring = useCallback(async () => {
    try {
      setIsLoadingMentoring(true);
      const response = await api.get(url);
      setMentoring(response.data);
    } catch (error) {
      dispatchError(error);
    } finally {
      setIsLoadingMentoring(false);
    }
  }, [url]);

  useEffect(() => {
    getMentoring();
  }, [getMentoring]);

  return { mentoring, isLoadingMentoring };
};
