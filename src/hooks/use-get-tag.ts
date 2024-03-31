import { dispatchError } from "@/lib/toast";
import { api } from "@/services/api";
import { TypeTag, TypeTagValueLabel } from "@/types/type-tag";
import { useState, useEffect, useCallback } from "react";

export const useGetTag = (url: string = "admin/tag") => {
  const [tag, setTag] = useState<TypeTagValueLabel[]>([]);
  const [isLoadingTag, setIsLoadingTag] = useState(true);

  const getTag = useCallback(async () => {
    try {
      const response = await api.get(url);
      const data = response.data.map((item: TypeTag) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setTag(data);
    } catch (error) {
      dispatchError(error);
    } finally {
      setIsLoadingTag(false);
    }
  }, [url]);

  useEffect(() => {
    getTag();
  }, [getTag]);

  return { tag, isLoadingTag };
};

export const useMaxTagUsed = (url: string = "admin/tag") => {
  const [maxTagUsed, setMaxTagUsed] = useState<number>(0);

  const getMaxTagUsed = useCallback(async () => {
    try {
      const response = await api.get(`${url}/max-tag-used`);
      setMaxTagUsed(response.data);
    } catch (error) {
      dispatchError(error);
    }
  }, [url]);

  useEffect(() => {
    getMaxTagUsed();
  }, [getMaxTagUsed]);

  return { maxTagUsed };
};
