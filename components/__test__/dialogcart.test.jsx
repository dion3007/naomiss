import React from 'react'
import {render} from '@testing-library/react'
import DialogCart from '../dialogcart'

describe('DialogCart', () => {
  it('shows dialog', () => {
    const actual = {id: 1, name: 'kepiting', list_price: 1}
    const {getByTestId} = render(<DialogCart product={actual} bool closeCart={() => {}} />)

    expect(getByTestId('text-success')).toBeVisible()
    expect(actual).toMatchObject(actual)
  })
})
