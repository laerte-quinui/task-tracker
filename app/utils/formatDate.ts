export function formatDate(date?: Date | string): string {
  if (!date) return ''

  const d = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }

  return d.toLocaleString('en-US', options).replace(',', '')
}
