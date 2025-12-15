import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// 🔍 DEBUG: log cloudinary config
console.log("✅ Upload middleware loaded");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("📁 Multer received file:", {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    return {
      folder: "crackers-app",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  // 🔍 DEBUG: file filter
  fileFilter: (req, file, cb) => {
    console.log("🧪 fileFilter hit:", {
      fieldname: file.fieldname,
      mimetype: file.mimetype,
    });

    cb(null, true); // allow all for now
  },
});

export default upload;
