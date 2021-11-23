import type { NextPage } from "next";
import { useCallback, ChangeEvent, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Stack, TextField, Typography } from "@mui/material";
import styles from "styles/UploadComponent.module.css";
import { fileUpload } from "src/api";
import Dialog from "./Dialog";

const FileUpload = () => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState(false);
  const [content, setContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const disabled = !file;

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const input = event.target as HTMLInputElement;
      if (input?.files) {
        setFile(input.files[0]);
      }
      setError(false);
    },
    []
  );

  const send = useCallback(() => {
    if (!disabled) {
      fileUpload({ file }).then((data) => {
        if (data?.message) {
          setError(true);
        }
        setContent(data?.message || data?.content);
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
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            error={error}
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
      <Dialog open={dialogOpen} setOpen={setDialogOpen} error={error}>
        <>{content}</>
      </Dialog>
    </>
  );
};

export default FileUpload;
