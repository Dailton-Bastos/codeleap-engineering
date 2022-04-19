import React from 'react'

import { Button } from '~/components/Form/Button'
import { Input } from '~/components/Form/Input'
import { useField } from '~/hooks/useField'
import { useIsDisabled } from '~/hooks/useIsDisabled'

import styles from './styles.module.scss'

export const SignUp = () => {
  const { reset, isError, value, ...name } = useField('text')

  const { isDisabled } = useIsDisabled([value])

  const handleSubmit = React.useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault()

      reset()
    },
    [reset],
  )

  return (
    <section className={styles.signUpContainer}>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <h1>Welcome to CodeLeap network!</h1>

        <Input
          label="Please enter your username"
          name="name"
          value={value}
          placeholder="John Doe"
          messageError="This field is required"
          error={isError}
          {...name}
        />

        <div className={styles.submitButton}>
          <Button disabled={isDisabled}>Enter</Button>
        </div>
      </form>
    </section>
  )
}
