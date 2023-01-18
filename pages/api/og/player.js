import { ImageResponse } from "@vercel/og"
import TextLogo from "../../../features/og-image/TextLogo"
import { getParamValue } from "../../../features/og-image/utils"

export const config = {
  runtime: "experimental-edge",
}

const fontRoadRage = fetch(
  new URL("../../../public/fonts/RoadRage.ttf", import.meta.url)
).then(res => res.arrayBuffer())

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

    const name = getParamValue(searchParams, "name") ?? ""
    const ovr = getParamValue(searchParams, "ovr") ?? ""
    const ovrTrue = getParamValue(searchParams, "ovrTrue") ?? ""
    const ovrMeta = getParamValue(searchParams, "ovrMeta") ?? ""
    const series = getParamValue(searchParams, "series") ?? ""
    const img =
      getParamValue(searchParams, "img") ??
      "https://storage.googleapis.com/showzone-cloud/card-images/default-actionshot.jpg"

    const imgComponent = img ? (
      <div style={{ display: "flex", marginTop: "15px", marginLeft: "15px", marginRight: "15px" }}>
        <img width={"426"} height={"600"} src={img} />
      </div>
    ) : null

    return new ImageResponse(
      (
        <div
          style={{
            background: "#161616",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              fontStyle: "normal",
              color: "white",
              lineHeight: 1.3,
              whiteSpace: "pre-wrap",
              display: "flex",
            }}
          >
            {imgComponent}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "center",
                width: "700px",
                height: "630px",
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  display: "flex",
                  marginTop: 50,
                  textTransform: "uppercase",
                  color: "#ed2024",
                  fontFamily: "Oswald Bold",
                }}
              >
                {series}
              </div>
              <div
                style={{
                  fontSize: 60,
                  display: "flex",
                  textTransform: "uppercase",
                  fontFamily: "Oswald Bold",
                  marginTop: "-25px",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                    display: "flex",
                    fontFamily: "Oswald Bold",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    background: "#ed2024",
                    height: "110px",
                    lineHeight: 1,
                    padding: "1rem 2rem",
                    margin: "0 1rem",
                  }}
                >
                  OVR
                  <span style={{ display: "flex", fontSize: "40px", fontFamily: "Oswald Bold"}}>
                    {ovr}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "25px",
                    display: "flex",
                    fontFamily: "Oswald Bold",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    background: "#ed2024",
                    height: "110px",
                    lineHeight: 1,
                    padding: "1rem 2rem",
                    margin: "0 1rem",
                  }}
                >
                  TRUE OVR
                  <span style={{ display: "flex", fontSize: "40px" , fontFamily: "Oswald Bold"}}>
                    {ovrTrue}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "25px",
                    display: "flex",
                    fontFamily: "Oswald Bold",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    background: "#ed2024",
                    height: "110px",
                    lineHeight: 1,
                    padding: "1rem 2rem",
                    margin: "0 1rem",
                  }}
                >
                  META OVR
                  <span style={{ display: "flex", fontSize: "40px" , fontFamily: "Oswald Bold"}}>
                    {ovrMeta}
                  </span>
                </div>
              </div>
              <TextLogo width={280} height={32} />
            </div>
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
