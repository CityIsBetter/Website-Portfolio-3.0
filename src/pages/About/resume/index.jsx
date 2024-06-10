'use client';
import React, { useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'

import styles from './style.module.scss'
import Line from '@/components/Line'
import Magnetic from '@/components/Magnetic'

const Resume = () => {

  const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.resume}>
      <div className={styles.resumeContainer}>
        <div className={styles.title}>The Resume</div>
        <Line scolor={"#000"} w={.8}/>
          <div className={styles.resumeText}>
            <p>Tech Enthusiast CS <span>student</span> at SRM University, Kattankulathur with a passion for technology. Possesses strong foundational skills in
            <span> Python, Java, C, C++,  Web Development(HTML, JS, CSS, ReactJS, NodeJS, NextJS)</span> and <span>AI/ML</span> gained through coursework and personal projects.</p>
            <div className="" data-scroll data-scroll-speed={0.05}>
            <Magnetic>
              <div backgroundColor={"#334BD3"} className={styles.button} >Resume</div>
            </Magnetic></div>
          </div>
          <div className={styles.skillText}>
            <p className={styles.subTitle}>01 Skills</p>
            <Line scolor={"#000"} w={.8}/>
            <table>
              <td>
                <tr>Python</tr>
                <tr>C</tr>
                <tr>C++</tr>
                <tr>Java</tr>
              </td>
              <td>
                <tr>HTML</tr>
                <tr>CSS/SCSS</tr>
                <tr>JavaScript</tr>
              </td>
              <td>
                <tr>ReactJS</tr>
                <tr>NodeJS</tr>
                <tr>NextJS</tr>
                <tr>TailwindCSS</tr>
              </td>
              <td>
                <tr>MySQL</tr>
                <tr>Oracle SQL</tr>
                <tr>Firebase</tr>
              </td>
              <td>
                <tr>Git</tr>
                <tr>Vercel</tr>
                <tr>Netlify</tr>
                <tr>MATLAB</tr>
              </td>
            </table>
          </div>
          <div className={styles.skillText}>
            <p className={styles.subTitle}>02 Certifications</p>
            <Line scolor={"#000"} w={.8}/>
            <table>
              <td>
                <tr>Python for Data Science</tr>
                <tr>Programming in Java</tr>
                <tr>Introduction to Database System</tr>
                <tr>AWS Certified Machine Learning</tr>
                <tr>Digital Image Processing</tr>
                <tr>COmputer Visual Essentials</tr>
                <tr>Image Processing Onramp</tr>
                <tr>MATLAB Onramp</tr>
              </td>
              <td>
                <tr>NPTEL</tr>
                <tr>NPTEL</tr>
                <tr>NPTEL</tr>
                <tr>Amazon Web Services</tr>
                <tr>Great Learning</tr>
                <tr>Great Learning</tr>
                <tr>MathWorks</tr>
                <tr>MathWorks</tr>
              </td>
              <td>
                <tr>2023</tr>
                <tr>2023</tr>
                <tr>2024</tr>
                <tr>2024</tr>
                <tr>2024</tr>
                <tr>2024</tr>
                <tr>2024</tr>
                <tr>2024</tr>
              </td>
            </table>
            <p className={styles.proofText}>proofs in my <a href='https://www.linkedin.com/in/mahesh-paul/details/certifications/' target='_blank'>LinkedIn <svg width="12" height="12" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 24.5L24.5 1M24.5 1V24.5M24.5 1H1" stroke="black" stroke-width="2"/></svg></a></p>
          </div>
      </div>
      <motion.div style={{height}} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  )
}

export default Resume