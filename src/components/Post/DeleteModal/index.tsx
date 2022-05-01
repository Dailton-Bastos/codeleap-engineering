import React from 'react'

import { Error } from '~/components/Error'
import { Loader } from '~/components/Loader'
import { Modal } from '~/components/Modal'

import styles from './styles.module.scss'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
  isDisabled: boolean
  isError: boolean
}

export const DeleteModal = ({
  onConfirm,
  onCancel,
  onClose,
  isOpen,
  isDisabled = false,
  isError = false,
}: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick>
      <div className={styles.deleteModal}>
        <p>Are you sure you want to delete this item?</p>

        <div className={styles.deleteModalButtons}>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          <button type="button" onClick={onConfirm} disabled={isDisabled}>
            {isDisabled ? <Loader /> : 'OK'}
          </button>
        </div>

        {isError && <Error message="Server error, try again" />}
      </div>
    </Modal>
  )
}
