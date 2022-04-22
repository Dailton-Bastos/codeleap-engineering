import React from 'react'

import { api } from '~/services/api'

export const useFetch = () => {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const request = React.useCallback(async (url) => {
    let json
    let response

    try {
      setError(false)
      setLoading(true)
      response = await api.get(url)
      json = response.data
    } catch (_) {
      json = null
      setError(true)
      throw new Error('Error Data')
    } finally {
      setData(json)
      setLoading(false)
    }

    return { response, json }
  }, [])

  return {
    data,
    error,
    loading,
    request,
  }
}
