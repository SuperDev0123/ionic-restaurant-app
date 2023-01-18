import React, { useState } from "react"
import { styled, spacing } from "@mui/system"
import Button from "@components/Buttons/Button"
import NavLink from "../OurNavLink"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"
import { useRouter } from "next/router"
import copy from "copy-to-clipboard"
import axios from "axios"
import MuiDivider from "@mui/material/Divider"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function SectionHeader(props) {
  const { asPath } = useRouter()
  const [showShareNotification, setShowShareNotication] = useState(false)
  const Divider = styled(MuiDivider)(spacing)

  const ShowzoneBreadcrumbs = styled(MuiBreadcrumbs)`
    margin-bottom: 0.25rem;
    li,
    p,
    a {
      font-size: 12px;
      line-height: 1;
    }
  `

  const Styles = styled("div")`
    h1,
    h2 {
      text-transform: uppercase;
      font-size: 3rem;
      line-height: 1;
      margin-bottom: 1.5rem;
      margin-left: 1rem;
      ${props => props.theme.breakpoints.up("md")} {
        font-size: 4rem;
      }
    }
    h1 span,
    h2 span {
      color: #ed2024;
      display: block;
      font-size: 1rem;
      margin-left: -1rem;
      ${props => props.theme.breakpoints.up("md")} {
        font-size: 1.5rem;
      }
    }
  `

  const Heading = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `

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
        })
        toast.success("Share link copied to clipboard.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        })
      })
      .catch(function (error) {
        toast.error("Issue creating share link.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        })
      })
  }

  return (
    <Styles>
      {props.h2 ? (
        <h2>
          <span>{props.smallText + " "}</span>
          {props.title}
        </h2>
      ) : (
        <>
          {props.breadcrumbsItems ? (
            <ShowzoneBreadcrumbs aria-label="Breadcrumb" mt={2}>
              {props.breadcrumbsItems.map(({ name, href }) =>
                href !== undefined ? (
                  <NavLink key={`breadcrumbs-${name}`} href={href}>
                    {name}
                  </NavLink>
                ) : (
                  <Typography key={`breadcrumbs-${name}`}>{name}</Typography>
                )
              )}
            </ShowzoneBreadcrumbs>
          ) : (
            ""
          )}
          <Heading>
            <h1 style={{ marginRight: "2rem" }}>
              <span>{props.smallText + " "}</span>
              {props.title}
            </h1>
            {props.shareButton ? (
              <>
                <Button onClick={getShareLink}>Share</Button>
              </>
            ) : (
              ""
            )}
          </Heading>
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
        </>
      )}
    </Styles>
  )
}

export default SectionHeader
