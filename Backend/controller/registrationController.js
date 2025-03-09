import Registration from "../model/registrationModel.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";


const upload = multer({ storage: multer.memoryStorage() });

export const registerUser = async (req, res) => {
  try {
    upload.single("visitingCard")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "File upload error" });
      }

      const { name, companyName, mobile, whatsapp, email, city, district, state, pincode, gstType, gstNumber } = req.body;

      if (!name || !companyName || !mobile || !whatsapp || !email || !city || !district || !state || !pincode) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }

      // Validate GST if applicable
      if (gstType === "gst" && !gstNumber) {
        return res.status(400).json({ message: "GST Number is required for GST registration" });
      }

      let visitingCardUrl = "";

      // Upload visiting card to Cloudinary if provided
      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "visiting_cards" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(req.file.buffer);
        });

        visitingCardUrl = uploadResult;
      }

      // Save registration data with optional GST details
      const newRegistration = new Registration({
        name,
        companyName,
        mobile,
        whatsapp,
        email,
        city,
        district,
        state,
        pincode,
        gstType,
        gstNumber: gstType === "gst" ? gstNumber : "", // Save GST number only if applicable
        visitingCardUrl,
      });

      await newRegistration.save();
      res.status(201).json({ message: "Registration submitted successfully" });
    });
  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};
