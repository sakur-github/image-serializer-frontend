import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import ByteGeneration from "components/ByteGeneration";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Serializer</title>
        <meta name="description" content="Generate bytes from an image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ByteGeneration />
      </main>
    </div>
  );
};

export default Home;
