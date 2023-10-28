const router = require("express").Router();

router.post("/", require("../Controllers/compileController"));

module.exports = router;
