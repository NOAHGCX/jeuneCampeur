export const readableMinutes = (d: number) => {
  d = Number(d)
  var h = Math.floor(d / 60)
  var m = Math.floor(d % 60)

  var hDisplay = h > 0 ? h + (h == 1 ? " heure" : " heures") : ""
  var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : ""

  return `${hDisplay} ${mDisplay}`
}
