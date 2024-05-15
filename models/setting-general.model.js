const mongoose = require("mongoose");
const settingGeneralSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    logo: String,
    address: String,
  },
  { timestamps: true }
);

const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, "settings-general");
module.exports = SettingGeneral;
