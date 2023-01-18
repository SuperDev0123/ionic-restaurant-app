import React, { useState } from "react"
import { styled, spacing } from "@mui/system"
import Typography from "@mui/material/Typography"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiDivider from "@mui/material/Divider"
import NavLink from "../OurNavLink"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import MuiAlert from "@mui/material/Alert"
import { useRouter } from "next/router"
import axios from "axios"
import copy from "copy-to-clipboard"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)
const Divider = styled(MuiDivider)(spacing)
const Alert = styled(MuiAlert)`
  position: absolute;
  margin-top: 0.5rem;
  ${props => props.theme.breakpoints.up("md")} {
    right: 1rem;
    text-align: right;
  }
`
const PageHeader = ({
  children,
  breadcrumbsItems = [],
  hideDivider = false,
  includeShareButton,
}) => {
  const { asPath } = useRouter()
  const [showShareNotification, setShowShareNotication] = useState(false)

  const getShareLink = () => {
    axios({
      method: "post",
      url: "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyBP05LYQbLsDUdMH0gazmeTimh2FtPSOEE",
      data: {
        dynamicLinkInfo: {
          dynamicLinkDomain: "go.showzone.io",
          link: `http://showzone.io${asPath}`,
        },
      },
    })
      .then(function (response) {
        copy(response.data.shortLink, {
          message: "Copy Your Shareable Link",
          onCopy: setShowShareNotication(true),
        })
      })
      .catch(function (error) {
        console.log(error)
      })

    toast.success(
      "Share link copied to your clipboard.",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      }
    )
  }
  return (
    <>
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item xs={12} sm={10}>
          <Typography variant="h3" component="h1">
            {children}
          </Typography>
        </Grid>
        {includeShareButton ? (
          <Grid item>
            <Button
              sx={{ marginRight: "1rem" }}
              variant="contained"
              onClick={getShareLink}
            >
              Share
            </Button>
            {showShareNotification ? (
              <Alert severity="success">Share link copied to clipboard.</Alert>
            ) : (
              ""
            )}
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        {breadcrumbsItems.map(({ name, href }) =>
          href !== undefined ? (
            <NavLink key={`breadcrumbs-${name}`} href={href}>
              {name}
            </NavLink>
          ) : (
            <Typography key={`breadcrumbs-${name}`}>{name}</Typography>
          )
        )}
      </Breadcrumbs>
      <Divider my={6} />
    </>
  )
}

export default PageHeader
