import { useParams } from "react-router";
import { useIsMounted } from "./useIsMounted";
import { useState, useEffect } from "react";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { getEntityById } from "@/utils/helpers/entity";
import { useEntityPath } from "./usePath";

export const useEntityData = () => {
    const { entityId } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);

    const { Loading, Success, Error, Unusual } = UIStatus;
    const { setStatus } = useUI();
    const isMounted = useIsMounted();
   const entityPath = useEntityPath();
    
    useEffect(() => {
      const GetEntity = async () => {
        try {
          setStatus(Loading);
          const response = await getEntityById(entityPath, entityId);
          if (!isMounted.current ) return;
  
          const { data, success } = response.data;
     
          if (data && success) {
            setStatus(Success);
            setInitialData(data);

          } else {
            setStatus(Unusual)
            setInitialData(null);
          }
        } catch (error) {
          if (!isMounted.current) return;
  
          const errorMessage =
            error.response?.data?.message ?? error.message ?? "Unknown error";
          setStatus(Error);
          setError(errorMessage);
          setInitialData(null);
        }
      };
  
     if (entityId) GetEntity();
    }, [entityId]);

    return (
        {initialData, error}
    )
}