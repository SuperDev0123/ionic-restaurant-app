import { useEffect } from "react"
import { useRouter } from "next/router"
import Script from "next/script"
import { ramp } from "./rampObj";
import { rampConfig } from "./config";
import useAuth from "@useAuth";

export const PlaywireScript = () => {
    const router = useRouter();
    const { currentUserIsSilverPlus, userLoaded } = useAuth();

    useEffect(() => {
        async function displayAds() {
            if(ramp.__isInitialized){
                await ramp.__displayAds(router.asPath);
            }
        }

        displayAds();
    }, [router.asPath]);

    let theScript = null;

    if (userLoaded && !currentUserIsSilverPlus) {
        if(typeof window !== 'undefined') window.ramp = ramp;
        const src = `//cdn.intergient.com/${rampConfig.publisherId}/${rampConfig.websiteId}/ramp.js`;
        theScript = (
            <Script type="text/javascript"
                async="true"
                src={src}
            />
        );
    }

    return (
        <>
            {theScript}
        </>
    );
}