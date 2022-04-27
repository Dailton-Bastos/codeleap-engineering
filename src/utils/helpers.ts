import { parseISO, formatDistance } from 'date-fns'

export function getTimeDistance(date: string) {
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
  })
}
