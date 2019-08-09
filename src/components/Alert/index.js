import Notification from './notification'

let alertInstance
function getAlertInstance() {
  alertInstance = alertInstance || Notification.newInstance()
  return alertInstance
}
function alert({ duration = 1.5, content = '' }) {
  let instance = getAlertInstance()

  instance.add({
    content,
    duration,
  })
}

export default {
  info(options) {
    return alert(options)
  },
}
