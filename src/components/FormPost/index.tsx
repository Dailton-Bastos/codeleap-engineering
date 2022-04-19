import React from 'react'

import { Button } from '~/components/Form/Button'
import { Input } from '~/components/Form/Input'
import { useField } from '~/hooks/useField'
import { useIsDisabled } from '~/hooks/useIsDisabled'

import styles from './styles.module.scss'

export const FormPost = () => {
  const {
    reset: resetTitle,
    isError: isErrorTitle,
    value: valueTitle,
    ...title
  } = useField('text')

  const { isDisabled } = useIsDisabled([valueTitle])

  return (
    <form className={styles.formContainer}>
      <p>What’s on your mind?</p>

      <Input
        label="Title"
        name="title"
        value={valueTitle}
        id="title"
        placeholder="Hello world"
        messageError="This field is required"
        error={isErrorTitle}
        {...title}
      />

      <div className={styles.formContent}>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" placeholder="Content here" />
      </div>

      <div className={styles.submitButton}>
        <Button disabled={isDisabled}>Create</Button>
      </div>
    </form>
  )
}
