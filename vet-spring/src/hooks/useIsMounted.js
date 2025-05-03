import { useEffect, useRef, } from "react"

export const useIsMounted = (formIsSubmittingRef) => {
    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true

        return () => {
            if (!formIsSubmittingRef?.current) {
            isMounted.current = false
            }
        }
    }, []);

    return isMounted
};