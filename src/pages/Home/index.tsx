import React from 'react'

import { Error } from '~/components/Error'
import { Header } from '~/components/Header'
import { Loader } from '~/components/Loader'
import { Post } from '~/components/Post'
import { Form } from '~/components/Post/Form'
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
}

export const Home = () => {
  const { handleSubmit, data, handleDelete, isLoading, isError } = usePosts()
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    const formattedPosts =
      data?.results &&
      data?.results
        .map((post: Post) => {
          return {
            ...post,
            timeDistance: getTimeDistance(post.created_datetime),
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

          {isError && <Error message="Server error, try again" />}

          {isLoading && (
            <div className={styles.loader}>
              <Loader type="ellipsis" />
            </div>
          )}

          <div className={styles.posts}>
            {posts &&
              posts.map((post) => (
                <Post
                  post={post}
                  key={post.id}
                  handleDelete={handleDelete}
                  isLoading={isLoading}
                  isError={isError}
                />
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
