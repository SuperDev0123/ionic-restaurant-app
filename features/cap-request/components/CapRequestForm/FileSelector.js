import { styled, spacing } from "@mui/system"
import { useDropzone } from "react-dropzone"
import Box from "@mui/material/Box"
import UploadIcon from "@mui/icons-material/Upload"
import Typography from "@mui/material/Typography"
import LinearProgress from "@mui/material/LinearProgress"

const UploadBox = styled(Box)(({ theme }) => ({
  height: "100px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderStyle: "dashed",
  borderWidth: 2,
  borderColor: theme.palette.grey[700],
  cursor: "pointer",
  padding: "2rem 1rem",
  color: "rgba(255, 255, 255, 0.7)"
}))

const FilesPreviewBox = styled(Box)(spacing)

const FileSelector = ({
  setFiles,
  files,
  accept = "image/jpeg,image/png",
  maxSize = 25 * 1024 * 1024, // 25MB in bytes
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: setFiles,
    accept,
    maxSize,
  })

  return (
    <>
      <UploadBox {...getRootProps()} my={2}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop logo files here ...</p>
        ) : (
          <Typography component="p">
            Drop your example files here or click to select files.
          </Typography>
        )}
        <UploadIcon fontSize="large" />
      </UploadBox>
      <FilesPreviewBox my={4}>
        {files.length > 0 && (
          <Typography variant="h6" component="h3" paragraph>
            You have selected these files:
          </Typography>
        )}
        <ol>
          {files.map(file => (
            <li key={file.name}>
              {`${file.name} (${(file.size / (1000 * 1000)).toFixed(2)} MB)`}
            </li>
          ))}
        </ol>
      </FilesPreviewBox>
    </>
  )
}

export default FileSelector
