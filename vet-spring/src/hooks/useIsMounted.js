import { useEffect, useRef } from "react"

export const useIsMounted = (formSubmittingRef) => {
    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true

        return () => {
            if (!formSubmittingRef?.current) {
            isMounted.current = false
            }
        }
    }, []);

    return isMounted
};