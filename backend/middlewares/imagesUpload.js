import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./files");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export { upload };
