import React from 'react'

import { AuthProvider } from '~/contexts/AuthContext'

type AppStorageProps = {
  children: React.ReactNode
}

export const AppStorage = ({ children }: AppStorageProps) => {
  return <AuthProvider>{children}</AuthProvider>
}
