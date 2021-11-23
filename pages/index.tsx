import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import styles from "../styles/Home.module.css";
import { Button, Stack, Typography, TextField, Input } from "@mui/material";
import { useState } from "react";
import FileUpload from "components/FileUpload";
import StringUpload from "components/StringUpload";

const Home: NextPage = () => {
  const [file, setFile] = useState<File>();
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Serializer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Stack sx={{ alignItems: "center", flexDirection: { sm: "row" } }}>
          <FileUpload />
          <StringUpload />
        </Stack>
      </main>
    </div>
  );
};

export default Home;
