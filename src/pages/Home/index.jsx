import React from 'react';
import Head from 'next/head';

import Landing from './Landing';
import Description from './description';
import Slider from '@/components/slider';
import Contact from '@/components/contact';
import Curve from '@/components/Curve';

const Main = () => {
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
  )
}

export default Main