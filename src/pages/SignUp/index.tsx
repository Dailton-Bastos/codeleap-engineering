import React from 'react'
import { Navigate } from 'react-router-dom'

import { Error } from '~/components/Error'
import { Button } from '~/components/Form/Button'
import { Input } from '~/components/Form/Input'
import { Loader } from '~/components/Loader'
import { useAuthContext } from '~/hooks/useAuthContext'
import { useField } from '~/hooks/useField'
import { useIsDisabled } from '~/hooks/useIsDisabled'

import styles from './styles.module.scss'

export const SignUp = () => {
  const { onBlur, onChange, isError, value } = useField('text')

  const { isDisabled } = useIsDisabled([value])

  const {
    signIn,
    isLoading,
    isError: authError,
    isAuthenticated,
  } = useAuthContext()

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

  if (isAuthenticated) return <Navigate to="/" />

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

        {authError && <Error message="Error, please try again." />}

        <div className={styles.submitButton}>
          {isLoading ? (
            <button type="button" disabled>
              <Loader />
            </button>
          ) : (
            <Button disabled={isDisabled}>Enter</Button>
          )}
        </div>
      </form>
    </section>
  )
}
