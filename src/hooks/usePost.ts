import React from 'react'

import { parseISO, formatDistance } from 'date-fns'

import { useFetch } from '~/hooks/useFetch'

type PostsProps = {
  id: number
  username: string
  created_datetime: string
  timeDistance: string
  title: string
  content: string
}

type GetPostsResponse = {
  totalCount: number
  posts: PostsProps[]
}

export const useFetchPosts = () => {
  const [data, setData] = React.useState<GetPostsResponse>(
    {} as GetPostsResponse,
  )

  const { error, loading, request } = useFetch()

  React.useEffect(() => {
    async function fetchPosts() {
      const { response } = await request('careers/')

      if (response.status !== 200) return

      const totalCount = response.data?.count

      const posts = response.data?.results.map((post: PostsProps) => {
        return {
          id: post.id,
          username: post.username,
          timeDistance: formatDistance(
            parseISO(post.created_datetime),
            new Date(),
            { addSuffix: true },
          ),
          title: post.title,
          content: post.content,
        }
      })

      setData({ posts, totalCount })
    }

    fetchPosts()
  }, [request])

  return { data, error, loading }
}
