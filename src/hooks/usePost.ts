import React from 'react'

import { parseISO, formatDistance } from 'date-fns'

import { useAuthContext } from '~/hooks/useAuthContext'

import { useFetch } from './useFetch'

type Post = {
  id: number
  username: string
  created_datetime: string
  timeDistance: string
  title: string
  content: string
}

interface DataResponse {
  count: number
  results: Post[]
}

export function usePosts() {
  const [data, setData] = React.useState<DataResponse>({} as DataResponse)
  const [posts, setPosts] = React.useState<Post[]>([])

  const { request, error, loading } = useFetch()
  const { user } = useAuthContext()

  const handleSubmit = React.useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault()

      const target = event.target as typeof event.target & {
        title: { value: string }
        content: { value: string }
      }

      const isValid = target.title && target.content

      const formData = {
        username: user?.username,
        title: target.title.value,
        content: target.content.value,
      }

      if (!isValid) return

      const { response, json } = await request({
        url: 'careers/',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(formData),
      })

      if (response.status !== 201) return

      const newData = {
        ...data,
        count: data.count + 1,
        results: [...data.results, json],
      }

      setData(newData)
    },
    [user?.username, data, request],
  )

  React.useEffect(() => {
    const formattedPosts =
      data?.results &&
      data?.results
        .map((post: Post) => {
          return {
            ...post,
            timeDistance: formatDistance(
              parseISO(post.created_datetime),
              new Date(),
              { addSuffix: true },
            ),
          }
        })
        .sort(
          (a, b) =>
            new Date(b.created_datetime).getTime() -
            new Date(a.created_datetime).getTime(),
        )

    setPosts(formattedPosts)
  }, [data])

  React.useEffect(() => {
    async function fetchPosts() {
      const { response, json } = await request({
        url: 'careers/',
      })

      if (response.status !== 200) return

      setData(json)
    }

    fetchPosts()
  }, [request])

  return { data, posts, setData, error, loading, handleSubmit }
}
