import React from 'react'

import { Button } from '~/components/Form/Button'
import { Input } from '~/components/Form/Input'
import { useField } from '~/hooks/useField'

import styles from './styles.module.scss'

export const SignUp = () => {
  const { reset, isError, isDisabled, ...name } = useField('text')

  const handleSubmit = React.useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault()

      const target = event.target as typeof event.target & {
        name: { value: string }
      }

      const username = target.name.value

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
