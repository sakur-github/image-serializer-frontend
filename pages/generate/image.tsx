import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import ImageGeneration from "components/ImageGeneration";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Serializer</title>
        <meta name="description" content="Generated an image from bytes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ImageGeneration />
      </main>
    </div>
  );
};

export default Home;
