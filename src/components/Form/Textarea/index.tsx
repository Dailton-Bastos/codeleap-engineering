import React, { TextareaHTMLAttributes } from 'react'

import styles from './styles.module.scss'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  error?: boolean
  messageError?: string
}

export const Textarea = ({
  name,
  label,
  error = false,
  messageError,
  ...rest
}: TextareaProps) => {
  return (
    <div className={styles.textareaContainer}>
      {!!label && <label htmlFor={name}>{label}</label>}

      <textarea
        className={error ? styles.textareaError : ''}
        name={name}
        {...rest}
      />

      {error && <small>{messageError}</small>}
    </div>
  )
}
