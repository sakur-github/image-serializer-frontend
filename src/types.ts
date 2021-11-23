export type StringUploadInput = {
  content: string;
  width: number;
  height: number;
};

export type FileUploadInput = {
  file: File;
};

export type FileUploadResult = {
  message?: string;
  content?: string;
};
