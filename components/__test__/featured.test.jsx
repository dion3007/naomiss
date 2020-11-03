import React from 'react'
import {render} from '@testing-library/react'
import Featured from '../featured'

describe('Featured', () => {
  it('shows logo', () => {
    const {getByTestId} = render(<Featured />)

    expect(getByTestId('image1')).toBeVisible()
    expect(getByTestId('image1')).toHaveAttribute('alt', 'feature 1')
    expect(getByTestId('image2')).toBeVisible()
    expect(getByTestId('image2')).toHaveAttribute('alt', 'feature 2')
    expect(getByTestId('image3')).toBeVisible()
    expect(getByTestId('image3')).toHaveAttribute('alt', 'feature 3')
    expect(getByTestId('image4')).toBeVisible()
    expect(getByTestId('image4')).toHaveAttribute('alt', 'feature 4')
    expect(getByTestId('image5')).toBeVisible()
    expect(getByTestId('image5')).toHaveAttribute('alt', 'feature 5')
    expect(getByTestId('image6')).toBeVisible()
    expect(getByTestId('image6')).toHaveAttribute('alt', 'feature 6')
  })
})
