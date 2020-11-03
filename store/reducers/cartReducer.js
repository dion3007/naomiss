const reducer = (
  state = {notify: false, notifyEmail: false, cart: null, data: null, error: true, errorMsg: null},
  action,
) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        notify: action.payload,
        data: action.data,
        error: action.error,
        errorMsg: action.errorMsg,
      }
    case 'SUBMIT_INQUIRY':
      return {...state, notifyEmail: action.payload}
    case 'GET_CART':
      return {...state, cart: action.payload}
    default:
      return state
  }
}

export default reducer
