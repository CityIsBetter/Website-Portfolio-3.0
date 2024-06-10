"use client";
import React, { useRef } from 'react'
import styles from './style.module.scss'
import { Parallax } from 'react-parallax'
import { useScroll, motion, useTransform } from 'framer-motion'

import Line from '@/components/Line';
import Magnetic from '@/components/Magnetic';

const projects = [
    {
        title: "AcademiaHub",
        desc:"AcademiaHUB: Bunk management, Reminders, and CGPA calculator. Your all-in-one website, seamlessly connected to your Google account for on-the-go accessibility.",
        info: "UI / Web Dev",
        lang: "Html JavaScript CSS",
        bg: "/assets/mockups/weather.png",
        git: "https://github.com",
        site: "https://academiahub.netlify.app/"
    },
    {
        title: "Portfolio 2.0",
        desc:"AcademiaHUB: Bunk management, Reminders, and CGPA calculator. Your all-in-one website, seamlessly connected to your Google account for on-the-go accessibility.",
        lang: "Html JavaScript CSS",
        bg: "/assets/mockups/weatherApp.png"
    },
    {
        title: "MangaScraper",
        desc:"Manga Scraping Tool made in python, It fetches the manga page from the website and downloads it in JPG format and saves it locally. This is basically web Scraping",
        lang: "Html JavaScript CSS",
        bg: "/assets/mockups/mangaScraper.png"
    },
    {
        title: "Portfolio 2.0",
        desc:"AcademiaHUB: Bunk management, Reminders, and CGPA calculator. Your all-in-one website, seamlessly connected to your Google account for on-the-go accessibility.",
        lang: "Html JavaScript CSS",
        bg: "/assets/mockups/maze.png"
    },
    
];
const snapConfig = {
    scrollSnapDestination: "0% 90%",
    scrollTimeout: 100,
    scrollTime: 300
  };

const Work = () => {

    const container = useRef(null);


    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

    
  return (
    <div className={styles.workMain}>
        {/* <div className={styles.container}>
        {
            projects.map((work, index) => {
                return index % 2 === 0 ? <Parallax strength={600} bgImage={work.bg} className={styles.container} >
                    <div className={styles.workContainer}>
                        <div className={styles.info}>
                            <div className={styles.index}>{ "0" + (index + 1)}</div>
                            <p>{work.info}</p>
                        </div>
                        <div className={styles.LworkDesc}>
                            <div className={styles.workTitle}>
                                {work.title}
                            </div>
                            <div className={styles.line}><Line scolor={"#000"} /></div>
                            {work.desc}
                            <div className={styles.workLang}>
                                {
                                    work.lang.split(" ").map((lang, index)=>{
                                    return <Magnetic><div className={styles.lang}>{lang}</div></Magnetic> 
                                    })
                                }
                            </div> 
                        </div>
                        <div className={styles.url}>
                            <Magnetic><a href={work.git} target='_blank'>Github</a></Magnetic>
                            
                            {work.site && <Magnetic><a href={work.site} target='_blank'>View Site</a></Magnetic>}
                        </div>
                    </div>
                </Parallax> :<Parallax strength={600} bgImage={work.bg} className={styles.container} >
                    <div className={styles.workContainer}>
                        <div className={styles.info}>
                            <div className={styles.index}>{ "0" + (index + 1)}</div>
                            <p>{work.info}</p>
                        </div>
                        <div className={styles.RworkDesc}>
                            <div className={styles.workTitle}>
                                {work.title}
                            </div>
                            <div className={styles.line}><Line scolor={"#000"} /></div>
                            {work.desc}
                            <div className={styles.workLang}>
                                {
                                    work.lang.split(" ").map((lang, index)=>{
                                    return <Magnetic><div className={styles.lang}>{lang}</div></Magnetic> 
                                    })
                                }
                            </div> 
                        </div>
                        <div className={styles.url}>
                            <Magnetic><a href={work.git} target='_blank'>Github</a></Magnetic>
                            
                            {work.site && <Magnetic><a href={work.site} target='_blank'>View Site</a></Magnetic>}
                        </div>
                    </div>
                </Parallax>
            })
        }
        </div> */}
        <div className={styles.container}>
            <div className={styles.workContainer}>
            {projects.map((work, index) => {
                return <div className={styles.workItem}>
                    <img src={work.bg} draggable={false}/>
                    <div className={styles.workDetails}>
                        <p className={styles.workTitle}>{work.title}</p>
                        <p className={styles.workDesc}>{work.desc}</p>
                        <div className={styles.workFooter}>
                            <div className={styles.langs}>
                                {
                                    work.lang.split(" ").map((lang, index)=>{
                                    return <Magnetic><div className={styles.lang}>{lang}</div></Magnetic> 
                                    })
                                }
                            </div>
                            <div className={styles.links}><Magnetic><a href={work.git}>Github</a></Magnetic>{work.site &&<Magnetic><a href={work.site}>View Site</a></Magnetic>}</div>
                        </div>
                    </div>
                </div>
                }
            )}
            </div>
        </div>
        <div className={styles.moreWorks}>
            <Magnetic><div className={styles.archBtn}>Archive</div></Magnetic>
        </div>
        <motion.div style={{height}} className={styles.circleContainer}>
                <div className={styles.circle}></div>
        </motion.div>
    </div>
  )
}

export default Work