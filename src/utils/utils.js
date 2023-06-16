export function shortDate(date) {
  const shortDate = moment(date).format('YYYY-MM-DD')
  return shortDate
}

export function dateInHours(date) {
  const hours = moment(date).format('HH:mm:ss')
  return hours
}