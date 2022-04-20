import React, { InputHTMLAttributes } from 'react'

import { Error } from '~/components/Error'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  error?: boolean
  messageError?: string
}

export const Input = ({
  name,
  label,
  error = false,
  messageError,
  ...rest
}: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      {!!label && <label htmlFor={name}>{label}</label>}

      <input className={error ? styles.inputError : ''} name={name} {...rest} />

      {error && messageError && <Error message={messageError} />}
    </div>
  )
}
