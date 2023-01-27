import BarChartIcon from "@mui/icons-material/BarChart"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import FeedIcon from "@mui/icons-material/Feed"
import CompareArrowsIcon from "@mui/icons-material/CompareArrows"
import FolderSharedIcon from "@mui/icons-material/FolderShared"
import GroupWorkIcon from "@mui/icons-material/GroupWork"
import DownloadIcon from "@mui/icons-material/Download"
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark"
import BuildIcon from "@mui/icons-material/Build"
import WorkIcon from "@mui/icons-material/Work"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball"
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel"
import CalculateIcon from "@mui/icons-material/Calculate"
import InventoryIcon from "@mui/icons-material/Inventory"

const pagesSection = [
  {
    href: "/news/page/1",
    rootHref: "/news/page/[page]",
    icon: FeedIcon,
    title: "News & Tips",
  },
  {
    href: "",
    icon: RecentActorsIcon,
    title: "Players",
    children: [
      {
        href: "/players",
        rootHref: "/players",
        title: "Player Database",
        // updated: true
      },
      {
        href: "/players/compare",
        rootHref: "/players/compare",
        title: "Compare Players",
        // updated: true
      },
      {
        href: "/players/team-builder",
        rootHref: "/players/team-builder",
        title: "Team Builder",
      },
      {
        href: "/theme-teams",
        rootHref: "/theme-teams",
        title: "Theme Teams",
      },
      {
        href: "/players/quirks",
        rootHref: "/players/quirks",
        title: "Quirks",
      },
    ],
  },
  {
    href: "",
    icon: TrendingUpIcon,
    title: "Market",
    children: [
      {
        href: "/flipping",
        rootHref: "/flipping",
        title: "Flipping",
      },
      {
        href: "/exchanges",
        rootHref: "/exchanges",
        title: "Exchanges",
      },
    ],
  },
  {
    href: "",
    icon: CollectionsBookmarkIcon,
    title: "Collections",
    children: [
      {
        href: "/collections/tracker",
        title: "Check Your Progress",
      },
      {
        href: "/collections/live-series",
        title: "Live Series Collection",
      },
    ],
  },
  {
    href: "/pack-derby",
    icon: ViewCarouselIcon,
    title: "Pack Derby",
  },
  {
    href: "",
    icon: BuildIcon,
    title: "Tools & Resources",
    children: [
      {
        href: "/conquest-maps",
        rootHref: "/conquest-maps",
        title: "Conquest Maps",
      },
      {
        href: "/card-builder",
        title: "Card Builder",
      },
      {
        href: "/calculators/true-overall",
        title: "True Overall™ Calculator",
      },
      {
        href: "/cap-builder",
        title: "CAP Builder",
      },
      {
        href: "/pack-simulator/standard",
        title: "Pack Simulator",
      },
    ],
    // new: true,
  },
  {
    href: "",
    icon: WorkIcon,
    title: "Services",
    children: [
      {
        href: "/services/logos",
        title: "Premium Logos",
      },
      //   {
      //     href: "/services/stadiums",
      //     title: "Premium Stadiums",
      //   },
      {
        href: "/services/caps",
        title: "Premium CAPs",
      },
      {
        href: "/services/jerseys",
        title: "Printed Jerseys",
      },
      {
        href: "/services/enterprise",
        title: "Enterprise Services",
      },
    ],
  },
  {
    href: "/merch",
    icon: ShoppingCartIcon,
    title: "",
    specialFontText: "Merch",
    color: "#c2790c",
  },
  {
    href: "/pro",
    icon: SportsBaseballIcon,
    title: "",
    specialFontText: "Pro",
    color: "#ed2024",
    // text: "Unlock more features"
  },
]

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
]

export default navItems
