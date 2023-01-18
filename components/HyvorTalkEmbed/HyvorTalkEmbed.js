import { useEffect, useState } from "react"
import HyvorTalk from "hyvor-talk-react"
import useAuth from "@useAuth"
import { useRouter } from "next/router"

const HyvorTalkEmbed = (notTeamBuilder = false) => {
  const { hyvorSSO } = useAuth()
  const router = useRouter()
  const [id, setId] = useState(null)
  useEffect(() => {
    
  }, [hyvorSSO])

  useEffect(() => {
    var queryString = window.location.search
    var urlParams =  new URLSearchParams(queryString);
    if(urlParams.get('hyvor_id')) {
      setId(urlParams.get('hyvor_id'))
    } else {
      if(notTeamBuilder) {
        setId(router.asPath.split("/").pop().split('?').shift())
      }
    }
  }, [])

  if (!hyvorSSO.hash || !hyvorSSO.userData) return null
  

  return (
    <>
      { id ? (<HyvorTalk.Embed
        websiteId={6431}
        id={id}
        sso={{
          ...hyvorSSO,
          loginURL: `https://showzone.io/login?redirect=${router.asPath}`,
          signupURL: "https://showzone.io/register",
        }}
      />) : <></> }
    </>
  )
}

export default HyvorTalkEmbed
