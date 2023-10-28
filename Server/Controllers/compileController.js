const asyncHandler = require("express-async-handler");
const CheckStatus = require("../utils/checkStatus");
const axios = require("axios");

const compileCode = asyncHandler(async (req, res) => {
  const options = {
    method: "POST",
    url: process.env.SUBMISSION_URL,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
    },
    data: req.body,
  };
  try {
    const response = await axios.request(options);
    setTimeout(() => {
      CheckStatus(response.data.token).then((output) => {
        const formdata = {
          stdout: output.data.stdout,
          status: output.data.status.description,
          time: output.data.time,
          memory: output.data.memory,
        };
        res.status(200).json(formdata);
      });
    }, 2000);
  } catch (error) {
    res.status(500);
  }
});

module.exports = compileCode;
