import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Stack, TextField, Typography, Alert, Paper } from "@mui/material";
import styles from "styles/UploadComponent.module.css";
import { uploadBytes } from "src/api";
import { example } from "src/example";
import { LoadingButton } from "@mui/lab";
import ImageDialog from "./ImageDialog";

const DeserializeImage = () => {
  const [content, setContent] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [widthError, setWidthError] = useState(false);
  const [height, setHeight] = useState<string>("");
  const [heightError, setHeightError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const disabled = !content || !width || !height || widthError || heightError;

  const send = useCallback(() => {
    setError("");
    setLoading(true);
    if (!disabled) {
      uploadBytes({
        content,
        width: Number(width),
        height: Number(height),
      })
        .then(({ blob }) => {
          if (blob) {
            setImage(URL.createObjectURL(blob));
            setDialogOpen(true);
          }
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
    <>
      <Paper className={styles.mainpaper}>
        <Stack className={styles.componentstack} spacing={3}>
          <Link href="/deserialize" passHref>
            <a>
              <Typography fontSize={32}>Deserialize an image</Typography>
            </a>
          </Link>
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
            Deserialize
          </LoadingButton>

          <Stack>
            <Typography>Don&apos;t know what to put in?</Typography>
            <Typography
              component="button"
              style={{ width: "fit-content" }}
              onClick={() => {
                setContent(example.content);
                setWidth(example.width);
                setHeight(example.height);
              }}
            >
              Try out this <span style={{ color: "#1976d2" }}>example</span>
            </Typography>
          </Stack>
        </Stack>
      </Paper>
      <ImageDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        image={{ name: "serialized.png", src: image }}
      >
        <img
          src={image}
          alt="Your deserialized image"
          title="Your deserialized image"
        />
      </ImageDialog>{" "}
    </>
  );
};

export default DeserializeImage;
