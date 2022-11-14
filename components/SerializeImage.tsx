import React, { useCallback, ChangeEvent, useState, useEffect } from "react";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import {
  Stack,
  TextField,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import styles from "styles/UploadComponent.module.css";
import { uploadImage } from "src/api";
import ContentDialog from "./ContentDialog";
import { getImageDimensions } from "src/getImageDimensions";
import ReactCrop, { Crop } from "react-image-crop";
import { getCroppedImg } from "src/getCroppedImg";
import { getFileImage } from "src/getFileImage";
import { srcToFile } from "src/srcToFile";
import { closestMultipleOf } from "src/closestMultipleOf";

const SerializeImage = () => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState<
    undefined | { width: number; height: number }
  >();
  const [cropDimensions, setCropDimensions] = useState<
    undefined | { width: number | undefined; height: number | undefined }
  >();
  const [cropFile, setCropFile] = useState<string>("");
  const [crop, setCrop] = useState<Partial<Crop>>({});
  const [smoothBrightness, setSmoothBrightness] = useState(false);
  const [lineLength, setLineLength] = useState(8);
  const [lineLengthError, setLineLengthError] = useState(false);
  const disabled = !file || !!error;

  const onCrop = useCallback(() => {
    if (crop?.height && crop?.height % 8 !== 0) {
      setCrop({
        ...crop,
        width: cropDimensions?.width,
        height: cropDimensions?.height,
      });
    }
  }, [crop, cropDimensions?.height, cropDimensions?.width]);

  useEffect(() => {
    if (crop?.height && dimensions?.height) {
      const snappedHeight = closestMultipleOf(8, crop.height);
      if (snappedHeight <= dimensions.height) {
        setCropDimensions({
          width: crop.width && Math.round(crop.width),
          height: snappedHeight,
        });
      } else {
        setCropDimensions({
          width: crop.width && Math.round(crop.width),
          height: snappedHeight - 8,
        });
      }
    }
  }, [crop, dimensions]);

  useEffect(() => {
    if (file) {
      getImageDimensions(file).then((dimensions) => {
        setDimensions(dimensions);
        setCrop({
          width: Math.round(dimensions.width),
          height: Math.round(dimensions.height),
        });
      });
      setCropFile(URL.createObjectURL(file));
    }
  }, [file]);

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
    if (!disabled && crop) {
      setLoading(true);
      getFileImage(file).then((image) => {
        getCroppedImg(image, crop as Crop).then((blob) => {
          const fileFromBlob = new File([blob as Blob], "cropped.jpeg");
          uploadImage({
            file: fileFromBlob,
            smoothBrightness,
            lineLength,
          }).then((data) => {
            setLoading(false);
            if (data?.message) {
              setError(data.message);
            } else if (data?.content) {
              setContent(data.content);
              setDialogOpen(true);
            }
          });
        });
      });
    }
  }, [crop, disabled, file, smoothBrightness, lineLength]);

  return (
    <>
      <Paper className={styles.mainpaper}>
        <Stack className={styles.componentstack} spacing={3}>
          <Link href="/serialize" passHref>
            <a>
              <Typography fontSize={32}>Serialize an image</Typography>
            </a>
          </Link>
          <TextField
            type="file"
            variant="standard"
            title="Upload a textfile"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            error={!!error}
          />
          {cropDimensions?.height && (
            <Stack spacing={1}>
              {error && <Alert severity="error">{error}</Alert>}
              <ReactCrop
                style={{ width: dimensions?.width, height: dimensions?.height }}
                maxWidth={dimensions?.width}
                maxHeight={dimensions?.height}
                minHeight={8}
                minWidth={8}
                src={cropFile}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={() => onCrop()}
              />
              <Typography>{`width: ${cropDimensions.width} | height:${cropDimensions.height}`}</Typography>
            </Stack>
          )}

          <FormControlLabel
            style={{ marginTop: "auto" }}
            control={
              <Checkbox
                checked={smoothBrightness}
                onChange={() => {
                  setSmoothBrightness((state) => !state);
                }}
              />
            }
            label="Smooth Brightness"
          />

          <TextField
            variant="standard"
            label="Line length"
            helperText={lineLengthError ? "Must be an integer" : ""}
            value={lineLength ? lineLength : ""}
            error={lineLengthError}
            onChange={(e) => {
              const number = Number(e.target.value);
              setLineLengthError(!Number.isInteger(number));

              if (Number.isInteger(number)) {
                setLineLength(number);
              }
            }}
            onBlur={() => {
              if (!lineLength) setLineLength(8);
            }}
          />

          <LoadingButton
            disabled={disabled}
            variant="contained"
            onClick={() => send()}
            loading={loading}
          >
            Serialize
          </LoadingButton>
          <Stack>
            <Typography>Don&apos;t have an image?</Typography>
            <Typography
              component="button"
              style={{ width: "fit-content" }}
              onClick={() =>
                srcToFile("/example.png").then((file) => {
                  setFile(file);
                })
              }
            >
              Try out this <span style={{ color: "#1976d2" }}>example</span>
            </Typography>
          </Stack>
        </Stack>
      </Paper>
      <ContentDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        content={content}
      />
    </>
  );
};

export default SerializeImage;
