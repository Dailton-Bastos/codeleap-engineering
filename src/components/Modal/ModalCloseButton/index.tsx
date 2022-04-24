import React from 'react'
import { RiCloseLine } from 'react-icons/ri'

import styles from './styles.module.scss'

interface ModalCloseButtonProps {
  onClick: () => void
}

export const ModalCloseButton = ({ onClick }: ModalCloseButtonProps) => {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className={styles.modalCloseButton}
    >
      <RiCloseLine size={20} color="#000" />
    </button>
  )
}
