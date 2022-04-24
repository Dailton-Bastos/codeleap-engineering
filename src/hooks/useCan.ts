import { useAuthContext } from './useAuthContext'

type UseCanParams = {
  username: string
}

export const useCan = ({ username }: UseCanParams) => {
  const { user } = useAuthContext()

  return username === user?.username
}
