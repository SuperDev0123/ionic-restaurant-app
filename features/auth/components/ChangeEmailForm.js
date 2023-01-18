import { useState } from "react"
import { styled, spacing } from "@mui/system"
import * as Yup from "yup"
import { Formik } from "formik"
import MuiAlert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import MuiTextField from "@mui/material/TextField"

import useAuth from "@useAuth"

const Alert = styled(MuiAlert)(spacing)
const TextField = styled(MuiTextField)(spacing)

const ChangeEmailForm = () => {
  const { changeEmail } = useAuth()
  const [emailSent, setEmailSent] = useState(false)

  const onSubmit = async (
    { email },
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await changeEmail(email)
      setEmailSent(true)
    } catch (error) {
      const message = error.message || "Something went wrong"
      setStatus({ success: false })
      setErrors({ submit: message })
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        email: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={onSubmit}
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
            <Alert mt={2} mb={1} severity="warning">
              {errors.submit}
            </Alert>
          )}
          {emailSent ? (
            <Alert mt={2} mb={1} severity="success">
              Check your email to re-verify your account.
            </Alert>
          ) : (
            ""
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Change Email
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default ChangeEmailForm
