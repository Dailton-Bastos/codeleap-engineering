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
}

export const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    const username = window.localStorage.getItem('@codeleap:user')

    if (username) {
      setUser({ username })
    }
  }, [])

  const signIn = React.useCallback(async (username: string) => {
    try {
      const response = await api.post('/careers/', {
        username,
        title: `Hi, I'm ${username}!`,
        content: 'Nice to meet you.',
      })

      const { username: name } = response.data

      window.localStorage.setItem('@codeleap:user', name)

      setUser({ username: name })
    } catch (error) {
      throw new Error('App Error')
    }
  }, [])

  const contextValue = React.useMemo(
    () => ({
      user,
      signIn,
    }),
    [user, signIn],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
