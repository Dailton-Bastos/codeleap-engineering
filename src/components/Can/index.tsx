import React from 'react'

import { useCan } from '~/hooks/useCan'

interface CanProps {
  children: React.ReactNode
  username: string
}

export const Can = ({ children, username }: CanProps) => {
  const userCanSeeComponent = useCan({ username })

  if (!userCanSeeComponent) return null

  return <> {children} </>
}
