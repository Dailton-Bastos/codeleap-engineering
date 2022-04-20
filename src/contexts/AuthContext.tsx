import React from 'react'

import { api } from '~/services/api'

type User = {
  username: string
}

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextData = {
  signIn: (username: string) => Promise<void>
  user: User | null
  isLoading: boolean
  isError: boolean
}

export const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    const username = window.localStorage.getItem('@codeleap:user')

    if (username) {
      setUser({ username })
    }
  }, [])

  const signIn = React.useCallback(async (username: string) => {
    try {
      setIsLoading(true)

      const response = await api.post('/careers/', {
        username,
        title: `Hi, I'm ${username}!`,
        content: 'Nice to meet you.',
      })

      const { username: name } = response.data

      window.localStorage.setItem('@codeleap:user', name)

      setUser({ username: name })

      setIsLoading(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
      throw new Error('App Error')
    }
  }, [])

  const contextValue = React.useMemo(
    () => ({
      user,
      signIn,
      isLoading,
      isError,
    }),
    [user, signIn, isLoading, isError],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
