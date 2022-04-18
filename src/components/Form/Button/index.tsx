import React from 'react'

import styles from './styles.module.scss'

interface ButtonProps {
  children: string
  disabled?: boolean
}

export const Button = ({ children, disabled }: ButtonProps) => {
  return (
    <div className={styles.buttonWrapper}>
      <button type="submit" disabled={disabled}>
        {children}
      </button>
    </div>
  )
}
