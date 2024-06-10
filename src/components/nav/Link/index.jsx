import React from 'react'
import styles from "./style.module.scss"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slide, scale } from '../../header/anim.js';
import Magnetic from '@/components/Magnetic';

const Rlink = ({data, isActive, setSelectedIndicator, Click}) => {
    const { title, href, index} = data;
  return (
    <motion.div 
    className={styles.link}
    onMouseEnter={() => {setSelectedIndicator(href)}} 
    custom={index} 
    variants={slide} 
    initial="initial" 
    animate="enter" 
    exit="exit">
        <motion.div 
        variants={scale} 
        animate={isActive ? "open" : "closed"} 
        className={styles.indicator}>
        </motion.div>
        <Magnetic>
          <Link href={data.href} onClick={Click}>
            {title}
          </Link>
        </Magnetic>
    </motion.div>
  )
}

export default Rlink