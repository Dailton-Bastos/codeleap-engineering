import React from 'react'

import { ModalCloseButton } from './ModalCloseButton'
import { ModalContent } from './ModalContent'
import { ModalOverlay } from './ModalOverlay'
import styles from './styles.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  isCentered?: boolean
  showModalCloseButton?: boolean
  children: React.ReactElement
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  isCentered = false,
  showModalCloseButton = false,
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <section className={styles.modal}>
      <ModalOverlay />

      <div className={styles.modalContainer}>
        <ModalContent isCentered={isCentered}>
          <>
            {showModalCloseButton && <ModalCloseButton onClick={onClose} />}

            <div className={styles.modaBody}>{children}</div>
          </>
        </ModalContent>
      </div>
    </section>
  )
}
