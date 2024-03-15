import { dispatchError } from "@/lib/toast";
import { api } from "@/services/api";
import { TypePerson } from "@/types/type-person";
import { useState, useEffect, useCallback } from "react";

export const useGetPerson = (url: string = "admin/person") => {
  const [person, setPerson] = useState<TypePerson[]>([]);
  const [isLoadingPerson, setIsLoadingPerson] = useState(true);

  const getPerson = useCallback(async () => {
    try {
      const response = await api.get(url);
      setPerson(response.data);
    } catch (error) {
      dispatchError(error);
    } finally {
      setIsLoadingPerson(false);
    }
  }, [url]);

  useEffect(() => {
    getPerson();
  }, [getPerson]);

  return { person, isLoadingPerson };
};
