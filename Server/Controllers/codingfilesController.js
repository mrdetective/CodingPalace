const asyncHandler = require("express-async-handler");
const codingFiles = require("../models/codingfilesModel");

const getCodingFiles = asyncHandler(async (req, res) => {
  const files = await codingFiles.find({user_id: req.user.id});
  res.status(200).json(files);
});

const createCodingFiles = asyncHandler(async (req, res) => {
  const {file_name, code, theme, language, date_created, last_edited} =
    req.body;
  if (!file_name || !date_created || !last_edited) {
    console.log("pro");
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const filenamenotavailable = await codingFiles.find({
    user_id: req.user.id,
    file_name: file_name,
  });
  if (filenamenotavailable.length) {
    res.status(400);
    throw new Error("File name already exists");
  }
  try {
    const codefile = await codingFiles.create({
      file_name,
      code,
      theme,
      language,
      date_created,
      last_edited,
      user_id: req.user.id,
    });
    res.status(201).json(codefile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const getCodingFile = asyncHandler(async (req, res) => {
  const codeFile = await codingFiles.findOne({
    file_name: req.params,
    user_id: req.user.id,
  });
  res.status(200).json(codeFile);
});

const updatecodingFile = asyncHandler(async (req, res) => {
  const updatedcodingFile = await codingFiles.findOneAndUpdate(
    {
      file_name: req.params,
      user_id: req.user.id,
    },
    req.body,
    {new: true, upsert: true}
  );
  res.status(200).json(updatedcodingFile);
});

const deleteCodingFile = asyncHandler(async (req, res) => {
  await codingFiles.deleteOne({
    file_name: req.params.filename,
    user_id: req.user.id,
  });
  res.status(200);
});

module.exports = {
  getCodingFiles,
  getCodingFile,
  createCodingFiles,
  updatecodingFile,
  deleteCodingFile,
};
