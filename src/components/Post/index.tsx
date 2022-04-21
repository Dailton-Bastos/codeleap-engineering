import React from 'react'
import { RiDeleteBin2Fill, RiEditBoxLine } from 'react-icons/ri'

import { Preview } from './Preview'
import styles from './styles.module.scss'

interface PostProps {
  post: {
    id: number
    username: string
    title: string
    content: string
    created_datetime: string
  }
}

export const Post = ({ post }: PostProps) => {
  return (
    <article className={styles.postWrapper}>
      <div className={styles.postTitle}>
        <h2>{post.title}</h2>
        <div className={styles.postTitleButtons}>
          <button type="button">
            <RiDeleteBin2Fill color="#fff" size={22} />
          </button>

          <button type="button">
            <RiEditBoxLine color="#fff" size={22} />
          </button>
        </div>
      </div>

      <div className={styles.postContent}>
        <div className={styles.postContentAuthor}>
          <strong>{`@${post.username}`}</strong>
          <time>{post.created_datetime}</time>
        </div>

        <Preview>{post.content}</Preview>
      </div>
    </article>
  )
}
