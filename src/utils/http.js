import axios from 'axios'

function http(options) {
  return axios(options)
    .then(res => res)
    .catch(error => {
      console.log(error)
    })
}

export default http
