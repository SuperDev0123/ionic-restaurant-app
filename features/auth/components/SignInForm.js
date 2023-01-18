import { styled, spacing } from "@mui/system"
import * as Yup from "yup"
import { Formik } from "formik"
import MuiAlert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import MuiTextField from "@mui/material/TextField"
import { useRouter } from "next/router"
import Link from "@components/OurLink"
import useAuth from "@useAuth"

const Alert = styled(MuiAlert)(spacing)
const TextField = styled(MuiTextField)(spacing)

const SignInForm = () => {
  const { query } = useRouter()
  const { signIn } = useAuth()
  const onSubmit = async (
    { email, password },
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await signIn(email, password, query.redirect)
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
        password: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
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
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
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
            my={2}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          <Button
            component={Link}
            href="/reset-password"
            fullWidth
            color="primary"
          >
            Forgot password
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default SignInForm
