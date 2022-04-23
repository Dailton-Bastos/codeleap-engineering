import React from 'react'

import { Error } from '~/components/Error'
import { Header } from '~/components/Header'
import { Loader } from '~/components/Loader'
import { Post } from '~/components/Post'
import { Form } from '~/components/Post/Form'
import { usePosts } from '~/hooks/usePost'

import styles from './styles.module.scss'

export const Home = () => {
  const { posts, handleSubmit, error, loading } = usePosts()

  return (
    <main className={styles.mainContainer}>
      <section className={styles.mainWropper}>
        <Header />

        <div className={styles.mainContent}>
          <Form handleSubmit={handleSubmit} isLoading={loading} />

          {error && <Error message="Error" />}

          {loading && (
            <div className={styles.loader}>
              <Loader type="ellipsis" />
            </div>
          )}

          <div className={styles.posts}>
            {posts?.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
