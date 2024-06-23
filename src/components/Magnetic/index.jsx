import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

const Magnetic = ({children}) => {
    const magnetic = useRef(null);
    const isMobileOrTablet = useRef(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            isMobileOrTablet.current = window.innerWidth <= 768;
        };

        window.addEventListener('resize', handleResize);

        if (!isMobileOrTablet.current) {
            const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
            const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { height, width, left, top } = magnetic.current.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                xTo(x * 0.35);
                yTo(y * 0.35);
            };

            const handleMouseLeave = () => {
                xTo(0);
                yTo(0);
            };

            magnetic.current.addEventListener("mousemove", handleMouseMove);
            magnetic.current.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                window.removeEventListener('resize', handleResize);
                magnetic.current.removeEventListener("mousemove", handleMouseMove);
                magnetic.current.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);

    return React.cloneElement(children, { ref: magnetic });
};

export default Magnetic;
