'use client';
import Head from "next/head";

import Description from "./Home/description";
import Slider from "@/components/slider";
import Contact from "@/components/contact";
import Landing from "./Home/Landing";
import Navbar from "@/components/navbar";

import Curve from "@/components/Curve";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mahesh Paul | Portfolio</title>
        <meta name="description" content="Website Portfolio Made by Mahesh Paul J." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Curve>
          <Landing />
          <Description />
          <Slider />
          <Contact/>
      </Curve>
    </>
  );
}