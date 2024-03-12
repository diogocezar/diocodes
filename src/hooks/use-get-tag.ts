import { dispatchError } from "@/lib/toast";
import { api } from "@/services/api";
import { TypeTag } from "@/types/type-tag";
import { useState, useEffect, useCallback } from "react";

type TypeLocalItems = Record<"value" | "label", string>;

export const useGetTag = (url: string = "admin/tag") => {
  const [tag, setTag] = useState<TypeLocalItems[]>([]);
  const [isLoadingTag, setIsLoadingTag] = useState(false);

  const getTag = useCallback(async () => {
    try {
      setIsLoadingTag(true);
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
