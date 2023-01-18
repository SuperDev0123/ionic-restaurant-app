import * as React from "react"
import OurLink from "../OurLink"

const OurNavLink = React.forwardRef(function OurNavLink(props, ref) {

    
    return (
        <OurLink ref={ref} {...props} />
    )
});

export default OurNavLink
