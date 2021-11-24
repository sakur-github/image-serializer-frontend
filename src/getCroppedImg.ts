import { Crop } from "react-image-crop";

export function getCroppedImg(image: HTMLImageElement, crop: Crop) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalHeight / image.height;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = Math.round(crop.width);
  canvas.height = Math.round(crop.height);
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
}
