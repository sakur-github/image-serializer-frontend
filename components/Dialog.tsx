import { Button, Stack, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { Dispatch, SetStateAction, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function ContentDialog({
  content,
  open,
  setOpen,
}: {
  content: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const [copyToClipboardText, setCopyToClipboardText] = useState("");
  const [loading, setLoading] = useState(false);
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
          <DialogTitle id="alert-dialog-title">{"Content"}</DialogTitle>
          <Tooltip
            open={!!copyToClipboardText}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={copyToClipboardText}
          >
            <Button
              onClick={() => {
                setLoading(true);
                navigator.clipboard
                  .writeText(content)
                  .then(() => {
                    setCopyToClipboardText("Copied!");
                  })
                  .catch((e) => {
                    setCopyToClipboardText("Failed to copy to clipboard.");
                  })
                  .finally(() => {
                    setLoading(false);
                    setTimeout(() => setCopyToClipboardText(""), 2500);
                  });
              }}
            >
              <ContentCopyIcon />
            </Button>
          </Tooltip>
        </Stack>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
