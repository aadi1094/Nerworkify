import cloudinary from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadImageFromDataURI = async (file) => {
    try {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const response = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
        format: "png", // Force PNG format
        transformation: [
          { quality: "auto" }, // Optimize quality
          { fetch_format: "png" } // Ensure PNG delivery
        ]
      });
      return response.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };