import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'

const makeStore = (initialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
}

export {makeStore as default}
