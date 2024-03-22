import { dispatchError } from "@/lib/toast";
import { api } from "@/services/api";
import { TypeMentoring, TypeMentoringSearchOne } from "@/types/type-mentoring";
import { useState, useEffect, useCallback } from "react";

export const useGetMentoring = (url: string = "admin/mentoring/done") => {
  const [mentoring, setMentoring] = useState<TypeMentoring[]>([]);
  const [isLoadingMentoring, setIsLoadingMentoring] = useState(true);

  const getMentoring = useCallback(async () => {
    try {
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

export const useGetMentoringById = (id: string) => {
  const url = `mentoring/${id}`;
  const [mentoring, setMentoring] = useState<TypeMentoringSearchOne>();
  const [isLoadingMentoring, setIsLoadingMentoring] = useState(true);

  const getMentoring = useCallback(async () => {
    try {
      const response = await api.get(url);
      const data = response.data;
      if (data.founded == false) {
        setMentoring(data);
        return;
      }
      setMentoring({
        ...data,
        founded: true,
        startTime: new Date(response.data.startTime),
        endTime: new Date(response.data.endTime),
      });
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
