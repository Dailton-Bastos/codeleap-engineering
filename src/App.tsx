import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppStorage } from '~/contexts'
import { AppRoutes } from '~/routes'

export const App = () => {
  return (
    <Router>
      <AppStorage>
        <AppRoutes />
      </AppStorage>
    </Router>
  )
}
