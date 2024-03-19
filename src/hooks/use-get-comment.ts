import { dispatchError } from "@/lib/toast";
import { api } from "@/services/api";
import { TypeAvaliation } from "@/types/type-avaliation";
import { useState, useEffect, useCallback } from "react";

export const useGetComment = (url: string = "comment") => {
  const [comment, setComment] = useState<TypeAvaliation[]>([]);
  const [isLoadingComment, setIsLoadingComment] = useState(true);

  const getAvaliation = useCallback(async () => {
    try {
      const response = await api.get(url);
      setComment(response.data);
    } catch (error) {
      dispatchError(error);
    } finally {
      setIsLoadingComment(false);
    }
  }, [url]);

  useEffect(() => {
    getAvaliation();
  }, [getAvaliation]);

  return { comment, isLoadingComment };
};
