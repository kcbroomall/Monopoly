import axios from 'axios'

module.exports = {
  isAuth: () => {
    const returnFalseFunc = () => {
      return false
    }

    const returnTrueFunc = () => {
      return true
    }
    if (window.localStorage.token) {
      axios.post('/tokenauth', { token: window.localStorage.token })
      .then((res) => {
        if (res.data.validToken) {
          returnTrueFunc()
        } else {
          returnFalseFunc()
        }
      })
      .catch((err) => {
        returnFalseFunc()
        console.error(err)
      })
    } else {
      return false
    }
  }
}
