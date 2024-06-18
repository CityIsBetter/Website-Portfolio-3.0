import React, { useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useScroll, useTransform, motion, useInView } from 'framer-motion';
import gsap from "gsap";
import { slideUp } from '@/components/anim/anim';

import Router from 'next/router'
import Image from 'next/image'

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

const Landing = () => {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null)
    const container = useRef(null);
    const phraseContainer = useRef(null);

    const isPhraseInView = useInView(phraseContainer);

    const phrase = "Eager to learn and grow, I'm constantly exploring new technological frontiers to develop creative and impactful software projects.";
  
    let xPercent = 0;
    let direction = -1;
  
    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      requestAnimationFrame(animation);
  
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.05,
          start: 0,
          end: window.innerHeight,
          onUpdate: e => direction = e.direction * -1
        },
        x: "-500px",
      })
      requestAnimationFrame(animation)
    }, [])
  
    const animation = () => {
      if(xPercent <= -100){
        xPercent = 0
      }
      if(xPercent > 0){
        xPercent = -100
      }
      gsap.set(firstText.current, {xPercent: xPercent});
      gsap.set(secondText.current, {xPercent: xPercent});
      xPercent += 0.03 * direction;
      requestAnimationFrame(animation);
    };
  
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end start']
    });
  
    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "25vh"]);

    return (
    <main className={styles.Landing} ref={container}>
        <div className={styles.header_bg}> 
            <div >
                <motion.div style={{y}} className={styles.parallaxContainer}>
                    <Image src="/assets/profile.png" alt="profile picture" draggable={false}  fill={true} loading='eager'/>
                </motion.div>
            </div> 
            <svg width="184" height="80" viewBox="0 0 184 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.location}><path fillRule="evenodd" clipRule="evenodd" d="M-65 37.5C-65 16.7893 -48.2107 0 -27.5 0H146.5C167.211 0 184 16.7893 184 37.5V42.5C184 63.2107 167.211 80 146.5 80H-27.5C-48.2107 80 -65 63.2107 -65 42.5V37.5ZM18.48 36V21.8H21.24V33.58H28.48V36H18.48ZM34.6616 36.2C33.8082 36.2 33.0416 36.06 32.3616 35.78C31.6816 35.4867 31.1016 35.0867 30.6216 34.58C30.1549 34.0733 29.7949 33.4933 29.5416 32.84C29.2882 32.1867 29.1616 31.5 29.1616 30.78C29.1616 30.0467 29.2882 29.3533 29.5416 28.7C29.7949 28.0467 30.1549 27.4667 30.6216 26.96C31.1016 26.4533 31.6816 26.06 32.3616 25.78C33.0416 25.4867 33.8082 25.34 34.6616 25.34C35.5149 25.34 36.2749 25.4867 36.9416 25.78C37.6216 26.06 38.2016 26.4533 38.6816 26.96C39.1616 27.4667 39.5216 28.0467 39.7616 28.7C40.0149 29.3533 40.1416 30.0467 40.1416 30.78C40.1416 31.5 40.0149 32.1867 39.7616 32.84C39.5216 33.4933 39.1616 34.0733 38.6816 34.58C38.2149 35.0867 37.6416 35.4867 36.9616 35.78C36.2816 36.06 35.5149 36.2 34.6616 36.2ZM31.9216 30.78C31.9216 31.3933 32.0416 31.94 32.2816 32.42C32.5216 32.8867 32.8482 33.2533 33.2616 33.52C33.6749 33.7867 34.1416 33.92 34.6616 33.92C35.1682 33.92 35.6282 33.7867 36.0416 33.52C36.4549 33.24 36.7816 32.8667 37.0216 32.4C37.2749 31.92 37.4016 31.3733 37.4016 30.76C37.4016 30.16 37.2749 29.62 37.0216 29.14C36.7816 28.66 36.4549 28.2867 36.0416 28.02C35.6282 27.7533 35.1682 27.62 34.6616 27.62C34.1416 27.62 33.6749 27.76 33.2616 28.04C32.8482 28.3067 32.5216 28.68 32.2816 29.16C32.0416 29.6267 31.9216 30.1667 31.9216 30.78ZM46.8305 36.2C45.9771 36.2 45.2105 36.06 44.5305 35.78C43.8505 35.4867 43.2705 35.0867 42.7905 34.58C42.3105 34.06 41.9371 33.4733 41.6705 32.82C41.4171 32.1667 41.2905 31.48 41.2905 30.76C41.2905 29.7733 41.5105 28.8733 41.9505 28.06C42.4038 27.2333 43.0438 26.5733 43.8705 26.08C44.6971 25.5867 45.6771 25.34 46.8105 25.34C47.9438 25.34 48.9171 25.5867 49.7305 26.08C50.5438 26.5733 51.1505 27.22 51.5505 28.02L48.9305 28.82C48.7038 28.4333 48.4038 28.14 48.0305 27.94C47.6571 27.7267 47.2438 27.62 46.7905 27.62C46.2838 27.62 45.8171 27.7533 45.3905 28.02C44.9771 28.2733 44.6505 28.64 44.4105 29.12C44.1705 29.5867 44.0505 30.1333 44.0505 30.76C44.0505 31.3733 44.1705 31.92 44.4105 32.4C44.6638 32.8667 44.9971 33.24 45.4105 33.52C45.8238 33.7867 46.2838 33.92 46.7905 33.92C47.1105 33.92 47.4105 33.8667 47.6905 33.76C47.9838 33.6533 48.2438 33.5067 48.4705 33.32C48.6971 33.1333 48.8638 32.92 48.9705 32.68L51.5905 33.48C51.3505 34 50.9971 34.4667 50.5305 34.88C50.0771 35.2933 49.5371 35.62 48.9105 35.86C48.2971 36.0867 47.6038 36.2 46.8305 36.2ZM52.5195 32.9C52.5195 32.22 52.7062 31.6267 53.0795 31.12C53.4662 30.6 53.9995 30.2 54.6795 29.92C55.3595 29.64 56.1395 29.5 57.0195 29.5C57.4595 29.5 57.9062 29.5333 58.3595 29.6C58.8129 29.6667 59.2062 29.7733 59.5395 29.92V29.36C59.5395 28.6933 59.3395 28.18 58.9395 27.82C58.5529 27.46 57.9729 27.28 57.1995 27.28C56.6262 27.28 56.0795 27.38 55.5595 27.58C55.0395 27.78 54.4929 28.0733 53.9195 28.46L53.0595 26.7C53.7529 26.2467 54.4595 25.9067 55.1795 25.68C55.9129 25.4533 56.6795 25.34 57.4795 25.34C58.9729 25.34 60.1329 25.7133 60.9595 26.46C61.7995 27.2067 62.2195 28.2733 62.2195 29.66V33C62.2195 33.28 62.2662 33.48 62.3595 33.6C62.4662 33.72 62.6329 33.7933 62.8595 33.82V36C62.6195 36.04 62.3995 36.0733 62.1995 36.1C62.0129 36.1267 61.8529 36.14 61.7195 36.14C61.1862 36.14 60.7795 36.02 60.4995 35.78C60.2329 35.54 60.0662 35.2467 59.9995 34.9L59.9395 34.36C59.4862 34.9467 58.9195 35.4 58.2395 35.72C57.5595 36.04 56.8662 36.2 56.1595 36.2C55.4662 36.2 54.8395 36.06 54.2795 35.78C53.7329 35.4867 53.2995 35.0933 52.9795 34.6C52.6729 34.0933 52.5195 33.5267 52.5195 32.9ZM59.0395 33.44C59.1862 33.28 59.3062 33.12 59.3995 32.96C59.4929 32.8 59.5395 32.6533 59.5395 32.52V31.46C59.2195 31.3267 58.8729 31.2267 58.4995 31.16C58.1262 31.08 57.7729 31.04 57.4395 31.04C56.7462 31.04 56.1729 31.1933 55.7195 31.5C55.2795 31.7933 55.0595 32.1867 55.0595 32.68C55.0595 32.9467 55.1329 33.2 55.2795 33.44C55.4262 33.68 55.6395 33.8733 55.9195 34.02C56.1995 34.1667 56.5329 34.24 56.9195 34.24C57.3195 34.24 57.7129 34.1667 58.0995 34.02C58.4862 33.86 58.7995 33.6667 59.0395 33.44ZM70.9062 35.46C70.6796 35.5533 70.4062 35.66 70.0863 35.78C69.7663 35.9 69.4196 35.9933 69.0462 36.06C68.6862 36.14 68.3196 36.18 67.9462 36.18C67.4529 36.18 66.9996 36.0933 66.5862 35.92C66.1729 35.7467 65.8396 35.4733 65.5862 35.1C65.3463 34.7133 65.2263 34.2133 65.2263 33.6V27.58H63.8463V25.52H65.2263V22.12H67.9062V25.52H70.1062V27.58H67.9062V32.7C67.9196 33.06 68.0196 33.32 68.2063 33.48C68.3929 33.64 68.6263 33.72 68.9062 33.72C69.1862 33.72 69.4596 33.6733 69.7263 33.58C69.9929 33.4867 70.2063 33.4067 70.3663 33.34L70.9062 35.46ZM77.0448 36.2C76.2048 36.2 75.4448 36.06 74.7648 35.78C74.0848 35.4867 73.5048 35.0933 73.0248 34.6C72.5448 34.0933 72.1715 33.52 71.9048 32.88C71.6515 32.2267 71.5248 31.54 71.5248 30.82C71.5248 29.82 71.7448 28.9067 72.1848 28.08C72.6382 27.2533 73.2782 26.5933 74.1048 26.1C74.9448 25.5933 75.9315 25.34 77.0648 25.34C78.2115 25.34 79.1915 25.5933 80.0048 26.1C80.8182 26.5933 81.4382 27.2533 81.8648 28.08C82.3048 28.8933 82.5248 29.7733 82.5248 30.72C82.5248 30.88 82.5182 31.0467 82.5048 31.22C82.4915 31.38 82.4782 31.5133 82.4648 31.62H74.3648C74.4182 32.1533 74.5715 32.62 74.8248 33.02C75.0915 33.42 75.4249 33.7267 75.8248 33.94C76.2382 34.14 76.6782 34.24 77.1448 34.24C77.6782 34.24 78.1782 34.1133 78.6448 33.86C79.1248 33.5933 79.4515 33.2467 79.6248 32.82L81.9249 33.46C81.6715 33.9933 81.3048 34.4667 80.8248 34.88C80.3582 35.2933 79.8048 35.62 79.1648 35.86C78.5248 36.0867 77.8182 36.2 77.0448 36.2ZM74.3048 29.92H79.7849C79.7315 29.3867 79.5782 28.9267 79.3248 28.54C79.0848 28.14 78.7648 27.8333 78.3648 27.62C77.9648 27.3933 77.5182 27.28 77.0248 27.28C76.5448 27.28 76.1048 27.3933 75.7048 27.62C75.3182 27.8333 74.9982 28.14 74.7448 28.54C74.5048 28.9267 74.3582 29.3867 74.3048 29.92ZM83.5175 30.76C83.5175 29.7467 83.7175 28.8333 84.1175 28.02C84.5175 27.1933 85.0708 26.54 85.7775 26.06C86.4842 25.58 87.2908 25.34 88.1975 25.34C88.9708 25.34 89.6642 25.5333 90.2775 25.92C90.9042 26.2933 91.3908 26.7733 91.7375 27.36V21.4H94.4175V33C94.4175 33.28 94.4642 33.48 94.5575 33.6C94.6508 33.72 94.8108 33.7933 95.0375 33.82V36C94.5708 36.0933 94.1908 36.14 93.8975 36.14C93.4175 36.14 93.0175 36.02 92.6975 35.78C92.3908 35.54 92.2175 35.2267 92.1775 34.84L92.1375 34.18C91.7508 34.8333 91.2242 35.3333 90.5575 35.68C89.9042 36.0267 89.2175 36.2 88.4975 36.2C87.7775 36.2 87.1108 36.06 86.4975 35.78C85.8975 35.5 85.3708 35.1133 84.9175 34.62C84.4775 34.1267 84.1308 33.5533 83.8775 32.9C83.6375 32.2333 83.5175 31.52 83.5175 30.76ZM91.7375 32.16V29.66C91.6042 29.2733 91.3908 28.9267 91.0975 28.62C90.8042 28.3133 90.4775 28.0733 90.1175 27.9C89.7575 27.7133 89.3975 27.62 89.0375 27.62C88.6242 27.62 88.2508 27.7067 87.9175 27.88C87.5842 28.0533 87.2908 28.2867 87.0375 28.58C86.7975 28.8733 86.6108 29.2133 86.4775 29.6C86.3575 29.9867 86.2975 30.3933 86.2975 30.82C86.2975 31.2467 86.3642 31.6533 86.4975 32.04C86.6442 32.4133 86.8508 32.74 87.1175 33.02C87.3842 33.3 87.6908 33.52 88.0375 33.68C88.3975 33.84 88.7842 33.92 89.1975 33.92C89.4508 33.92 89.7042 33.88 89.9575 33.8C90.2242 33.7067 90.4708 33.5867 90.6975 33.44C90.9375 33.28 91.1442 33.0933 91.3175 32.88C91.5042 32.6533 91.6442 32.4133 91.7375 32.16ZM18.22 59V48.52H20.9V59H18.22ZM18.22 47.06V44.4H20.9V47.06H18.22ZM33.0577 59H30.3777V53.12C30.3777 52.28 30.231 51.6667 29.9377 51.28C29.6443 50.8933 29.2377 50.7 28.7177 50.7C28.3577 50.7 27.991 50.7933 27.6177 50.98C27.2577 51.1667 26.931 51.4267 26.6377 51.76C26.3443 52.08 26.131 52.4533 25.9977 52.88V59H23.3177V48.52H25.7377V50.46C26.0043 50.0067 26.3443 49.6267 26.7577 49.32C27.171 49 27.6443 48.76 28.1777 48.6C28.7243 48.4267 29.2977 48.34 29.8977 48.34C30.551 48.34 31.0843 48.46 31.4977 48.7C31.9243 48.9267 32.2443 49.24 32.4577 49.64C32.6843 50.0267 32.8377 50.4667 32.9177 50.96C33.011 51.4533 33.0577 51.9533 33.0577 52.46V59ZM40.4527 59V44.8H43.2127V59H40.4527ZM55.6553 59H52.9753V53.12C52.9753 52.28 52.8286 51.6667 52.5353 51.28C52.242 50.8933 51.8353 50.7 51.3153 50.7C50.9553 50.7 50.5886 50.7933 50.2153 50.98C49.8553 51.1667 49.5286 51.4267 49.2353 51.76C48.942 52.08 48.7286 52.4533 48.5953 52.88V59H45.9153V48.52H48.3353V50.46C48.602 50.0067 48.942 49.6267 49.3553 49.32C49.7686 49 50.242 48.76 50.7753 48.6C51.322 48.4267 51.8953 48.34 52.4953 48.34C53.1486 48.34 53.682 48.46 54.0953 48.7C54.522 48.9267 54.842 49.24 55.0553 49.64C55.282 50.0267 55.4353 50.4667 55.5153 50.96C55.6086 51.4533 55.6553 51.9533 55.6553 52.46V59ZM57.3456 53.76C57.3456 52.7467 57.5456 51.8333 57.9456 51.02C58.3456 50.1933 58.899 49.54 59.6056 49.06C60.3123 48.58 61.119 48.34 62.0256 48.34C62.799 48.34 63.4923 48.5333 64.1056 48.92C64.7323 49.2933 65.219 49.7733 65.5656 50.36V44.4H68.2456V56C68.2456 56.28 68.2923 56.48 68.3856 56.6C68.479 56.72 68.639 56.7933 68.8656 56.82V59C68.399 59.0933 68.019 59.14 67.7256 59.14C67.2456 59.14 66.8456 59.02 66.5256 58.78C66.219 58.54 66.0456 58.2267 66.0056 57.84L65.9656 57.18C65.579 57.8333 65.0523 58.3333 64.3856 58.68C63.7323 59.0267 63.0456 59.2 62.3256 59.2C61.6056 59.2 60.939 59.06 60.3256 58.78C59.7256 58.5 59.199 58.1133 58.7456 57.62C58.3056 57.1266 57.959 56.5533 57.7056 55.9C57.4656 55.2333 57.3456 54.52 57.3456 53.76ZM65.5656 55.16V52.66C65.4323 52.2733 65.219 51.9267 64.9256 51.62C64.6323 51.3133 64.3056 51.0733 63.9456 50.9C63.5856 50.7133 63.2256 50.62 62.8656 50.62C62.4523 50.62 62.079 50.7067 61.7456 50.88C61.4123 51.0533 61.119 51.2867 60.8656 51.58C60.6256 51.8733 60.439 52.2133 60.3056 52.6C60.1856 52.9867 60.1256 53.3933 60.1256 53.82C60.1256 54.2466 60.1923 54.6533 60.3256 55.04C60.4723 55.4133 60.679 55.74 60.9456 56.02C61.2123 56.3 61.519 56.52 61.8656 56.68C62.2256 56.84 62.6123 56.92 63.0256 56.92C63.279 56.92 63.5323 56.88 63.7856 56.8C64.0523 56.7067 64.299 56.5867 64.5256 56.44C64.7656 56.28 64.9723 56.0933 65.1456 55.88C65.3323 55.6533 65.4723 55.4133 65.5656 55.16ZM70.8763 48.52H73.5562V59H70.8763V48.52ZM70.8763 47.06V44.4H73.5562V47.06H70.8763ZM75.2539 55.9C75.2539 55.22 75.4406 54.6266 75.8139 54.12C76.2006 53.6 76.7339 53.2 77.4139 52.92C78.0939 52.64 78.8739 52.5 79.7539 52.5C80.1939 52.5 80.6406 52.5333 81.0939 52.6C81.5472 52.6667 81.9406 52.7733 82.2739 52.92V52.36C82.2739 51.6933 82.0739 51.18 81.6739 50.82C81.2872 50.46 80.7072 50.28 79.9339 50.28C79.3606 50.28 78.8139 50.38 78.2939 50.58C77.7739 50.78 77.2272 51.0733 76.6539 51.46L75.7939 49.7C76.4872 49.2467 77.1939 48.9067 77.9139 48.68C78.6472 48.4533 79.4139 48.34 80.2139 48.34C81.7072 48.34 82.8672 48.7133 83.6939 49.46C84.5339 50.2067 84.9539 51.2733 84.9539 52.66V56C84.9539 56.28 85.0006 56.48 85.0939 56.6C85.2006 56.72 85.3672 56.7933 85.5939 56.82V59C85.3539 59.04 85.1339 59.0733 84.9339 59.1C84.7472 59.1266 84.5872 59.14 84.4539 59.14C83.9206 59.14 83.5139 59.02 83.2339 58.78C82.9672 58.54 82.8006 58.2466 82.7339 57.9L82.6739 57.36C82.2206 57.9467 81.6539 58.4 80.9739 58.72C80.2939 59.04 79.6006 59.2 78.8939 59.2C78.2006 59.2 77.5739 59.06 77.0139 58.78C76.4672 58.4867 76.0339 58.0933 75.7139 57.6C75.4072 57.0933 75.2539 56.5267 75.2539 55.9ZM81.7739 56.44C81.9206 56.28 82.0406 56.12 82.1339 55.96C82.2272 55.8 82.2739 55.6533 82.2739 55.52V54.46C81.9539 54.3267 81.6072 54.2267 81.2339 54.16C80.8606 54.08 80.5072 54.04 80.1739 54.04C79.4806 54.04 78.9072 54.1934 78.4539 54.5C78.0139 54.7933 77.7939 55.1866 77.7939 55.68C77.7939 55.9467 77.8672 56.2 78.0139 56.44C78.1606 56.68 78.3739 56.8734 78.6539 57.02C78.9339 57.1667 79.2672 57.24 79.6539 57.24C80.0539 57.24 80.4472 57.1667 80.8339 57.02C81.2206 56.86 81.5339 56.6667 81.7739 56.44ZM144 65C157.807 65 169 53.8071 169 40C169 26.1929 157.807 15 144 15C130.193 15 119 26.1929 119 40C119 53.8071 130.193 65 144 65Z" fill="#2B2B2B"/><path d="M144 55C152.284 55 159 48.2843 159 40C159 31.7157 152.284 25 144 25C135.716 25 129 31.7157 129 40C129 48.2843 135.716 55 144 55Z" stroke="white" strokeWidth="3.22775"/><path d="M141.883 48.5383L142.433 48.7883C143.158 49.1217 143.617 49.7983 143.617 50.5417C143.617 51.6233 145.318 53.75 146.5 53.75C150.067 53.75 151.413 53.6167 154 51.25C154.458 50.83 155.25 49.345 155.25 48.75C155.25 47.5117 152.905 46.16 151.552 46.16H151.403C149.97 46.16 148.808 45.0967 148.808 43.7833V42.99C148.808 41.24 147.258 39.8217 145.347 39.8217H140.153C139.198 39.8217 138.423 39.1117 138.423 38.2367C138.423 37.3617 139.198 36.6517 140.153 36.6517H141.44C142.642 36.6517 143.615 35.76 143.615 34.66V34.4033C143.615 33.17 144.935 32.3 146.212 32.69C147.488 33.0783 148.808 32.2083 148.808 30.9767V30.4933C148.808 29.5533 147.795 26.9467 146.78 26.3583C146.607 26.2583 146.398 26.25 146.197 26.25H143.053C142.852 26.2464 142.65 26.2319 142.45 26.2067C140.847 26.0283 139.14 26.7367 137.75 27.5L134 30C132.405 30.8767 131.5 32.94 131.5 34.6433C131.5 35.9283 132.058 37.1617 133.05 38.0717L139.172 43.6767C139.8 44.2517 140.155 45.0333 140.155 45.8483V45.9733C140.155 47.06 140.823 48.0517 141.885 48.5383H141.883Z" fill="white"/></svg>
        </div>
      <div className={styles.phraseContainer} >
        <svg className={styles.phraseSvg} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L31 31M31 31V1M31 31H1" stroke="black"/></svg>
          <div className={styles.phrase} >
            <p ref={phraseContainer}>{
              phrase.split(" ").map( (word, index) => {
                return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isPhraseInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                })
              }
            </p>
          </div>
      </div>
        <div className={styles.sliderContainer}>
            <div ref={slider} className={styles.slider}>
                <p ref={firstText}>Student ∘ Developer ∘ Tech Enthusiast ∘ </p>
                <p ref={secondText}>Student ∘ Developer ∘ Tech Enthusiast ∘ </p>
            </div>
        </div>
    </main>
  )
}

export default Landing