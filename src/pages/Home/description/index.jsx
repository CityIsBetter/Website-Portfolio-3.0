import React, { forwardRef } from 'react'
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { slideUp } from './anim';
import Line from '@/components/Line';
import Magnetic from '@/components/Magnetic';
import Link from 'next/link';


const Description = forwardRef(function index(props, ref) {

  const phraseA = "CSE student at SRM University, Kattankulathur with a passion for technology. Possesses strong foundational skills in Python, C, and web development gained through coursework and personal projects. ";
  const phraseW = "I dive into web development, Python, Java, C and Database projects with enthusiasm, driven by my own curiosity and passion for technology. My goal is to continuously learn and innovate, creating impactful solutions through my projects.";
  
  const descriptionA = useRef(null);
  const descriptionW = useRef(null);

  const isAInView = useInView(descriptionA);
  const isWInView = useInView(descriptionW);

  return (
    <div className={styles.description} >
        <div className={styles.content}>
          <div ref={descriptionA} className={styles.contentAbout}>
            <p>
            {
              phraseA.split(" ").map( (word, index) => {
                  return <span className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isAInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
              })
            }
            </p>
            <div data-scroll data-scroll-speed={0.1}>
              
              <Link href={"/About"}><Magnetic><div ref={ref} className={styles.button}>About Me</div></Magnetic></Link>
            </div>
          </div>
          <Line scolor={`#000`} />
          <div ref={descriptionW} className={styles.contentWorks}>
            <div data-scroll data-scroll-speed={0.1}>
              <Link href={"/Works"}><Magnetic><div ref={ref} className={styles.button}>My Works</div></Magnetic> </Link>             
            </div>            <p>{
              phraseW.split(" ").map( (word, index) => {
                  return <span className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isWInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
              })
            }</p>
          </div>
        </div>
    </div>
  )
}
)
export default Description