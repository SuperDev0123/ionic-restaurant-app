import { useState } from "react"
import { styled, spacing } from "@mui/system"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from "@components/Buttons/Button"
import Input from "@mui/material/Input"
import MuiCard from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';

const Card = styled(MuiCard)(spacing)

const Spacer = styled("div")(spacing)

function NewsletterSignUp() {
  const [mail, setMail] = useState(null)
  const [loading, setLoading] = useState(false)

  const subscribe = () => {
    setLoading(true)
    axios
      .put("api/newsletter-signup", {
        mail,
      })
      .then(result => {
        if (result.status === 200) {
            toast.success("Your email has been succesfully added to the mailing list.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "dark",
                });
          setLoading(false)
        }
      })
      .catch(err => {
        toast.error("There has been an error, please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
            });
        setLoading(false)
      })
  }

  return (
    <Card>
      <Paper elevation={0}>
        <Box mx={2}>
          <CardContent>
            <Typography variant="p" gutterBottom>
              Stay up-to-date on everything MLB The Show.
            </Typography>
            <Spacer mb={2} />
            <Input
              fullWidth
              placeholder="Your email address..."
              type="email"
              id="member_email"
              onChange={e => {
                setMail(e.target.value)
              }}
            />
            <Spacer mb={4} />
            <Button type="submit" variant="filled" size="sm" onClick={subscribe}>
              Subscribe
            </Button>
          </CardContent>
        </Box>
      </Paper>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Card>
  )
}

export default NewsletterSignUp
