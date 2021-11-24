export function srcToFile(src: string) {
  return fetch(src)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], "image.png", { type: "image/png" });
    });
}
