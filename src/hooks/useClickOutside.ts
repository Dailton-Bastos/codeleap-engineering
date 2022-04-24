import React from 'react'

export const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void,
  closeOnEsc = true,
) => {
  const listener = React.useCallback(
    (event: Event) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        handler()
      }
    },
    [ref, handler],
  )

  const handleOnEsc = React.useCallback(
    (event: KeyboardEvent) => {
      const escape = event.key === 'Escape' && closeOnEsc
      if (escape) {
        handler()
      }
    },
    [handler, closeOnEsc],
  )

  React.useEffect(() => {
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchend', listener)
    document.addEventListener('keydown', handleOnEsc)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchend', listener)
      document.removeEventListener('keydown', handleOnEsc)
    }
  }, [listener, handleOnEsc])

  return {}
}
