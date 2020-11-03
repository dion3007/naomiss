import React from 'react'
import {render} from '@testing-library/react'
import BannerHome from '../banner'

describe('BannerHome', () => {
  it('show banner home', () => {
    const expectedTitle = 'Kepiting'
    const {getByText} = render(
      <BannerHome
        product={null}
        title={expectedTitle}
        banner="/banner/banner.webp"
        filteredCategory={null}
      />,
    )

    expect(getByText(expectedTitle)).toBeVisible()
  })
})
