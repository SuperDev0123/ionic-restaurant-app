import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import { styled, spacing } from "@mui/system"
import NavLink from "../OurNavLink"
import Typography from "@mui/material/Typography"
import MuiDivider from "@mui/material/Divider"
const Divider = styled(MuiDivider)(spacing)

const ShowzoneBreadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Breadcrumbs = ({ breadcrumbsItems }) => {
  return (
    <>
      <ShowzoneBreadcrumbs aria-label="Breadcrumb" mt={2}>
        {breadcrumbsItems.map(({ name, href }) =>
          href !== undefined ? (
            <NavLink key={`breadcrumbs-${name}`} href={href}>
              {name}
            </NavLink>
          ) : (
            <Typography key={`breadcrumbs-${name}`}>{name}</Typography>
          )
        )}
      </ShowzoneBreadcrumbs>
    </>
  )
}

export default Breadcrumbs
