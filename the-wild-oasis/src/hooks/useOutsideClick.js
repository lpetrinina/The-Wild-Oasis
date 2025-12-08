import { useEffect, useRef } from "react";

function useOutsideClick(listener, listenCapturing = true) {

    const ref = useRef();

    useEffect(() => {
        const handleClick = function (e) {
            if (ref.current && !ref.current.contains(e.target)) {
                listener();
            }
        };

        document.addEventListener("click", handleClick, listenCapturing); // Add  event listener

        return () => document.removeEventListener("click", handleClick, listenCapturing); //Clean up function

    }, [listener]);

    return ref;
}

export default useOutsideClick;