const mongoose = require("mongoose");

const codingfileSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  file_name: {
    type: String,
    required: [true, "Please add the file name"],
  },
  code: {
    type: String,
    required: [true, "Please add your code in order to save it"],
  },
  theme: {
    type: String,
    required: [true, "Please add your theme"],
  },
  language: {
    type: String,
    required: [true, "Please add your language"],
  },
  date_created: {
    type: String,
    required: [true, "Please add the day the file was created"],
  },
  last_edited: {
    type: String,
    required: [true, "Please add the day the file was last edited"],
  },
});

module.exports = mongoose.model("CodingFiles", codingfileSchema);
