import React from 'react'

import { useAuthContext } from '~/hooks/useAuthContext'

import { useFetch } from './useFetch'

type Post = {
  id: number
  username: string
  created_datetime: string
  timeDistance: string
  title: string
  content: string
  key?: string
}

interface DataResponse {
  count: number
  next?: string
  previous?: string
  results: Post[]
}

export function usePosts() {
  const [data, setData] = React.useState<DataResponse>({} as DataResponse)
  const [isLoading, seIsLoaading] = React.useState(false)
  const [isError, seIsError] = React.useState(false)
  const [page, setPage] = React.useState(0)

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

  const handleDelete = React.useCallback(
    async (postID: number) => {
      await request({
        url: `careers/${postID}/`,
        method: 'DELETE',
      })

      const results = data?.results?.filter((post) => post.id !== postID)

      setData({
        ...data,
        count: data.count - 1,
        results,
      })
    },
    [data, request],
  )

  React.useEffect(() => {
    async function fetchPosts() {
      const { response, json } = await request({
        url: `careers/?limit=10&offset=${page}`,
      })

      if (response.status !== 200) return

      setData((prev) => {
        const currentResults = prev?.results || []

        return {
          ...json,
          results: [...currentResults, ...json.results],
        }
      })
    }

    fetchPosts()
  }, [request, setData, page])

  React.useEffect(() => {
    seIsLoaading(loading)
    seIsError(error)
  }, [loading, error, page])

  return {
    data,
    setData,
    isError,
    isLoading,
    handleSubmit,
    handleDelete,
    setPage,
  }
}
