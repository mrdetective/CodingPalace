const axios = require("axios");

const CheckStatus = async (token) => {
  const options = {
    method: "GET",
    url: process.env.SUBMISSION_URL + "/" + token,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = CheckStatus;
