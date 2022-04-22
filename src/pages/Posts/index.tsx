import React from 'react'

import { Error } from '~/components/Error'
import { FormPost } from '~/components/FormPost'
import { Header } from '~/components/Header'
import { Loader } from '~/components/Loader'
import { Post } from '~/components/Post'
import { useFetchPosts } from '~/hooks/usePost'

import styles from './styles.module.scss'

export const Posts = () => {
  const { data, error, loading } = useFetchPosts()

  return (
    <main className={styles.mainContainer}>
      <section className={styles.mainWropper}>
        <Header />

        <div className={styles.mainContent}>
          <FormPost />

          {loading && <Loader />}

          {error && <Error message="Error fetch all posts" />}

          <div className={styles.posts}>
            {data?.posts?.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
