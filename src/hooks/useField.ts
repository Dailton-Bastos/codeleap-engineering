import React from 'react'

type EventType = React.ChangeEvent<HTMLInputElement>

export const useField = (type: string) => {
  const [value, setValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)

  const onChange = React.useCallback((event: EventType) => {
    setValue(event.target.value)

    setIsError(!event.target.value)
  }, [])

  const reset = React.useCallback(() => {
    setValue('')
    setIsError(false)
  }, [])

  const onBlur = React.useCallback((event: EventType) => {
    setIsError(!event.target.value)
  }, [])

  return {
    type,
    value,
    onChange,
    onBlur,
    isError,
    reset,
  }
}
