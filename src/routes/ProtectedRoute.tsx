import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

import { useAuthContext } from '~/hooks/useAuthContext'

interface ProtectedRouteProps {
  children: React.ReactElement
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthContext()

  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/signup" state={{ from: location }} replace />
  }

  return children
}
