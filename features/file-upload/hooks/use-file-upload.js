import { useState, useCallback } from "react"
import axios from "axios"
import uploadFile from "../utils/upload-file"

const useFileUpload = (files = []) => {
  const [progress, setProgress] = useState({})

  const startUploading = useCallback(
    async paymentIntentId => {
      const {
        data: { uploadUrls, viewUrls },
      } = await axios.post("/api/upload/permissions", {
        paymentIntentId,
        files: files.map(({ name, size, type, lastModified }) => ({
          name,
          size,
          type,
          lastModified,
        })),
      })
      await Promise.all(
        files.map((file, index) =>
          uploadFile({
            file,
            uploadUrl: uploadUrls[index],
            onProgress: prog =>
              setProgress(oldFilesProgress => ({
                ...oldFilesProgress,
                [file.path]: prog,
              })),
          })
        )
      )
      return viewUrls
    },
    [files]
  )

  return {
    progress,
    startUploading,
  }
}

export default useFileUpload
