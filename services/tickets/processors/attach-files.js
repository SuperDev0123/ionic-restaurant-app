import urlToBase64 from "../../utils/url-to-base-64"

const attachFiles = async files => {
  const filesContent = await Promise.all(
    files.map(({ url }) => urlToBase64(url))
  )

  const attachments = files.map(({ name, type }, index) => ({
    content: filesContent[index],
    filename: name,
    type: "text/plain",
    disposition: "attachment",
  }))

  return attachments
}

export default attachFiles
