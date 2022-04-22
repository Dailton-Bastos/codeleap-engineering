import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home } from '~/pages/Home'
import { SignUp } from '~/pages/SignUp'
import { ProtectedRoute } from '~/routes/ProtectedRoute'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
