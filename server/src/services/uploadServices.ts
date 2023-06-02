import { randomUUID } from "node:crypto";
import { extname } from "node:path";

async function uploadImage(upload) {
  if (!upload) {
    throw new Error("Upload image not found");
  }

  const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;
  const isValidImageFormat = mimeTypeRegex.test(upload.mimetype);

  if (!isValidImageFormat) {
    throw new Error("Invalid image format");
  }

  const fileId = randomUUID();
  const extension = extname(upload.name);
  const fileName = fileId.concat(extension);

  upload.mv(`./src/uploads/${fileName}`);

  // ! Change this to the get the file URL automatically
  const fileURL = `http://localhost:5000/uploads/${fileName}`;

  return fileURL;
}

export default { uploadImage };
