import { backendUrl } from "src/constants";
import {
  FileUploadInput,
  FileUploadResult,
  StringUploadInput,
} from "src/types";

export async function uploadString(input: StringUploadInput) {
  const response = await fetch(`${backendUrl}/upload/string`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (response.ok) {
    const blob = await response.blob();
    return { blob };
  } else {
    const error = await response.json();
    throw new Error(error?.message);
  }
}

export async function uploadFile(
  input: FileUploadInput
): Promise<FileUploadResult> {
  const formData = new FormData();
  formData.append("file", input.file);
  try {
    const response = await fetch(`${backendUrl}/upload/file`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (e: any) {
    const message = e?.message;
    return { message };
  }
}
