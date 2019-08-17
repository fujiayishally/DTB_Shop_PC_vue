const { readJsonFrom } = require('./utils.js')

function home(req) {
  let result = null
  switch (req.method) {
    case 'GET':
      result = readJsonFrom('./data/homedata.json')
      break
    default:
      result = {
        status: 404,
      }
  }
  return result
}

module.exports = home
