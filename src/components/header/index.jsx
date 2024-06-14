'use client';
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Magnetic from '../Magnetic';
import styles from './style.module.scss'
import Nav from '../nav'

const Rounded = ({children}) => {
  return (
    <Magnetic>
      <div className={styles.button}>
          {
            children
          }
      </div>
    </Magnetic>
  )
}

const Header = () => {

    const [isActive, setIsActive] = useState(false);
    const button = useRef(null)
    const pathname = usePathname();

    useEffect( () => {
      if(isActive) setIsActive(false)
    }, [pathname])

    useLayoutEffect( () => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(button.current, {
          scrollTrigger: {
              trigger: document.documentElement,
              start: 0,
              end: 200,
              onLeave: () => {gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
              onEnterBack: () => {gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"},setIsActive(false))}
          }
      })
  }, [])

  return (
    <>
    <div className={styles.buttonContainer} ref={button} onClick={() => setIsActive(!isActive)}>
      <Rounded  >
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`} ></div>
      </Rounded>
    </div>
    <AnimatePresence mode='wait'>
    {isActive && <Nav close={() => setIsActive(!isActive)}/>}
    </AnimatePresence>
    </>
  )
}

export default Header