'use client';
import React, { useLayoutEffect, useState, useRef } from 'react'
import styles from './style.module.scss'
import Nav from '../nav'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Header = () => {

    const [isActive, setIsActive] = useState(false);
    const burger = useRef(null)

    useLayoutEffect(() => {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 700px)", () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(burger.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: 200,
          onLeave: () => {gsap.to(burger.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
          onEnterBack: () => {gsap.to(burger.current, {scale: 0, duration: 0.25, ease: "power1.out"})}
        }
      })});
    }, [])

  return (
    <>
      <div ref={burger} onClick={() => setIsActive(!isActive)} className={styles.button}>
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`} ></div>
      </div>
    <AnimatePresence mode='wait'>
    {isActive && <Nav close={() => setIsActive(!isActive)}/>}
    </AnimatePresence>
    </>
  )
}

export default Header