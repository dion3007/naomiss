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
        isDelete
        closeCart={() => {}}
        deleteFunction={() => {}}
        closeDeleteCart={() => {}}
      />,
    )

    expect(getByTestId('dialog')).toBeVisible()
  })
})
