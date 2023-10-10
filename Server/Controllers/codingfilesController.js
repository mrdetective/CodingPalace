const asyncHandler = require("express-async-handler");
const codingFiles = require("../models/codingfilesModel");

const getCodingFiles = asyncHandler(async (req, res) => {
  const contacts = await codingFiles.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

const createCodingFiles = asyncHandler(async (req, res) => {
  const {filename, code, data_created, last_edited} = req.body;
  if (!filename || !code || !data_created || !last_edited) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const filenamenotavailable = await codingFiles.find({
    user_id: req.user.id,
    file_name: filename,
  });
  if (filenamenotavailable) {
    res.status(400);
    throw new Error("File name already exists");
  }
  const codefile = await codingFiles.create({
    filename,
    code,
    data_created,
    last_edited,
    user_id: req.user.id,
  });
  res.json(201).json(codefile);
});

const getCodingFile = asyncHandler(async (req, res) => {
  const codeFile = await codingFiles.findOne({
    file_name: req.body.filename,
    user_id: req.user.id,
  });
  res.status(200).json(codeFile);
});

const updatecodingFile = asyncHandler(async (req, res) => {
  const updatedcodingFile = await codingFiles.findOneAndUpdate(
    {
      file_name: req.body.filename,
      user_id: req.user.id,
    },
    req.body,
    {new: true, upsert: true}
  );
  res.status(200).json(updatedcodingFile);
});

const deleteCodingFile = asyncHandler(async (req, res) => {
  await codingFiles.deleteOne({file_name: req.filename, user_id: req.user.id});
  res.status(200);
});

module.exports = {
  getCodingFiles,
  getCodingFile,
  createCodingFiles,
  updatecodingFile,
  deleteCodingFile,
};
