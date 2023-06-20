import moment from 'moment'
export default {
  methods: {
    shortDate(date) {
      const shortDate = moment(date).format('YYYY-MM-DD')
      return shortDate
    },
    dateInHours(date) {
      const hours = moment(date).format('HH:mm:ss')
      return hours
    },
    formatHour(time) {
      // hour is a int value with fraction like 1.1333, I need to convert it to HH:mm
      // validate if time start with 0. and manage it

      const duration = moment.duration(time, 'hours')
      const hour = duration.get('hours')
      const minutes = duration.get('minutes')
      return `${hour.toString().padStart(2, '0')}:${minutes.toString().padEnd(2, '0')}`
    },
    formatddddMMyyyy(date) {
      const formattedDate = moment(date).format('dddd DD/MM/YYYY')
      return formattedDate
    }
  }
}