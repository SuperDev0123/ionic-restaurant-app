const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

module.exports = withPWA({
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    domains: [
      "storage.googleapis.com",
      "content.showzone.io",
      "showzone.io",
      "mlb21.theshow.com",
      "mlb22.theshow.com",
      "solo.to",
      "theshownationsite-production-active-storage.s3.us-east-1.amazonaws.com",
    ],
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  //   pwa: {
  //     dest: "public",
  //     runtimeCaching,
  //     register: true,
  //     skipWaiting: true,
  //     disable: process.env.NODE_ENV === "development",
  //   },
  async redirects() {
    return [
      {
        source: "/news",
        destination: "/news/page/1",
        permanent: false,
      },
      {
        source: "/logos",
        destination: "/services/logos",
        permanent: false,
      },
      {
        source: "/stadiums",
        // destination: "/services/stadiums",
        destination: "/",
        permanent: false,
      },
      {
        source: "/caps",
        destination: "/services/caps",
        permanent: false,
      },
      {
        source: "/merch",
        destination: "https://merch.showzone.io",
        permanent: false,
      },
      {
        source: "/giveaway",
        destination:
          "https://showzone.io/news/mlb-the-show-22-monster-giveaway",
        permanent: true,
      },
      {
        source: "/ads.txt",
        destination:
          "https://config.playwire.com/dyn_ads/1024675/73559/ads.txt",
        permanent: true,
      },
    ]
  },
})
