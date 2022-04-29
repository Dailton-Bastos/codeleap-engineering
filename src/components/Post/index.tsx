import React from 'react'
import { RiDeleteBin2Fill, RiEditBoxLine } from 'react-icons/ri'

import { Can } from '~/components/Can'
import { Modal } from '~/components/Modal'
import { useDisclosure } from '~/hooks/useDisclosure'
import { useScrollToTop } from '~/hooks/useScroll'

import { DeleteConfirmModal } from './DeleteConfirmModal'
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
  handleDelete: (postID: number) => void
  isLoading: boolean
  isError: boolean
}

export const Post = ({ post, handleDelete, isLoading, isError }: PostProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { targetRef, isAnimation } = useScrollToTop()

  return (
    <>
      <article
        className={`${styles.postWrapper} ${isAnimation ? styles.visible : ''}`}
        key={post.id}
        ref={targetRef}
      >
        <div className={styles.postTitle}>
          <h2>{post.title}</h2>

          <Can username={post.username}>
            <div className={styles.postTitleButtons}>
              <button type="button" onClick={onOpen}>
                <RiDeleteBin2Fill color="#fff" size={22} />
              </button>

              <button type="button">
                <RiEditBoxLine color="#fff" size={22} />
              </button>
            </div>
          </Can>
        </div>

        <div className={styles.postContent}>
          <div className={styles.postContentAuthor}>
            <strong>{`@${post.username}`}</strong>
            <time>{post.timeDistance}</time>
          </div>

          <Preview>{post.content}</Preview>
        </div>
      </article>

      <Can username={post.username}>
        <Modal isOpen={isOpen} onClose={() => onClose()} closeOnOverlayClick>
          <DeleteConfirmModal
            onCancel={onClose}
            onConfirm={() => handleDelete(post.id)}
            isDisabled={isLoading}
            isError={isError}
          />
        </Modal>
      </Can>
    </>
  )
}
