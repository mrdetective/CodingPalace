const express = require("express");
const router = express.Router();
const {
  getCodingFiles,
  getCodingFile,
  createCodingFiles,
  updatecodingFile,
  deleteCodingFile,
} = require("../Controllers/codingfilesController");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);
router.route("/").get(getCodingFiles).post(createCodingFiles);
router
  .route("/:filename")
  .get(getCodingFile)
  .patch(updatecodingFile)
  .delete(deleteCodingFile);

module.exports = router;
