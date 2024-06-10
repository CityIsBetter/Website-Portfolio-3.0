import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import Magnetic from '../Magnetic'

const Navbar = () => {
  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
          <div className={styles.logo}>
            <Link href='/'><img alt="logo" src="/assets/logo.png" draggable={false} /></Link>
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
      </div>
    </div>
  )
}

export default Navbar