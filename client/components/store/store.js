import { createStore } from 'redux'
import rootReducer from './reducers'
import { saveState, loadState } from './localStorage'
import { saveRemoteState } from './remoteStorage'

const presistedState = loadState()
const store = createStore(
  rootReducer,
  presistedState
  )
store.subscribe(() => {
  saveState(store.getState())
})

store.subscribe(() => {
  saveRemoteState(store.getState())
})

export default store
