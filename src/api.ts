import { backendUrl } from "src/constants";
import {
  FileUploadInput,
  FileUploadResult,
  StringUploadInput,
} from "src/types";

export async function uploadBytes(input: StringUploadInput) {
  const response = await fetch(`/api/upload/string`, {
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

export async function uploadImage(
  input: FileUploadInput
): Promise<FileUploadResult> {
  const formData = new FormData();
  formData.append("file", input.file);
  try {
    const response = await fetch(`/api/upload/file`, {
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
