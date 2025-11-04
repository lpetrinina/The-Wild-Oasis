import { useEffect, useRef } from "react";

function useOutsideClick(listener) {

    const ref = useRef();

    useEffect(() => {
        const handleClick = function (e) {
            if (ref.current && !ref.current.contains(e.target)) {
                listener();
            }
        };

        document.addEventListener("click", handleClick, true); // Add  event listener

        return () => document.removeEventListener("click", handleClick, true); //Clean up function

    }, [listener]);

    return ref;
}

export default useOutsideClick;