import { useState, useEffect } from 'react';

// a debounce function limits the rate at which a function can fire. This is particularly useful when dealing with callback functions triggered by events that can occur at a high rate, such as window resizing, scrolling, or keystrokes in an input box.

const useDebouncedValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const debounceHandler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // clean-up
        return () => {
            clearInterval(debounceHandler);
        };

    }, [value, delay]);

    return debouncedValue;
};

export default useDebouncedValue;