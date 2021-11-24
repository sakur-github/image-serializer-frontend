export function getImageDimensions(
  src: File | Blob
): Promise<{ width: number; height: number }> {
  const img = new Image();
  img.src = URL.createObjectURL(src);
  return new Promise((resolve) => {
    img.addEventListener("load", function () {
      resolve({ width: this.naturalWidth, height: this.naturalHeight });
      this.remove();
    });
  });
}
