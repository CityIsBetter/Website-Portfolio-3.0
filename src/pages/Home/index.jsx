import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion';
import Head from 'next/head';

import styles from './styles.module.scss';
import Landing from './Landing';
import Description from './description';
import Slider from '@/components/slider';
import Contact from '@/components/contact';
import Curve from '@/components/Curve';

const Main = () => {

  const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  return (
    <>
      <Head>
        <title>Mahesh Paul | Portfolio</title>
        <meta name="description" content="Website Portfolio Made by Mahesh Paul J." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Curve>
        <main className={styles.main}>
          <Landing /> 
          <Description />
          <Slider />
          <motion.div style={{height}} className={styles.circleContainer}>
            <div className={styles.circle}></div>
          </motion.div>
          <Contact/></main>
      </Curve>
    </>
  )
}

export default Main