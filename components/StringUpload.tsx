import type { NextPage } from "next";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Input from "@mui/material/Input";
import styles from "styles/UploadComponent.module.css";

const StringUpload: NextPage = () => {
  const [string, setString] = useState<String>("");
  const [width, setWidth] = useState<String>("");
  const [widthError, setWidthError] = useState(false);
  const [height, setHeight] = useState<String>("");
  const [heightError, setHeightError] = useState(false);
  const disabled = !string || !width || !height || widthError || heightError;
  return (
    <Paper className={styles.mainpaper}>
      <Stack className={styles.componentstack} spacing={3}>
        <Typography fontSize={32}>Upload a string</Typography>

        <Stack spacing={1}>
          <TextField
            label="Template"
            value={string}
            onChange={(e) => setString(e.target.value)}
            multiline
            minRows={8}
            maxRows={8}
            title="Template"
          />
        </Stack>

        <Stack spacing={1}>
          <TextField
            variant="standard"
            label="Width"
            helperText={widthError ? "Must be a number" : ""}
            value={width}
            error={widthError}
            onChange={(e) => {
              const number = Number(e.target.value);
              setWidthError(isNaN(number));
              setWidth(e.target.value);
            }}
          />
        </Stack>

        <Stack spacing={1}>
          <TextField
            variant="standard"
            label="Height"
            helperText={heightError ? "Must be a number" : ""}
            value={height.toString()}
            error={heightError}
            onChange={(e) => {
              const number = Number(e.target.value);
              setHeightError(isNaN(number));
              setHeight(e.target.value);
            }}
          />
        </Stack>

        <Button disabled={disabled} variant="contained">
          Upload
        </Button>
      </Stack>
    </Paper>
  );
};

export default StringUpload;
