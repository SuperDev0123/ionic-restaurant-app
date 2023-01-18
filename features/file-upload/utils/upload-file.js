const uploadFile = ({ file, uploadUrl, onProgress = () => {} }) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener("progress", event => {
      if (event.lengthComputable) {
        onProgress(event.loaded / event.total)
      }
    })
    xhr.addEventListener("progress", event => {
      if (event.lengthComputable) {
        onProgress(event.loaded / event.total)
      }
    })
    xhr.addEventListener("loadstart", () => onProgress(0))
    xhr.addEventListener("loadend", () => {
      if (xhr.readyState === 4 && xhr.status === 200) resolve(true)
      reject(new Error("upload failed"))
    })
    xhr.addEventListener("error", reject)
    xhr.addEventListener("abort", reject)
    xhr.open("PUT", uploadUrl)
    xhr.setRequestHeader("Content-Type", file.type)
    xhr.send(file)
  })
}

export default uploadFile
