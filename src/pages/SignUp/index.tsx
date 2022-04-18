import React from 'react'

import styles from './styles.module.scss'

export const SignUp = () => {
  return (
    <section className={styles.signUpContainer}>
      <form className={styles.signUpForm}>
        <h1>Welcome to CodeLeap network!</h1>

        <label htmlFor="name">Please enter your username</label>
        <input type="text" id="name" name="name" placeholder="John Doe" />

        <button type="submit" disabled>
          Enter
        </button>
      </form>
    </section>
  )
}
