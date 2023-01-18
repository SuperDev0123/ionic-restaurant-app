import Document, { Html, Head, Main, NextScript } from "next/document"
import createEmotionServer from "@emotion/server/create-instance"
import {
  findThemeNameServerSide,
  createEmotionCache,
} from "../features/theme/utils"
import { createTheme } from "../features/theme"
import config from "../config"
const {
  Google: { measurementId },
} = config

export default class MyDocument extends Document {
  render() {
    const theme = createTheme(this.props.themeName)

    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PJ6LSXF');`,
            }}
          />
          <script async type="text/javascript" src="https://api.goaffpro.com/loader.js?shop=h4hs9WC5VTxM"></script>
          <script async src="/service-worker.js"></script>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme?.palette?.primary?.main} />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo512.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJ6LSXF"
height="0" width="0" style="display:none;visibility:hidden"></iframe`,
            }}
          ></noscript> */}
          <Main />
          <NextScript />
          {/* <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> */}
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  const themeName = findThemeNameServerSide(ctx)

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App =>
        (function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} themeName={themeName} />
        }),
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
    themeName,
  }
}
