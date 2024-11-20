const { uploadFile } = require("../helper/s3");

const uploadImage = async (req, res) => {
  try {
    const { directory } = req.body;
    const file = req.file;

    if (!directory || !file) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const s3UploadImage = await uploadFile({ directory, file });

    res
      .status(201)
      .json({ message: "Image uploaded successfully.", data: s3UploadImage });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { uploadImage };
