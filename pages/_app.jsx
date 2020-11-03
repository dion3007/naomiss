import React from 'react'
import {Provider} from 'react-redux'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'
import makeStore from '../store'

const store = makeStore()

const ArunaApp = ({Component, pageProps}) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

ArunaApp.propTypes = {
  Component: PropTypes.shape.isRequired,
  pageProps: PropTypes.shape.isRequired,
}

export default withRedux(makeStore)(ArunaApp)
