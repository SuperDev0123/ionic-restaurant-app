import { useRouter } from "next/router"

import reduceChildRoutes from "./reduceChildRoutes"

const SidebarNavList = props => {
  const { pages, depth } = props
  const router = useRouter()
  const currentRoute = router.asPath

  const childRoutes = pages.reduce(
    (items, page, index) => reduceChildRoutes({ items, page, currentRoute, depth, index }),
    []
  )

  return <>{childRoutes}</>
}

export default SidebarNavList
