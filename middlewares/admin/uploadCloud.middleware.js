const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

module.exports.uploadCloud = (req, res, next) => {
  try {
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      // console.log("chạy qua đây 1");
      async function upload(req) {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.url;
        // console.log(req.body[req.file.fieldname]);
        // console.log("chạy qua đây 2");
        next();
      }
      upload(req);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
