import { useEffect, useRef, } from "react"

export const useIsMounted = (preventUnmountRef) => {
    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true

        return () => {
            if (!preventUnmountRef?.current) {
            isMounted.current = false
            }
        }
    }, []);

    return isMounted
};