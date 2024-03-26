import { useEffect, useState } from "react";

const useHeaderHeight = () => {
    const [headerHeight, setHeaderHeight] = useState(1);

    useEffect(() => {
        const header = document.querySelector('header');
        setHeaderHeight(header.offsetHeight);

    }, [setHeaderHeight]);

    return headerHeight;
};

export default useHeaderHeight;