import React from 'react'

import { Button } from '~/components/Form/Button'
import { Input } from '~/components/Form/Input'
import { useAuthContext } from '~/hooks/useAuthContext'
import { useField } from '~/hooks/useField'
import { useIsDisabled } from '~/hooks/useIsDisabled'

import styles from './styles.module.scss'

export const SignUp = () => {
  const { onBlur, onChange, isError, value } = useField('text')

  const { isDisabled } = useIsDisabled([value])

  const { signIn } = useAuthContext()

  const handleSubmit = React.useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault()

      const target = event.target as typeof event.target & {
        name: { value: string }
      }

      if (!target.name) return

      const username = target.name.value

      signIn(username.trim())
    },
    [signIn],
  )

  return (
    <section className={styles.signUpContainer}>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <h1>Welcome to CodeLeap network!</h1>

        <Input
          label="Please enter your username"
          name="name"
          id="name"
          value={value}
          placeholder="John Doe"
          messageError="This field is required"
          error={isError}
          onBlur={onBlur}
          onChange={onChange}
        />

        <div className={styles.submitButton}>
          <Button disabled={isDisabled}>Enter</Button>
        </div>
      </form>
    </section>
  )
}
