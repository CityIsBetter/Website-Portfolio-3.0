'use client';
import React, { useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import { text, curve, translate } from './anim';
import './style.module.scss'

const routes = {
    "/": "Home",
    "/About": "About",
    "/Works": "Works",
    "/Contact": "Contact"
}

const anim = (variants) => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit",
        transition: {
            when: "beforeChildren"
        }
    }
}


export default function Curve({children}) {
    const router = useRouter();
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })

    useEffect(() => {
        let timeoutId;
        function resize() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 100); // Debounce by 100ms
        }
        resize();
        window.addEventListener("resize", resize);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", resize);
        }
    }, []);
    
    
    return (
    <div className='main curve'>
       <div style={{opacity: dimensions.width == null ? 1 : 0}} className='background'/>
       <motion.p className='route' {...anim(text)}>
            {routes[router.route]}
        </motion.p>
       {dimensions.width != null && <SVG {...dimensions}/>}
        {
            children
        }
    </div>
    )
}

const SVG = memo(({width, height}) => {

    const initialPath = `
        M0 300 
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 0
    `

    const targetPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height}
        Q${width/2} ${height} 0 ${height}
        L0 0
    `
    return (
        <motion.svg {...anim(translate)} className="psvg">
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    )
});