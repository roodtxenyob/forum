module.exports = function(timestamp:any) {
  let time = new Date(timestamp)
  let year:any = time.getFullYear()
  let month:any = time.getMonth() + 1
  let date:any = time.getDate()
  let hours:any = time.getHours()
  let minute:any = time.getMinutes()
  let second:any = time.getSeconds()

  if (month < 10) { month = '0' + month }
  if (date < 10) { date = '0' + date }
  if (hours < 10) { hours = '0' + hours }
  if (minute < 10) { minute = '0' + minute }
  if (second < 10) { second = '0' + second }
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
}
