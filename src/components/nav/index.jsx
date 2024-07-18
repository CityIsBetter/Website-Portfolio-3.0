import React, { useState } from 'react'
import styles from './style.module.scss'
import Rlink from './Link'
import { motion } from 'framer-motion';
import Magnetic from '@/components/Magnetic';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../header/anim';

import Router from 'next/router'

export const fixTimeoutTransition = (timeout) => {
  Router.events.on('beforeHistoryChange', () => {
    // Create a clone of every <style> and <link> that currently affects the page. It doesn't matter
    // if Next.js is going to remove them or not since we are going to remove the copies ourselves
    // later on when the transition finishes.
    const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])')
    const copies = [...nodes].map((el) => el.cloneNode(true))

    for (let copy of copies) {
      // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
      // change process.
      copy.removeAttribute('data-n-p')
      copy.removeAttribute('data-n-href')

      // Add duplicated nodes to the DOM.
      document.head.appendChild(copy)
    }

    const handler = () => {
      // Emulate a `.once` method using `.on` and `.off`
      Router.events.off('routeChangeComplete', handler)

      window.setTimeout(() => {
        for (let copy of copies) {
          // Remove previous page's styles after the transition has finalized.
          document.head.removeChild(copy)
        }
      }, timeout)
    }

    Router.events.on('routeChangeComplete', handler)
  })
}

fixTimeoutTransition(1000)

const navItems = [
    {
        title: "Home",
        href: "/"
    }, 
    {
        title: "About",
        href: "/About"
    },
    {
        title:"Works",
        href: "/Works"
    },
    {
        title:"Contact",
        href:"/Contact"
    }
]

const Nav = ({close}) => {

    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);
    
  return (
    <motion.div
    variants={menuSlide} 
    initial="initial" 
    animate="enter" 
    exit="exit" 
    className={styles.menu}>
        <div className={styles.body}>
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                <div className={styles.header}>
                    <p>Navigation</p>
                </div>
                    {
                        navItems.map((item, index) => {
                            return <Rlink key={index} data={{...item, index}} isActive={selectedIndicator == item.href} setSelectedIndicator={setSelectedIndicator} Click={close}/>
                        }) 
                    }            
            </div>
            <div className={styles.footer}>
                <Magnetic><a href='https://github.com/CityIsBetter/' target='_blank'>Github</a></Magnetic>
                <Magnetic><a href='https://instagram.com/mahesh_paul_j' target='_blank'>Instagram</a></Magnetic>
                <Magnetic><a href='https://discordapp.com/users/509270434303311872' target='_blank'>Discord</a></Magnetic>
                <Magnetic><a href='https://linkedin.com/in/mahesh-paul' target='_blank'>LinkedIn</a></Magnetic>   
            </div>
        </div>
    </motion.div>
  )
}

export default Nav