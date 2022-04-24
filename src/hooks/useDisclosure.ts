import React from 'react'

export const useDisclosure = () => {
  const [isVisible, setIsVisible] = React.useState(false)

  const onOpen = React.useCallback(() => {
    setIsVisible(true)
  }, [])

  const onClose = React.useCallback(() => {
    setIsVisible(false)
  }, [])

  const onToggle = React.useCallback(() => {
    setIsVisible((prev) => !prev)
  }, [])

  return { isOpen: isVisible, onOpen, onClose, onToggle }
}
