import React from 'react'

import styles from './styles.module.scss'

interface LoaderProps {
  type?: 'ring' | 'ellipsis'
}

export const Loader = ({ type = 'ring' }: LoaderProps) => {
  return (
    <div
      className={type === 'ring' ? styles.loaderRing : styles.loaderEllipsis}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
