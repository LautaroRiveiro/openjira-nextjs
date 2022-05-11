import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function getDistanceToNow(date: number): string {
  const fromNow = formatDistanceToNow(date, { locale: es })
  return fromNow
}