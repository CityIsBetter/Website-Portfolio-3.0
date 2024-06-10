import Head from 'next/head'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import Magnetic from '@/components/Magnetic'
import styles from './style.module.scss'
import Contact from '@/components/contact'
import Curve from '@/components/Curve'
import Work from './work'
import Line from '@/components/Line'

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
            <Line scolor={"#fff"} />
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