import React from 'react'

import styles from './styles.module.scss'

interface ModalContentProps {
  isCentered?: boolean
  children: React.ReactElement
}

export const ModalContent = ({
  isCentered = false,
  children,
}: ModalContentProps) => {
  return (
    <section
      className={styles.modalContent}
      style={{ margin: isCentered ? 'auto' : 'margin: 10.4rem auto' }}
    >
      {children}
    </section>
  )
}
