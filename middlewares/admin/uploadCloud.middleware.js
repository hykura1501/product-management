const uploadHelper = require("../../helpers/uploadCloud");

module.exports.uploadCloud = async (req, res, next) => {
  if (req.file) {
    console.log("chạy qua đây");
    const result = await uploadHelper.upload(req.file.buffer);
    req.body[req.file.fieldname] = result;
  }else {
    console.log("Đéo có file");
  }
  next();
};
