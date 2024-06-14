import React, { useState } from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import Magnetic from '../Magnetic'
import Nav from '../nav'
import { AnimatePresence } from 'framer-motion'

const Navbar = () => {

  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
          <div className={styles.logo}>
            <Link href='/'><img alt="logo" src="/assets/Logo.png" draggable={false} /></Link>
          </div>
          <div className={styles.nav}>
          <Magnetic><div className={styles.el}>
                <Link href='/'>Home</Link>
                <div className={styles.indicator}></div>
            </div></Magnetic>
            <Magnetic><div className={styles.el}>
              <Link href='/About'>About</Link>
                <div className={styles.indicator}></div>
            </div></Magnetic>
            <Magnetic><div className={styles.el}>
                <Link href='/Works'>Works</Link>
                <div className={styles.indicator}></div>
            </div></Magnetic>
            <Magnetic><div className={styles.el}>
                <Link href='/Contact'>Contact</Link>
                <div className={styles.indicator}></div>
            </div></Magnetic>
          </div>
          <Magnetic>
              <div className={styles.menuButton} onClick={() => setIsActive(!isActive)}>
                <div className={styles.el}>Menu<div className={styles.indicator}></div></div>
              </div>
            </Magnetic>
            <AnimatePresence mode='wait'>
            { isActive && <Nav />}</AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar