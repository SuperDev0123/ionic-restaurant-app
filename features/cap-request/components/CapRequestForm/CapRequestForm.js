import { useCallback, useState } from "react"
import { styled, spacing } from "@mui/system"
import Image from "next/image";
import { useRouter } from "next/router"
import { Formik } from "formik"
import * as yup from "yup"
import MuiTextField from "@mui/material/TextField"
import MuiAlert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import MuiMenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import FileSelector from "./FileSelector"
import CardInput from "../CardInput"
import { usePayment } from "../../../payment/contexts/PaymentContextCaps"
import useFileUpload from "../../../file-upload/hooks/use-file-upload"
import registerOrder from "../../services/register-order"
import calculatePriceCaps from "./utils/calculate-price-caps"


const Alert = styled(MuiAlert)(spacing)
const TextField = styled(MuiTextField)(spacing)
const MenuItem = styled(MuiMenuItem)(spacing)

const PaymentBox = styled("div")`
  margin-bottom: 0.5rem;
`

const CAP_PACKAGES = {
  Legend: "$30",
  Custom: "$40",
}

const POSITIONS = ["SP", "RP", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"]

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  playerName: yup.string("Player name is required.").required("Required"),
})

const initialValues = {
  name: "",
  email: "",
  capPackage: "Legend",
  description: "",
  position: "SP",
}

const CapRequestForm = () => {
  const router = useRouter()
  const { cardError, pay, clearCardData, isCardInfoComplete } = usePayment()
  const [files, setFiles] = useState([])
  const { startUploading, progress: uploadProgress } = useFileUpload(files)

  const handleSubmit = useCallback(
    async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
      try {
        setSubmitting(true)
        const paymentIntentId = await pay(values)
        const uploadedFiles = await startUploading(paymentIntentId)
        await registerOrder({
          paymentIntentId,
          files: files.map(({ name, type, size }, index) => ({
            name,
            type,
            size,
            url: uploadedFiles[index],
          })),
          formData: values,
        })
        clearCardData()
        setStatus({ success: true })
        resetForm()
        setFiles([])
        router.push("/thank-you")
      } catch (err) {
        const message = err.message || "Something went wrong"
        setStatus({ success: false })
        setErrors({ submit: message })
      } finally {
        setSubmitting(false)
      }
    },
    [pay, startUploading, files, clearCardData, router]
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <Typography variant="h6" component="h6">
            Your Info
          </Typography>
          <TextField
            required
            fullWidth
            name="name"
            label="Name"
            aria-label="name"
            value={values.name}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            fullWidth
            required
            name="email"
            label="Email"
            aria-label="email"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <Typography
            variant="h6"
            component="h6"
            sx={{ marginTop: "1.5rem", marginBottom: ".25rem" }}
          >
            Project Info
          </Typography>
          <Typography
            variant="caption"
            component="p"
            sx={{ marginBottom: "1rem" }}
          >
            Please add any additional Player Details – Height, Weight, Place of Birth, Age, Number, Secondary Position, Batting Stance, Pitching Windup, Gear and Accessories or anything that you can think of that will allow the artist to create a more meaningful creation.
          </Typography>
          <TextField
            select
            fullWidth
            label="CAP Package"
            name="capPackage"
            value={values.capPackage}
            onChange={handleChange}
            my={2}
          >
            {Object.entries(CAP_PACKAGES).map(([key, val], i) => (
              <MenuItem key={`number-option-${key}`} value={key}>
                {key} - {val}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            fullWidth
            name="playerName"
            label="Player Name"
            aria-label="playerName"
            value={values.playerName}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            select
            fullWidth
            label="Position"
            name="position"
            value={values.position}
            onChange={handleChange}
            my={2}
          >
            {POSITIONS.map(position => (
              <MenuItem key={`number-option-${position}`} value={position}>
                {position}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            multiline
            fullWidth
            minRows={5}
            name="description"
            label="Project Description"
            aria-label="message text"
            value={values.description}
            error={Boolean(touched.description && errors.description)}
            helperText={
              "Describe the stadium you want us to build or give us inspiration to build your dream stadium. You can attach samples using the upload field below."
            }
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <FileSelector
            files={files}
            setFiles={setFiles}
            uploadProgress={uploadProgress}
          />
          <PaymentBox>
            <Typography
              variant="h6"
              component="h6"
              sx={{ marginTop: "1.5rem", marginBottom: ".25rem" }}
            >
              Payment
            </Typography>
            <CardInput />
            {cardError && (
              <Alert mt={2} mb={3} severity="warning">
                {cardError}
              </Alert>
            )}
          </PaymentBox>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting || !isCardInfoComplete}
            sx={{ marginBottom: "1rem" }}
          >
            {`Pay $${calculatePriceCaps(values.capPackage)} & Order`}
          </Button>
          <Image
            src="/images/stripe.png"
            width={150}
            height={30}
            alt="powered by stripe"
          />
          <Typography variant="caption" component="p" gutterBottom>
            This payment is securely handled via Stripe. ShowZone does not
            recieve or store your payment information.
          </Typography>
        </form>
      )}
    </Formik>
  )
}

export default CapRequestForm
