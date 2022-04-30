import React from 'react'

import { Error } from '~/components/Error'
import { Button } from '~/components/Form/Button'
import { Input } from '~/components/Form/Input'
import { Textarea } from '~/components/Form/Textarea'
import { Loader } from '~/components/Loader'
import { Modal } from '~/components/Modal'
import { useField } from '~/hooks/useField'
import { useIsDisabled } from '~/hooks/useIsDisabled'

import styles from './styles.module.scss'

interface Post {
  id: number
  username: string
  title: string
  content: string
  timeDistance: string
}

interface EditModalProps {
  post: Post
  isOpen: boolean
  isLoading: boolean
  isError: boolean
  onClose: () => void
  handleEditSubmit: (event: React.SyntheticEvent) => Promise<void>
}

export const EditModal = ({
  post,
  isOpen,
  isLoading,
  isError,
  onClose,
  handleEditSubmit,
}: EditModalProps) => {
  const [title, setTitle] = React.useState(post.title)
  const [content, setContent] = React.useState(post.content)

  const { isError: isErrorTitle, onBlur: onBlurTitle } = useField('text')

  const { isError: isErrorContent, onBlur: onBlurContent } = useField('text')

  const { isDisabled } = useIsDisabled([title, content])

  const handleSubmitForm = React.useCallback(
    async (event: React.SyntheticEvent) => {
      await handleEditSubmit(event)

      onClose()
    },
    [onClose, handleEditSubmit],
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()}
      showModalCloseButton
      isCentered
    >
      <form onSubmit={handleSubmitForm} className={styles.formContainer}>
        <p>Edit - {post.title}</p>

        <Input
          label="Title"
          name="titleEdit"
          defaultValue={title}
          id="titleEdit"
          placeholder="Hello world"
          messageError="This field is required"
          error={isErrorTitle}
          onBlur={onBlurTitle}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles.formContent}>
          <Textarea
            label="Content"
            name="contentEdit"
            id="contentEdit"
            defaultValue={content}
            error={isErrorContent}
            messageError="Type your content here"
            placeholder="Content here"
            onBlur={onBlurContent}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {isError && <Error message="Server error, try again" />}

        <input type="hidden" name="post_id" value={post.id} />

        <div className={styles.submitButton}>
          {isLoading && !isDisabled ? (
            <button type="button" disabled>
              <Loader />
            </button>
          ) : (
            <Button disabled={isDisabled}>Save</Button>
          )}
        </div>
      </form>
    </Modal>
  )
}
