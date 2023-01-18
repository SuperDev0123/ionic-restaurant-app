import axios from "axios"

const urlToBase64 = url =>
  axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then(response => Buffer.from(response.data, "binary").toString("base64"))

export default urlToBase64
