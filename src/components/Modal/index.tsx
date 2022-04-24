import React from 'react'

import { useClickOutside } from '~/hooks/useClickOutside'

import { ModalCloseButton } from './ModalCloseButton'
import { ModalContent } from './ModalContent'
import { ModalOverlay } from './ModalOverlay'
import styles from './styles.module.scss'

interface ModalProps {
  isOpen: boolean
  isCentered?: boolean
  showModalCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  onClose: () => void
  children: React.ReactElement
}

export const Modal = ({
  isOpen,
  isCentered = false,
  showModalCloseButton = false,
  closeOnOverlayClick = false,
  closeOnEsc = true,
  onClose,
  children,
}: ModalProps) => {
  const ref = React.useRef<HTMLDivElement>(null)

  useClickOutside(ref, onClose, closeOnEsc)

  if (!isOpen) return null

  return (
    <section className={styles.modal}>
      <ModalOverlay />

      <div className={styles.modalContainer}>
        <ModalContent isCentered={isCentered}>
          <>
            {showModalCloseButton && <ModalCloseButton onClick={onClose} />}

            <div
              className={styles.modaBody}
              ref={closeOnOverlayClick ? ref : null}
            >
              {children}
            </div>
          </>
        </ModalContent>
      </div>
    </section>
  )
}
