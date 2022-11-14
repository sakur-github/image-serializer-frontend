export type StringUploadInput = {
  content: string;
  width: number;
  height: number;
};

export type FileUploadInput = {
  file: File;
  smoothBrightness: boolean;
  lineLength: number;
};

export type FileUploadResult = {
  message?: string;
  content?: string;
};
