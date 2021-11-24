import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import SerializeImage from "components/SerializeImage";
import { useEffect } from "react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Serializer</title>
        <meta name="description" content="Deserialize an image from bytes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SerializeImage />
      </main>
    </div>
  );
};

export default Home;
