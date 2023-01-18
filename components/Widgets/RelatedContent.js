import React, { useState, useCallback, useEffect } from "react"
import axios from "axios"
import CardTop from "@components/Typography/CardTop"
import Posts from "@features/home-page/components/PostsSlider/Posts"

const RelatedContent = (props) => {
  const [posts, setPosts] = useState([])

  const fetchData = useCallback(async () => {
    let results = await axios.get(
      `https://content.showzone.io/wp-json/wp/v2/posts/?categories=${props.relatedPostsCategory}&_embed&per_page=6`
    )
    setPosts(results.data)
  })

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Posts small posts={posts} />
    </>
  )
}

export default RelatedContent
