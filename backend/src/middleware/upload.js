import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// 🔍 DEBUG: log cloudinary config
console.log("✅ Upload middleware loaded");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "crackers-app",
//       resource_type: "auto",
//       public_id: `${Date.now()}-${file.originalname}`,
//     };
//   },
// });

// 🔧 LOCAL STORAGE (For Testing)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
