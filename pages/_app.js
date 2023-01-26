import * as React from "react"
import Head from "next/head"
import { ThemeProvider } from "@mui/material/styles"
import { CacheProvider } from "@emotion/react"

import createEmotionCache from "../features/theme/utils/create-emotion-cache"
import findThemeNameClientSide from "../features/theme/utils/find-theme-name-client-side"
import { createTheme } from "../features/theme"
import DashboardLayout from "../features/layouts/DashboardLayout"
import AuthLayout from "../features/layouts/AuthLayout"
import { AuthProvider } from "../features/auth/contexts/AuthContext"
import { NotificationProvider } from "../features/notifications/NotificationContext"
import { PlaywireScript } from "../features/ads/playwire/PlaywireScript";
import { SnackbarProvider } from 'notistack';
import { oswald } from "../features/theme/font";

import '../styles/styles.css'

const previewImage = "/images/preview-image.jpg"

import "../styles/card-builder.scss"
import "../vendor/perfect-scrollbar.css"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    themeName = findThemeNameClientSide(),
  } = props

  const Layout = Component.hideDashboardLayout ? AuthLayout : DashboardLayout

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:image" content={previewImage} key="ogimage" />
      </Head>
      <ThemeProvider theme={createTheme(themeName)}>
        <AuthProvider isProtected={Component.isProtected}>
          <style jsx global>{`
            body {
              font-family: ${oswald.style.fontFamily};
            }
          `}</style>
          <SnackbarProvider
            maxSnack={18}
            preventDuplicate
            hideIconVariant
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <NotificationProvider>
              <PlaywireScript />

              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationProvider>
          </SnackbarProvider>
          
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
