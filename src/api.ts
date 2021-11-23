import fileDownload from "js-file-download";
import { backendUrl } from "src/constants";
import { FileUploadInput, StringUploadInput } from "src/types";

export async function stringUpload(input: StringUploadInput) {
  const response = await fetch(`${backendUrl}/upload/string`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await response.blob();
  fileDownload(data, "image.png");
}

export async function fileUpload(input: FileUploadInput) {
  const formData = new FormData();
  formData.append("file", input.file);
  const response = await fetch(`${backendUrl}/upload/file`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data?.content;
}
