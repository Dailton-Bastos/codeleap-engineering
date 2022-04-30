import React from 'react'

import { v4 as uuidv4 } from 'uuid'

import { Error } from '~/components/Error'
import { Header } from '~/components/Header'
import { Loader } from '~/components/Loader'
import { Post } from '~/components/Post'
import { Form } from '~/components/Post/Form'
import { ScrollButtonTop } from '~/components/ScrollButtonTop'
import { usePosts } from '~/hooks/usePost'
import { getTimeDistance } from '~/utils/helpers'

import styles from './styles.module.scss'

type Post = {
  id: number
  username: string
  created_datetime: string
  timeDistance: string
  title: string
  content: string
  key?: string
}

export const Home = () => {
  const {
    data,
    isError,
    isLoading,
    setPage,
    handleSubmit,
    handleDelete,
    handleEditSubmit,
  } = usePosts()

  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    const formattedPosts =
      data?.results &&
      data?.results
        .map((post: Post) => {
          return {
            ...post,
            timeDistance: getTimeDistance(post.created_datetime),
            key: uuidv4(),
          }
        })
        .sort(
          (a, b) =>
            new Date(b.created_datetime).getTime() -
            new Date(a.created_datetime).getTime(),
        )

    setPosts(formattedPosts)
  }, [data])

  return (
    <main className={styles.mainContainer}>
      <section className={styles.mainWropper}>
        <Header />

        <div className={styles.mainContent}>
          <Form handleSubmit={handleSubmit} isLoading={isLoading} />

          <div className={styles.posts}>
            {posts &&
              posts.map((post) => (
                <Post
                  post={post}
                  key={post.key}
                  handleDelete={handleDelete}
                  handleEditSubmit={handleEditSubmit}
                  isLoading={isLoading}
                  isError={isError}
                />
              ))}
          </div>

          {isError && <Error message="Server error, try again" />}

          {isLoading && (
            <div className={styles.loader}>
              <Loader type="ellipsis" />
            </div>
          )}

          {posts && (
            <p>
              Showing <strong>{posts?.length}</strong> of{' '}
              <strong>{data?.count}</strong>
            </p>
          )}

          {!isLoading && data?.next && (
            <button
              type="button"
              className={styles.buttonFetchMore}
              onClick={() => setPage((prev) => prev + 10)}
            >
              Load more posts
            </button>
          )}
        </div>
      </section>

      <ScrollButtonTop />
    </main>
  )
}
