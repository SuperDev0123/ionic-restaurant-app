const getHomeplatePosts = async () => {
  const homeplatePostsRes = await fetch(
    `https://content.showzone.io/wp-json/wp/v2/posts?per_page=3&tags=2`
  )
  const homeplatePosts = await homeplatePostsRes.json()

  return {
    props: { homeplatePosts },
    revalidate: false, //change this to a number (in seconds) if you want to revalidate the page with new data from api
  }
}

export default getHomeplatePosts
