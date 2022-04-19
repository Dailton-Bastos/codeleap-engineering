import React from 'react'

import { Button } from '~/components/Form/Button'
import { Input } from '~/components/Form/Input'
import { Textarea } from '~/components/Form/Textarea'
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

  const {
    reset: resetContent,
    isError: isErrorContent,
    value: valueContent,
    ...content
  } = useField('text')

  const { isDisabled } = useIsDisabled([valueTitle, valueContent])

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
        <Textarea
          label="Content"
          name="content"
          id="content"
          value={valueContent}
          error={isErrorContent}
          messageError="Type your content here*"
          placeholder="Content here"
          {...content}
        />
      </div>

      <div className={styles.submitButton}>
        <Button disabled={isDisabled}>Create</Button>
      </div>
    </form>
  )
}
