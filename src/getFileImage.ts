export function getFileImage(file: File, fn: (img: HTMLImageElement) => any) {
  const img = new Image();
  img.addEventListener("load", function () {
    fn(this);
  });
  img.src = URL.createObjectURL(file);
}
