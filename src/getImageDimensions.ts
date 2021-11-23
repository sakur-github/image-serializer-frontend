export function getImageDimensions(
  src: string | File | Blob,
  fn: (dimensions: { width: number; height: number }) => any
) {
  const img = new Image();
  img.addEventListener("load", function () {
    fn({ width: this.naturalWidth, height: this.naturalHeight });
    this.remove();
  });
  if (typeof src !== "string") {
    img.src = URL.createObjectURL(src);
  } else {
    img.src = src;
  }
}
