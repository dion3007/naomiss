import React from 'react'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

import Header from '../header'

const mockStore = configureStore()

describe('Header', () => {
  it('show header', () => {
    const store = mockStore({})

    const {getByTestId} = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    )

    expect(getByTestId('header')).toBeVisible()
  })
})
