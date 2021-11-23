import { useCallback, useState } from "react";
import Paper from "@mui/material/Paper";
import { Stack, TextField, Typography, Alert } from "@mui/material";
import styles from "styles/UploadComponent.module.css";
import { uploadString } from "src/api";
import { LoadingButton } from "@mui/lab";

const ImageGeneration = () => {
  const [content, setContent] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [widthError, setWidthError] = useState(false);
  const [height, setHeight] = useState<string>("");
  const [heightError, setHeightError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = !content || !width || !height || widthError || heightError;

  const send = useCallback(() => {
    setError("");
    setLoading(true);
    if (!disabled) {
      uploadString({
        content,
        width: Number(width),
        height: Number(height),
      })
        .catch((e) => {
          setError(e?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [content, disabled, height, width]);

  return (
    <Paper className={styles.mainpaper}>
      <Stack className={styles.componentstack} spacing={3}>
        <Typography fontSize={32}>Generate an image</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack spacing={1}>
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            title="Content"
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
            helperText={heightError ? "Must be a multiple of 8" : ""}
            value={height.toString()}
            error={heightError}
            onChange={(e) => {
              const number = Number(e.target.value);
              setHeightError(number % 8 !== 0);
              setHeight(e.target.value);
            }}
          />
        </Stack>

        <LoadingButton
          disabled={disabled}
          loading={loading}
          variant="contained"
          onClick={() => send()}
        >
          Generate
        </LoadingButton>
      </Stack>
    </Paper>
  );
};

export default ImageGeneration;
