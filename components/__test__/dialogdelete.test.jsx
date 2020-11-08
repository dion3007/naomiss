import React from 'react'
import {render} from '@testing-library/react'
import DialogInquiry from '../dialogdelete'

describe('DialogDelete', () => {
  it('shows dialog', () => {
    const {getByTestId} = render(
      <DialogInquiry bool closeCart={() => {}} deleteFunction={() => {}} />,
    )

    expect(getByTestId('dialog')).toBeVisible()
  })
})
