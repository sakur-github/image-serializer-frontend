import React, { useCallback, ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import { Stack, TextField, Typography, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import styles from "styles/UploadComponent.module.css";
import { uploadFile } from "src/api";
import ContentDialog from "./ContentDialog";
import ExampleDialog from "./ImageDialog";
import { getImageDimensions } from "src/getImageDimensions";

const ByteGeneration = () => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);
  const [dimensions, setDimensions] = useState<
    undefined | { width: number; height: number }
  >();
  const disabled = !file;

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const input = event.target as HTMLInputElement;
      if (input?.files) {
        getImageDimensions(input.files[0], (dimensions) => {
          setDimensions(dimensions);
        });
        setFile(input.files[0]);
      }
      setError("");
    },
    []
  );

  const send = useCallback(() => {
    if (!disabled) {
      setLoading(true);
      uploadFile({ file }).then((data) => {
        setLoading(false);
        if (data?.message) {
          setError(data.message);
        } else if (data?.content) {
          setContent(data.content);
          setDialogOpen(true);
        }
      });
    }
  }, [disabled, file]);

  return (
    <>
      <Paper className={styles.mainpaper}>
        <Stack className={styles.componentstack} spacing={3}>
          <Link href="/generate/bytes" passHref>
            <a>
              <Typography fontSize={32}>Generate bytes</Typography>
            </a>
          </Link>
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
            Generate
          </LoadingButton>
          {dimensions && (
            <Typography>{`Dimensions: ${dimensions.width}px*${dimensions.height}px`}</Typography>
          )}
          <Stack>
            <Typography>
              Want to try it out but don&apos;t have any valid images?
            </Typography>
            <Typography
              component="button"
              style={{ width: "fit-content" }}
              onClick={() => setExampleOpen(true)}
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
      <ExampleDialog
        open={exampleOpen}
        setOpen={setExampleOpen}
        image={{ name: "example.png", src: "/example.png" }}
        title="Example"
      >
        <Image
          src="/example.png"
          width={128 * 5}
          height={32 * 5}
          alt="Example image of a mountain"
        />
      </ExampleDialog>
    </>
  );
};

export default ByteGeneration;
