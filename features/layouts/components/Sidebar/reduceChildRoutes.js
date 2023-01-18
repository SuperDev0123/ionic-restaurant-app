import SidebarNavListItem from "./SidebarNavListItem"
import SidebarNavList from "./SidebarNavList"

const reduceChildRoutes = props => {
  const { items, page, depth, currentRoute, index } = props
  // console.log(`page: ${page.href} & currentRoute: ${currentRoute}`)
  
  if (page.children) {
    //TODO: open the navbar item if page.href === current path
    const open = false
    /*
    const open = page.href
      ? !!matchPath(
          {
            path: page.href,
            end: false,
          },
          currentRoute
        )
      : false
    */

    items.push(
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={page.title + index}
        text={page.text}
        badge={page.badge}
        open={!!open}
        title={page.title}
        href={page.href}
        isNew={page.new}
        isUpdated={page.updated}
        specialFontText={page.specialFontText}
        color={page.color}
      >
        <SidebarNavList depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>
    )
  } else {
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        text={page.text}
        key={page.title + index}
        badge={page.badge}
        title={page.title}
        isNew={page.new}
        isUpdated={page.updated}
        specialFontText={page.specialFontText}
        color={page.color}
      />
    )
  }

  return items
}

export default reduceChildRoutes
