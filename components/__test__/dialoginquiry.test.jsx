import React from 'react'
import {render} from '@testing-library/react'
import DialogInquiry from '../dialoginquiry'

describe('DialogInquiry', () => {
  it('shows dialog', () => {
    const {getByTestId} = render(
      <DialogInquiry
        text="Inquiry has been sent successfully"
        email="testbla@gmail.com"
        bool
        closeCart={() => {}}
      />,
    )

    expect(getByTestId('dialog')).toBeVisible()
  })
})
