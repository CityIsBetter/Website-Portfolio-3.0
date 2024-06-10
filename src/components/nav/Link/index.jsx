import React from 'react'
import styles from "./style.module.scss"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slide, scale } from '../../header/anim.js';
import Magnetic from '@/components/Magnetic';

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