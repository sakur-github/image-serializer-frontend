import { FileUploadInput, StringUploadInput } from "src/types";

export async function stringUpload(input: StringUploadInput) {
  const response = await fetch("/api/upload/string", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function fileUpload(input: FileUploadInput) {
  const response = await fetch("/api/upload/file", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
