exports.uploadImage = async (imagePath) => {
  const cloudinary = require("cloudinary");
  cloudinary.config({
    secure: true,
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecret,
    private_cdn: false,
    secure_distribution: null,
  });
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};
