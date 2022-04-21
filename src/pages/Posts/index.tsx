import React from 'react'

import { FormPost } from '~/components/FormPost'
import { Header } from '~/components/Header'
import { Post } from '~/components/Post'

import styles from './styles.module.scss'

const post1 = {
  id: 1,
  username: 'Dailton Bastos',
  title: 'My First Post',
  content:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil suscipit reiciendis porro neque. Beatae nisi distinctio vel molestias dolorem nesciunt magnam, dignissimos minima ipsum ex praesentium, porro sequi? Porro, quibusdam? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil suscipit reiciendis porro neque. Beatae nisi distinctio vel molestias dolorem nesciunt magnam, dignissimos minima ipsum ex praesentium, porro sequi? Porro, quibusdam?',
  created_datetime: '2022-04-21T00:10:10.188322Z',
}

const post2 = {
  id: 1,
  username: 'Dailton Bastos',
  title: 'My First Post',
  content: 'Lorem, ipsum dolor sit amet consectetur.',
  created_datetime: '2022-04-21T00:10:10.188322Z',
}

export const Posts = () => {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.mainWropper}>
        <Header />

        <div className={styles.mainContent}>
          <FormPost />

          <div className={styles.posts}>
            <Post post={post1} />

            <Post post={post2} />
          </div>
        </div>
      </section>
    </main>
  )
}
