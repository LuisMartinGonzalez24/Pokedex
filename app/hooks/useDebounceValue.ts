import { useState, useEffect } from "react";

export const useDebounceValue = (input: string = '', time: number = 500) => {

    const [isWritting, setisWritting] = useState<boolean>(false);
    const [debounceValue, setdebounceValue] = useState<string>(input);

    useEffect(() => {

        if (input.trim().length > 0) setisWritting(true); 

        const timeOut = setTimeout(() => {
            setdebounceValue(input);
            setisWritting(false);
        }, time);

        return () => {
            clearTimeout(timeOut);
        }
    }, [input])

    return {
        isWritting,
        debounceValue
    };
}
