import { useCallback } from "react"
import { styled, spacing } from "@mui/system"
import { Formik } from "formik"
import * as yup from "yup"
import MuiTextField from "@mui/material/TextField"
import MuiAlert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import MuiMenuItem from "@mui/material/MenuItem"
import MuiSelect from "@mui/material/Select"
import axios from "axios"

const Alert = styled(MuiAlert)(spacing)
const TextField = styled(MuiTextField)(spacing)
const Select = styled(MuiSelect)(spacing)
const MenuItem = styled(MuiMenuItem)(spacing)

const TOPICS = ["topic1", "topic2", "topic3", "topic4", "topic5"]

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  topic: yup
    .string("Choose the topic of your message")
    .oneOf(TOPICS)
    .required("Topic is required"),
  message: yup.string("Enter your message here").required("Required"),
})

const initialValues = {
  email: "",
  topic: TOPICS[0],
  message: "",
}

const ContactUsForm = () => {
  const handleSubmit = useCallback(
    async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
      try {
        setSubmitting(true)
        await axios.post("/api/tickets", values)
        setStatus({ success: true })
        resetForm()
      } catch (err) {
        const message = error.message || "Something went wrong"

        setStatus({ success: false })
        setErrors({ submit: message })
      } finally {
        setSubmitting(false)
      }
    },
    []
  )
  return (
    <>
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
            <TextField
              fullWidth
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
            <Select
              fullWidth
              label="Topic"
              name="topic"
              value={values.topic}
              onChange={handleChange}
              my={2}
            >
              {TOPICS.map(topic => (
                <MenuItem key={`topic-${topic}`} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
            <TextField
              multiline
              fullWidth
              minRows={10}
              name="message"
              label="Message"
              aria-label="message text"
              value={values.message}
              error={Boolean(touched.message && errors.message)}
              helperText={touched.message && errors.message}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Send your message
            </Button>
          </form>
        )}
      </Formik>
    </>
  )
}

export default ContactUsForm
