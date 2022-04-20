import React from 'react'

import styles from './styles.module.scss'

interface ErrorProps {
  message: string
}

export const Error = ({ message }: ErrorProps) => {
  return (
    <div className={styles.errorContainer}>
      <span>{message}</span>
    </div>
  )
}
