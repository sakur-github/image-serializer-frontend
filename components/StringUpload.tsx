import { useCallback, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Input from "@mui/material/Input";
import styles from "styles/UploadComponent.module.css";
import { stringUpload } from "src/api";

const StringUpload = () => {
  const [content, setContent] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [widthError, setWidthError] = useState(false);
  const [height, setHeight] = useState<string>("");
  const [heightError, setHeightError] = useState(false);

  const disabled = !content || !width || !height || widthError || heightError;

  const send = useCallback(() => {
    if (!disabled) {
      stringUpload({ content, width: Number(width), height: Number(height) });
    }
  }, [content, disabled, height, width]);

  return (
    <Paper className={styles.mainpaper}>
      <Stack className={styles.componentstack} spacing={3}>
        <Typography fontSize={32}>Upload a string</Typography>

        <Stack spacing={1}>
          <TextField
            label="Template"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            title="Template"
            minRows={8}
            maxRows={8}
            inputProps={{ style: { minHeight: "217px", maxHeight: "217px" } }}
          />
        </Stack>

        <Stack spacing={1}>
          <TextField
            variant="standard"
            label="Width"
            helperText={widthError ? "Must be an integer" : ""}
            value={width}
            error={widthError}
            onChange={(e) => {
              const number = Number(e.target.value);
              setWidthError(!Number.isInteger(number));
              setWidth(e.target.value);
            }}
          />
        </Stack>

        <Stack spacing={1}>
          <TextField
            variant="standard"
            label="Height"
            helperText={heightError ? "Must be an integer" : ""}
            value={height.toString()}
            error={heightError}
            onChange={(e) => {
              const number = Number(e.target.value);
              setHeightError(!Number.isInteger(number));
              setHeight(e.target.value);
            }}
          />
        </Stack>

        <Button disabled={disabled} variant="contained" onClick={() => send()}>
          Upload
        </Button>
      </Stack>
    </Paper>
  );
};

export default StringUpload;
