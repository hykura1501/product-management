const uploadHelper = require("../../helpers/uploadCloud");

module.exports.uploadCloud = async (req, res, next) => {
  if (req.file) {
    const result = await uploadHelper.upload(req.file.buffer);
    req.body[req.file.fieldname] = result;
    upload(req);
  }
  next();
};
