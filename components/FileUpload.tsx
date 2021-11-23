import type { NextPage } from "next";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Stack, TextField, Typography } from "@mui/material";
import styles from "styles/UploadComponent.module.css";

const FileUpload: NextPage = () => {
  const [file, setFile] = useState<File>();
  return (
    <Paper className={styles.mainpaper}>
      <Stack className={styles.componentstack} spacing={3}>
        <Typography fontSize={32}>Upload a file</Typography>
        <TextField
          type="file"
          variant="standard"
          title="Upload a textfile"
          onChange={(event) => {
            const input = event.target as HTMLInputElement;
            if (input?.files) {
              setFile(input.files[0]);
            }
          }}
        />
        <Button disabled={!file} variant="contained">
          Upload
        </Button>
      </Stack>
    </Paper>
  );
};

export default FileUpload;
