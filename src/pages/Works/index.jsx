import Head from 'next/head'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import Magnetic from '@/components/Magnetic'
import styles from './style.module.scss'
import Contact from '@/components/contact'
import Curve from '@/components/Curve'
import Work from './work'
import Line from '@/components/Line'

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

const Works = () => {

  const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["end start", "start end"]
    })

    const x = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
    <Head>
        <title>Mahesh Paul | Works | Portfolio</title>
        <meta name="description" content="Website Portfolio Made by Mahesh Paul J." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Curve backgroundColor={"#a7a6ba"}>
      <main className={styles.main} ref={container}>
        <div className={styles.worksContainer}>
            <div className={styles.worksTitle}>Developing Innovative Ideas<br/> and Projects</div>
            <motion.div style={{x}} className={styles.buttonContainer}>
            <Magnetic>
              <div className={styles.button}>
                <svg width="103" height="74" viewBox="0 0 103 74" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M69.0909 1L34.7273 73M83 18.1818L101 36.1818L83 54.1818M20 18.1818L2 36.1818L20 54.1818" stroke="white" stroke-width="2"/></svg>
              </div>
            </Magnetic>
          </motion.div>
            <Line scolor={"#fff"} w={.8}/>
            <div className={styles.scrolldown}>
                <div className={styles.chevrons}>
                    <div className={styles.chevrondown}></div>
                    <div className={styles.chevrondown}></div>
                </div>
            </div>
        </div>
        <Work />
      </main>
      <Contact />
      </Curve>
    </>
  )
}

export default Works