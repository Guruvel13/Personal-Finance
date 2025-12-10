const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    registerUser,
    loginUser,
    getUserInfo,
    changePassword,
    updateUserInfo,
} = require("../controllers/authController.js");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser", protect, getUserInfo);
router.post("/change-password", protect, changePassword);
router.post("/update-profile", protect, updateUserInfo);

router.post("/upload-image",upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    // Convert buffer to Base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    // Return the Data URI as the imageUrl
    res.status(200).json({ imageUrl: dataURI });
});

module.exports = router;
