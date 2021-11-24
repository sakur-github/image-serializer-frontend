import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import DeserializeImage from "components/DeserializeImage";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    fetch("/api/ping");
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Serializer</title>
        <meta name="description" content="Serialize bytes from an image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DeserializeImage />
      </main>
    </div>
  );
};

export default Home;
