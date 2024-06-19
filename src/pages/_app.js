'use client';
import "@/styles/globals.css";
import "@/styles/styles.scss";

import Navbar from "@/components/navbar";
import Preloader from "@/components/Preloader";
import Header from "@/components/header";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


export default function App({ Component, pageProps, router }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
      (
        async () => {
            setTimeout( () => {
              setIsLoading(false);
              document.body.style.cursor = 'default'
              window.scrollTo(0,0);
            }, 2000)
        }
      )()
    }, [])

  useEffect(() => {
    let scroll;
    import("locomotive-scroll").then((locomotiveModule) => {
        scroll = new locomotiveModule.default({
            el: document.querySelector("[data-scroll-container]"),
            smooth: true,
            smoothMobile: false,
            resetNativeScroll: true
        });
    }, []);

    // `useEffect`'s cleanup phase
    return () => {
        if (scroll) scroll.destroy();
    }
  });

  return(
  <>
    {/* <AnimatePresence mode="wait">
      {isLoading && <Preloader />}
    </AnimatePresence> */}
    <Navbar />
    <Header />
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
    <Analytics/>
    <SpeedInsights/>
  </>
  )
}