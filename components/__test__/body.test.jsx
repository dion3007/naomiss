import React from 'react'
import {render} from '@testing-library/react'
import Body from '../body'

describe('Body', () => {
  it('show body', () => {
    const {getByTestId} = render(
      <Body>
        <div>test</div>
      </Body>,
    )

    expect(getByTestId('body')).toBeVisible()
  })
})
