import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootreducer from './reducer'

export default createStore(
  rootreducer,
  applyMiddleware(thunk)
)
