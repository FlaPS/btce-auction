const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC',
}

export default new Intl.DateTimeFormat('en-US', options)

export const weekDayFormat = new Intl.DateTimeFormat('en-US', {weekday: 'long', timeZone: 'UTC'})

export const shortDateFormat = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', timeZone: 'UTC'})

