// todo: change userNames array to be dynamic with sockets
const userNames = [['Jeremy', 0], ['Kyle', 1], ['RJ', 2], ['Joseph', 3], ['Jeff', 4], ['Justin', 5], ['Jerry', 6], ['Nino', 7]]

const shuffle = array => {
  let j, x, i
  for (i = array.length; i; i--) {
    j = Math.floor(Math.random() * i)
    x = array[i - 1]
    array[i - 1] = array[j]
    array[j] = x
  }
}

shuffle(userNames)

export default userNames
