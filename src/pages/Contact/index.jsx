import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, useScroll, useTransform  } from 'framer-motion';

import styles from './style.module.scss'
import Curve from '@/components/Curve'
import Line from '@/components/Line';
import Magnetic from '@/components/Magnetic';

import Router from 'next/router'

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

const Contact = () => {

  const form = useRef();
  const container = useRef(null);
  const [msgSent, setMsgSent] = useState(false);
  const [msg, setMsg] = useState({user_name: "", user_email: "", user_message: ""});
  const [msgError, setMsgError] = useState({});

  const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setMsg({...msg, [name]: value});
  };

  const validate = (values) => {
    const errors = {};
    if(!values.user_name){
      errors.user_name = "Name is Required";
    }
    if(!values.user_email){
      errors.user_email = "Email is Required";
    }
    if(!values.user_message){
      errors.user_message = "Message is Required";
    }
    return errors
  }

  useEffect(() => {
    setMsgError(validate(msg));
  },[msg])

  const sendEmail = (e) => {
    e.preventDefault();

    if(Object.keys(msgError).length === 0){
      emailjs
      .sendForm('service_457jg5w', 'template_xv6tlzz', form.current, {
        publicKey: '9QqWaMd3w2zXLYjRy',
      })
      .then(
        () => {
          toast.success('Message Sent Successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          setMsgSent(true);
        },
        (error) => {
          toast.error('Issue while sending Message', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        },
      );
    } else{
      toast.error('Fill Required Fields', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  return (
    <>
    <Head>
        <title>Mahesh Paul | Contact | Portfolio</title>
        <meta name="description" content="Website Portfolio Made by Mahesh Paul J." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Curve>
    <main className={styles.main}>
      <div className={styles.contactContainer} ref={container}>
        <div className={styles.Heading}>
          <div className={styles.Title}>Let's Have a Chat Together</div>
          <Line scolor={"#eee"} w={.8}/>
          <motion.div style={{x}} className={styles.buttonContainer}>
            <Magnetic>
              <div className={styles.button}>
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4167 49.5834H15.95C12.9502 49.5834 11.4503 49.5834 10.3989 48.8195C10.0593 48.5728 9.76065 48.2741 9.51393 47.9346C8.75 46.8831 8.75 45.3832 8.75 42.3834V18.8667C8.75 15.867 8.75 14.3671 9.51393 13.3156C9.76065 12.976 10.0593 12.6774 10.3989 12.4307C11.4503 11.6667 12.9502 11.6667 15.95 11.6667H54.05C57.0498 11.6667 58.5497 11.6667 59.6011 12.4307C59.9407 12.6774 60.2394 12.976 60.4861 13.3156C61.25 14.3671 61.25 15.867 61.25 18.8668V42.3834C61.25 45.3832 61.25 46.8831 60.4861 47.9346C60.2394 48.2741 59.9407 48.5728 59.6011 48.8195C58.5497 49.5834 57.0498 49.5834 54.05 49.5834H35" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.4167 49.5833L17.5 58.3333L35 49.5833" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </div>
            </Magnetic>
          </motion.div>
        </div>
        {msgSent ? 
        <div className={styles.thanksContainer}>Thanks For Contacting!</div>
        :
        <form ref={form} onSubmit={sendEmail}>
          <div className={styles.labels}>
            <label>01 Name</label>
            {msgError.user_name !== undefined ? <label className={styles.error}>* Name is Required</label> : ""}
          </div>
          <Line scolor={"#57585A"} w={.8}/>
          <input type="text" name="user_name" placeholder='Mahesh Paul *' value={msg.user_name} onChange={handleChange} />
          <div className={styles.labels}>
            <label>02 Email</label>
            {msgError.user_email !== undefined ? <label className={styles.error}>* Email is Required</label> : ""}
          </div>
          <Line scolor={"#57585A"} w={.8}/>
          <input type="email" name="user_email" placeholder='mahesh.paul.j@gmail.com *' value={msg.user_email} onChange={handleChange} />
          <div className={styles.labels}>
            <label>03 Message</label>
            {msgError.user_message !== undefined ? <label className={styles.error}>* Message is Required</label> : ""}
          </div>
          <Line scolor={"#57585A"} w={.8}/>
          <textarea name="user_message" placeholder='Hello Mahesh Paul, *' value={msg.user_message} onChange={handleChange} />
          <div className={styles.sendContainer}>
          <Line scolor={"#57585A"} w={.8}/>
          <motion.div style={{x}} className={styles.buttonContainer}>
            <Magnetic>
              <input type="submit" value="Send" className={styles.button} />
            </Magnetic>
          </motion.div></div>
        </form>
        
        }
      </div>
      <div className={styles.info}>
        <div>
            <span>
                <h3>Version</h3>
                <p>2024 © Edition</p>
            </span>
        </div>
        <div>
            <span>
                <h3>socials</h3>
            <Magnetic>
                <a href='https://github.com/CityIsBetter/' target='_blank'>Github</a>
            </Magnetic>
            </span>
            <Magnetic>
                <a href='https://instagram.com/mahesh_paul_j' target='_blank'>Instagram</a>
            </Magnetic>
            <Magnetic>
                <a href=''>Discord</a>
            </Magnetic>
            <Magnetic>
                <a href='https://linkedin.com/in/mahesh-paul' target='_blank'>Linkedin</a>
            </Magnetic>
        </div>
      </div>
    </main>
    
    </Curve>
    <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="dark"
      />
    </>
  )
}

export default Contact