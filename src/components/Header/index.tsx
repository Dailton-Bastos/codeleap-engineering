import React from 'react'
import { RiLogoutCircleLine } from 'react-icons/ri'

import { useAuthContext } from '~/hooks/useAuthContext'

import styles from './styles.module.scss'

export const Header = () => {
  const { signOut } = useAuthContext()

  return (
    <header className={styles.headerContainer}>
      <h1>CodeLeap Network</h1>

      <button type="button" onClick={signOut}>
        <RiLogoutCircleLine size={25} color="#fff" />
      </button>
    </header>
  )
}
