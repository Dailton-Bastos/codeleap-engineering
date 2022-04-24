import React from 'react'
import { RiDeleteBin2Fill, RiEditBoxLine } from 'react-icons/ri'

import { Modal } from '~/components/Modal'
import { useAuthContext } from '~/hooks/useAuthContext'
import { useDisclosure } from '~/hooks/useDisclosure'

import { Preview } from './Preview'
import styles from './styles.module.scss'

interface PostProps {
  post: {
    id: number
    username: string
    title: string
    content: string
    timeDistance: string
  }
}

export const Post = ({ post }: PostProps) => {
  const { user } = useAuthContext()
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <article className={styles.postWrapper}>
      <div className={styles.postTitle}>
        <h2>{post.title}</h2>

        {user?.username === post.username && (
          <>
            <div className={styles.postTitleButtons}>
              <button type="button" onClick={onOpen}>
                <RiDeleteBin2Fill color="#fff" size={22} />
              </button>

              <button type="button">
                <RiEditBoxLine color="#fff" size={22} />
              </button>
            </div>

            <Modal
              isOpen={isOpen}
              onClose={() => onClose()}
              showModalCloseButton
              isCentered
            >
              <p>Are you sure you want to delete this item?</p>
            </Modal>
          </>
        )}
      </div>

      <div className={styles.postContent}>
        <div className={styles.postContentAuthor}>
          <strong>{`@${post.username}`}</strong>
          <time>{post.timeDistance}</time>
        </div>

        <Preview>{post.content}</Preview>
      </div>
    </article>
  )
}
