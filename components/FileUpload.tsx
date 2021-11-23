import { useCallback, ChangeEvent, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Stack, TextField, Typography, Alert } from "@mui/material";
import styles from "styles/UploadComponent.module.css";
import { fileUpload } from "src/api";
import Dialog from "./Dialog";
import { LoadingButton } from "@mui/lab";

const FileUpload = () => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const disabled = !file;

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const input = event.target as HTMLInputElement;
      if (input?.files) {
        setFile(input.files[0]);
      }
      setError("");
    },
    []
  );

  const send = useCallback(() => {
    if (!disabled) {
      setLoading(true);
      fileUpload({ file }).then((data) => {
        setLoading(false);
        if (data?.message) {
          setError(data.message);
        } else {
          setContent(data?.content);
          setDialogOpen(true);
        }
      });
    }
  }, [disabled, file]);

  return (
    <>
      <Paper className={styles.mainpaper}>
        <Stack className={styles.componentstack} spacing={3}>
          <Typography fontSize={32}>Upload an image</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            type="file"
            variant="standard"
            title="Upload a textfile"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            error={!!error}
          />
          <LoadingButton
            disabled={disabled}
            variant="contained"
            onClick={() => send()}
            loading={loading}
          >
            Upload
          </LoadingButton>
        </Stack>
      </Paper>
      <Dialog open={dialogOpen} setOpen={setDialogOpen} content={content} />
    </>
  );
};

export default FileUpload;
