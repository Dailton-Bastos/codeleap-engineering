import React from 'react'

import { FormPost } from '~/components/FormPost'
import { Header } from '~/components/Header'

import styles from './styles.module.scss'

export const Posts = () => {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.mainWropper}>
        <Header />

        <div className={styles.mainContent}>
          <FormPost />
        </div>
      </section>
    </main>
  )
}
