"use client";
import styles from "./page.module.css";
import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.gif";
import Chat from "../app/components/chatRegion.js";

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
         <Chat/>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.titleRegion}>
          <Image
            src={logo}
            className={styles.logo}
            width={100}
            height={100}
            alt="logo"
          />
          <div className={styles.helloRegion}>
            <h1 className={styles.helloTitle}>
              What Book Are You Looking For{" "}
            </h1>
          </div>
          <div className={styles.helpTextRegion}>
            <p>Not Sure what to read Next? I'm here to help you</p>
          </div>
        </div>
      </div>
    </main>
  );
}
