import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Stack } from "@mui/material";
import DeserializeImage from "components/DeserializeImage";
import SerializeImage from "components/SerializeImage";
import { useEffect } from "react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Serializer</title>
        <meta
          name="description"
          content="Serialize images from bytes, and bytes from images."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Stack sx={{ flexDirection: { sm: "row" } }}>
          <SerializeImage />
          <DeserializeImage />
        </Stack>
      </main>
    </div>
  );
};

export default Home;
