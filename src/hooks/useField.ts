import React from 'react'

type EventType = React.ChangeEvent<HTMLInputElement>

export const useField = (type: string) => {
  const [value, setValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(true)

  const onChange = React.useCallback((event: EventType) => {
    setIsDisabled(!event.target.value)

    setValue(event.target.value)

    setIsError(!event.target.value)
  }, [])

  const reset = React.useCallback(() => {
    setValue('')
    setIsError(false)
    setIsDisabled(true)
  }, [])

  const onBlur = React.useCallback((event: EventType) => {
    setIsDisabled(!event.target.value)
    setIsError(!event.target.value)
  }, [])

  return {
    type,
    value,
    onChange,
    onBlur,
    isError,
    reset,
    isDisabled,
  }
}
