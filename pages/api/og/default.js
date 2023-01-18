import { ImageResponse } from "@vercel/og"
import { getParamValue } from "../../../features/og-image/utils"
import { getHostUrl } from "../../../features/og-image/utils"
import TextLogo from "../../../features/og-image/TextLogo"

export const config = {
  runtime: "experimental-edge",
}

const fontOswaldRegular = fetch(
  new URL("../../../public/fonts/Oswald-Regular.ttf", import.meta.url)
).then(res => res.arrayBuffer())

const fontOswaldBold = fetch(
  new URL("../../../public/fonts/Oswald-Bold.ttf", import.meta.url)
).then(res => res.arrayBuffer())

export default async function handler(req) {
  const fontDataOswaldRegular = await fontOswaldRegular
  const fontDataOswaldBold = await fontOswaldBold
  try {
    const { searchParams } = new URL(req.url)

    const title = getParamValue(searchParams, "title") ?? ""
    const smallText = getParamValue(searchParams, "smallText") ?? ""

    const imageSrc = getHostUrl() + "/images/logo.svg"

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#161616",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexWrap: "nowrap",
            padding: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 75,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "white",
              marginBottom: 100,
              whiteSpace: "pre-wrap",
              textTransform: "uppercase",
              lineHeight: 0.75,
              fontFamily: "Oswald Bold",
            }}
          >
            <span
              style={{
                fontSize: 45,
                display: "flex",
                color: "#ed2024",
              }}
            >
              {smallText}
            </span>
            {title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <TextLogo width={280} height={32} />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Oswald Regular",
            data: fontDataOswaldRegular,
            style: "normal",
          },
          {
            name: "Oswald Bold",
            data: fontDataOswaldBold,
            style: "normal",
          },
        ],
      }
    )
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
