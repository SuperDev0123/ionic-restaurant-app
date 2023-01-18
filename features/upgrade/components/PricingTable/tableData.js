import IncludedIcon from "./components/IncludedIcon"
import NotIncludedIcon from "./components/NotIncludedIcon"

/*
 * Pricing table data object:
 *
 * {
 *   plans: [
 *     {
 *       title: Text,
 *       captionBeforePrice: Text,
 *       price: Text,
 *       captionAfterPrice: Text,
 *       mobileOrder: Number,
 *       recommended: Boolean (true or false)
 *     },
 *     ...
 *   ],
 *   features: [
 *     {
 *       title: Text,
 *       tooltip: Text,
 *       caption: Text, (the helper text)
 *       states: [] (Array of Text or React Components)
 *     }
 *   ]
 * }
 *
 * (!) If you want to change the order of mobile tabs, all 'plans' objects must
 * have 'mobileOrder' parameter.
 * */

const tableData = {
  plans: [
    {
      title: "Bronze",
      captionBeforePrice: "Best for getting started.",
      priceMonthly: "Free",
      priceAnnualPerMonth: "Free",
      mobileOrder: 1,
      priceIdMonthly: "",
      priceIdAnnual: "",
    },
    {
      title: "Silver",
      captionBeforePrice: "Best if you just want access to the Discord server.",
      captionAfterPrice: "And never see ads again!",
      priceMonthly: "$2/month",
      priceAnnual: "$10/year",
      priceAnnualPerMonth: "$0.83/month",
      mobileOrder: 3,
      priceIdMonthly: "price_1L7BljJ9DqRcRXvvEHeU02Y9",
      priceIdAnnual: "price_1JKtFWJ9DqRcRXvvcWnSlH2p",
    },
    {
      title: "Gold",
      captionBeforePrice: "Best for market hustlers and serious gamers.",
      priceMonthly: "$5/month",
      priceAnnual: "$45/year",
      priceAnnualPerMonth: "$3.75/month",
      captionAfterPrice: "Best tools for making stubs fast!",
      mobileOrder: 2,
      priceIdMonthly: "price_1JKtHHJ9DqRcRXvvwE3s1wow",
      priceIdAnnual: "price_1L4CfcJ9DqRcRXvvpHtVgI92",
      recommended: true,
    },
    {
      title: "Diamond",
      captionBeforePrice: "Best for streamers and content creators.",
      captionAfterPrice: "Annual plans include a free shirt.",
      priceMonthly: "$10/month",
      priceAnnual: "$60/year",
      priceAnnualPerMonth: "$5/month",
      mobileOrder: 1,
      priceIdMonthly: "price_1JKtJlJ9DqRcRXvvhbuo1d7q",
      priceIdAnnual: "price_1JjbdgJ9DqRcRXvvDFUJaNkq",
    },
  ],
  features: [
    {
      title: "Review Player Cards",
      caption: "Let the world know how you really feel about specific cards.",
      states: [
        <IncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "Favorite Player Cards",
      caption:
        "Easily save your favorite player cards to easily find them later.",
      states: [
        <IncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "Inventory Management",
      caption: "Download your inventory directly from TheShow.com",
      states: [
        <IncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "Save Team Builder Rosters",
      caption:
        "Build your dream team using our Team Builder tool, then save and share your favorite rosters.",
      states: [
        "Coming Soon",
        "Coming Soon",
        "Coming Soon",
        "Coming Soon",
      ],
    },
    {
      title: "Discord Access",
      caption: "Full access to the exclusive ShowZone Pro Discord server.",
      states: [
        <NotIncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "Ad Free Experience",
      caption: "Browse ShowZone without ads on the website and mobile app.",
      states: [
        <NotIncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
        title: "Collection Progress Tracker",
        caption:
          "Find out exactly how many cards and stubs you need to finish the Live Series and Legend Collections.",
        states: [
          "Included For Limited Time",
          "Included For Limited Time",
          <IncludedIcon />,
          <IncludedIcon />,
        ],
      },
    {
      title: "Team Builder Roster Generator",
      caption:
        "Automatically generate the best roster possible based on contraints you set.",
      states: [
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "1-Minute Price Updates for Flipping",
      caption:
        "Prices on the Flipping page will update every minute - 5x faster than non-Pro members!",
      states: [
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "1-Minute Price Updates for Exchanges",
      caption:
        "Prices on the Exchange page will update every minute - 5x faster than non-Pro members!",
      states: [
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "Downloadable Data",
      states: [
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <IncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "Discord Diamond Role",
      states: [
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
      title: "White Label Card Builder",
      caption: "Download your Card Builder creations without the ShowZone logo.",
      states: [
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <IncludedIcon />,
      ],
    },
    {
        title: "ShowZone Merch Discount",
        caption: "Save 10% on ShowZone Merch.",
        states: [
          <NotIncludedIcon />,
          <NotIncludedIcon />,
          <NotIncludedIcon />,
          <IncludedIcon />,
        ],
      },
    {
      title: "Free ShowZone Merch Shirt",
      states: [
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        <NotIncludedIcon />,
        "Annual Plans Only",
      ],
    },
  ],
}

export default tableData
