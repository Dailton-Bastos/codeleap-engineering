import React from 'react'

import { Error } from '~/components/Error'
import { Loader } from '~/components/Loader'

import styles from './styles.module.scss'

interface DeleteConfirmModalProps {
  onConfirm: () => void
  onCancel: () => void
  isDisabled: boolean
  isError: boolean
}

export const DeleteConfirmModal = ({
  onConfirm,
  onCancel,
  isDisabled = false,
  isError = false,
}: DeleteConfirmModalProps) => {
  return (
    <div className={styles.deleteConfirmModal}>
      <p>Are you sure you want to delete this item?</p>

      <div className={styles.deleteConfirmModalButtons}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <button type="button" onClick={onConfirm} disabled={isDisabled}>
          {isDisabled ? <Loader /> : 'OK'}
        </button>
      </div>

      {isError && <Error message="Server error, try again" />}
    </div>
  )
}
