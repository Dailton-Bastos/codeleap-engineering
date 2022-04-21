import React from 'react'
import { useNavigate } from 'react-router-dom'

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
  isAuthenticated: boolean
  signOut: () => void
}

export const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  const navigate = useNavigate()

  React.useEffect(() => {
    const username = window.localStorage.getItem('@codeleap:user')

    if (username) {
      setUser({ username })
      setIsAuthenticated(true)
    }
  }, [])

  const signOut = React.useCallback(() => {
    window.localStorage.removeItem('@codeleap:user')

    setUser({} as User)

    setIsAuthenticated(false)

    navigate('/signup')
  }, [navigate])

  const signIn = React.useCallback(
    async (username: string) => {
      try {
        setIsLoading(true)

        await new Promise((resolve) => {
          if (username) {
            setTimeout(resolve, 2000)
          }
        })

        window.localStorage.setItem('@codeleap:user', username)

        setUser({ username })

        setIsLoading(false)

        setIsAuthenticated(true)

        navigate('/')
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
        signOut()
        throw new Error('App Error')
      } finally {
        setIsLoading(false)
      }
    },
    [navigate, signOut],
  )

  const contextValue = React.useMemo(
    () => ({
      user,
      signIn,
      isLoading,
      isError,
      isAuthenticated,
      signOut,
    }),
    [user, signIn, isLoading, isError, isAuthenticated, signOut],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
