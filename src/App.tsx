import React from 'react'

import { AppStorage } from '~/contexts'
import { SignUp } from '~/pages/SignUp'
// import { Posts } from '~/pages/Posts'

export const App = () => {
  return (
    <AppStorage>
      <SignUp />
    </AppStorage>
  )
}
