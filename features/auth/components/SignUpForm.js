import { useState } from "react"
import { styled, spacing } from "@mui/system"
import * as Yup from "yup"
import { Formik } from "formik"
import MuiAlert from "@mui/material/Alert"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Button from "@mui/material/Button"
import MuiTextField from "@mui/material/TextField"
import axios from "axios"
import useAuth from "@useAuth"

const Alert = styled(MuiAlert)(spacing)
const TextField = styled(MuiTextField)(spacing)

const SignUpForm = () => {
  const { signUp } = useAuth()
  const [subscribe, setSubscribe] = useState(true)

  const handleSubscribe = event => {
    setSubscribe(event.target.checked)
  }

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    let mail = values.email;
    try {
      if (subscribe) {
        await axios.put("api/newsletter-signup", {
          mail,
        })
      }
      await signUp(values.email, values.password, values.displayName)
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
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        displayName: Yup.string().max(255).required("Display Name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string()
          .min(12, "Must be at least 12 characters")
          .max(255)
          .required("Required"),
        confirmPassword: Yup.string().when("password", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
          ),
        }),
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
          <TextField
            type="text"
            name="displayName"
            label="Display Name"
            value={values.displayName}
            error={Boolean(touched.displayName && errors.displayName)}
            fullWidth
            helperText={touched.displayName && errors.displayName}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
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
            my={3}
          />
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={values.confirmPassword}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={subscribe}
                onChange={handleSubscribe}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Join the ShowZone Newsletter and stay up-to-date on everything MLB The Show."
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            size="large"
            sx={{ marginTop: "1rem" }}
          >
            Register
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default SignUpForm
