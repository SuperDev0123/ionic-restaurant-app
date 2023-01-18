import { useCallback, useState } from "react"
import { styled, spacing } from "@mui/system"
import Image from "next/image";
import { useRouter } from "next/router"
import { Formik } from "formik"
import * as yup from "yup"
import MuiTextField from "@mui/material/TextField"
import MuiAlert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import MuiMenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"

import FileSelector from "./FileSelector"
import CardInput from "../CardInput"
import { usePayment } from "../../../payment/contexts/PaymentContext"
import useFileUpload from "../../../file-upload/hooks/use-file-upload"
import registerOrder from "../../services/register-order"
import calculatePrice from "./utils/calculate-price"

const Alert = styled(MuiAlert)(spacing)
const TextField = styled(MuiTextField)(spacing)
const MenuItem = styled(MuiMenuItem)(spacing)

const PaymentBox = styled("div")`
  margin-bottom: .5rem;
`

const NUMBER_OF_LOGOS = {
    1 : "$35",
    2 : "$50",
    3 : "$65",
    4 : "$80",
    5 : "$95",
    "6+" : "$110"
}

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  description: yup.string("Logo description or links").required("Required"),
})

const initialValues = {
  name: "",
  email: "",
  numberOfLogos: "1",
  description: "",
}

const LogoRequestForm = () => {
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
          <Typography variant="h6" component="h6" sx={{marginTop: "1.5rem", marginBottom: ".25rem"}}>
              Project Info
            </Typography>
            <Typography variant="caption" component="p" sx={{marginBottom: "1rem"}}>
              Please describe your project in as much detail as possible. If you can, please include an example image of the logo you are requesting.
            </Typography>
          <TextField
            select
            fullWidth
            label="Number of logos"
            name="numberOfLogos"
            value={values.numberOfLogos}
            onChange={handleChange}
            my={2}
          >
            {Object.entries(NUMBER_OF_LOGOS).map(([key, val], i) => (
              <MenuItem key={`number-option-${key}`} value={key}>
               {key} - {val}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            multiline
            fullWidth
            minRows={5}
            name="description"
            label="Project Description"
            aria-label="message text"
            value={values.description}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          {/* <TextField
            multiline
            fullWidth
            minRows={5}
            name="details"
            label="Additional details about the project"
            aria-label="details"
            value={values.details}
            error={Boolean(touched.details && errors.details)}
            helperText={touched.details && errors.details}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          /> */}
          <FileSelector
            files={files}
            setFiles={setFiles}
            uploadProgress={uploadProgress}
          />
          <PaymentBox>
            <Typography variant="h6" component="h6" sx={{marginTop: "1.5rem", marginBottom: ".25rem"}}>
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
            {`Pay $${calculatePrice(values.numberOfLogos)} & Order`}
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

export default LogoRequestForm
