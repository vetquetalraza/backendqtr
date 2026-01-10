const cloudinary = require('../../config/cloudinary');

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'pets' },
      (error, result) => {
        if (error) reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    ).end(buffer);
  });
};

module.exports = uploadToCloudinary;
