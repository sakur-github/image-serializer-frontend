import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Stack, TextField, Typography } from "@mui/material";
import styles from "styles/UploadComponent.module.css";
import { fileUpload } from "src/api";
import Dialog from "./Dialog";

const FileUpload = () => {
  const [file, setFile] = useState<File>();
  const [content, setContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const disabled = !file;

  const send = useCallback(() => {
    if (!disabled) {
      fileUpload({ file }).then((data) => {
        setContent(data);
        setDialogOpen(true);
      });
    }
  }, [disabled, file]);

  return (
    <>
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
          <Button
            disabled={disabled}
            variant="contained"
            onClick={() => send()}
          >
            Upload
          </Button>
        </Stack>
      </Paper>
      <Dialog open={dialogOpen} setOpen={setDialogOpen}>
        <>{content}</>
      </Dialog>
    </>
  );
};

export default FileUpload;
