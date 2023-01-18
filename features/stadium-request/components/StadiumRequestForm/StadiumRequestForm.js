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
import { usePayment } from "../../../payment/contexts/PaymentContextStadiums"
import useFileUpload from "../../../file-upload/hooks/use-file-upload"
import registerOrder from "../../services/register-order"
import calculatePriceStadiums from "./utils/calculate-price-stadiums"

const Alert = styled(MuiAlert)(spacing)
const TextField = styled(MuiTextField)(spacing)
const MenuItem = styled(MuiMenuItem)(spacing)

const PaymentBox = styled("div")`
  margin-bottom: .5rem;
`

const STADIUM_PACKAGES = {
    "Basic" : "$25",
    "Standard" : "$50",
    "Elite" : "$75",
}

const STADIUM_SCENERIES = [
    "Urban",
    "Suburban",
    "Rural",
    "Mountains",
    "Canyons",
    "Waterfront",
    "I don't care! Get creative!"
]

const STADIUM_ELEVATIONS = [
    "0-1000 ft",
    "1001-2000 ft",
    "2001-3000 ft",
    "3001-MAX ft",
]

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  description: yup.string("Stadium description or links").required("Required"),
})

const initialValues = {
  name: "",
  email: "",
  stadiumPackage: "Basic",
  description: "",
  stadiumElevation: "0-1000 ft",
  stadiumScenery: "Urban"
}

const StadiumRequestForm = () => {
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
              Please describe your project in as much detail as possible.
            </Typography>
          <TextField
            select
            fullWidth
            label="Stadium Package"
            name="stadiumPackage"
            value={values.stadiumPackage}
            onChange={handleChange}
            my={2}
          >
            {Object.entries(STADIUM_PACKAGES).map(([key, val], i) => (
              <MenuItem key={`number-option-${key}`} value={key}>
               {key} - {val}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            name="stadiumName"
            label="Stadium Name"
            aria-label="stadiumName"
            value={values.stadiumName}
            helperText={"Leave blank if you'd like us to select a name."}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            select
            fullWidth
            label="Stadium Scenery"
            name="stadiumScenery"
            value={values.stadiumScenery}
            onChange={handleChange}
            my={2}
          >
            {STADIUM_SCENERIES.map((scenery) => (
              <MenuItem key={`number-option-${scenery}`} value={scenery}>
               {scenery}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Stadium Elevation"
            name="stadiumElevation"
            value={values.stadiumElevation}
            onChange={handleChange}
            my={2}
          >
            {STADIUM_ELEVATIONS.map((elevation) => (
              <MenuItem key={`number-option-${elevation}`} value={elevation}>
               {elevation}
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
            helperText={"Describe the stadium you want us to build or give us inspiration to build your dream stadium. You can attach samples using the upload field below."}
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
            {`Pay $${calculatePriceStadiums(values.stadiumPackage)} & Order`}
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

export default StadiumRequestForm
