const mongoose = require("mongoose");
const generateString = require('../helpers/generateString')
const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String, 
        default: generateString(20)
    },
    avatar: String, 
    phone: String,
    role_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  }
);

const Account = mongoose.model("Account", accountSchema, "accounts");
module.exports = Account;
