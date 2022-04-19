import React from 'react'

export const useIsDisabled = (values: string[]) => {
  const [isDisabled, setIsDisabled] = React.useState(true)

  function isValid(value: string) {
    return value === ''
  }

  React.useEffect(() => {
    setIsDisabled(values.some(isValid))
  }, [values])

  return { isDisabled }
}
