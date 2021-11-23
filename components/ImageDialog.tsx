import { Button, Stack, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { Dispatch, SetStateAction, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";

export default function ImageDialog({
  children,
  open,
  setOpen,
  image,
  title,
}: {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  image: { name: string; src: string };
  title?: string;
}): JSX.Element {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <DialogTitle id="alert-dialog-title">{title || "Image"}</DialogTitle>
          <Button title="Download Image" href={image.src} download={image.name}>
            <DownloadIcon />
          </Button>
        </Stack>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
