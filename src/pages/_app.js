import "@/styles/globals.css";
import "@/styles/styles.scss";
import Head from "next/head";

import Navbar from "@/components/navbar";
import Preloader from "@/components/Preloader";
import Header from "@/components/header";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";


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
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
    </Head>
    <AnimatePresence mode="wait">
      {isLoading && <Preloader />}
    </AnimatePresence>
    <Navbar />
    <Header />
    <AnimatePresence mode="wait">
    <Component key={router.route} {...pageProps} /></AnimatePresence>
  </>
  )
}