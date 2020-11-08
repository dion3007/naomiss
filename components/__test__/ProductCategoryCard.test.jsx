import React from 'react'
import {render} from '@testing-library/react'
import ProductCategoryCard from '../ProductCategoryCard'

describe('ProductCategoryCard', () => {
  it('shows card on mobile', () => {
    const {getByTestId} = render(
      <ProductCategoryCard
        res={{
          id: 5,
          name: 'Ikan Dasar',
          flag: true,
          images: 'https://www.linkpicture.com/q/productcategoryIkanDasar_Demersal.png',
        }}
        isMobileScreen
        isTabletScreen={false}
      />,
    )

    expect(getByTestId('product-category-card')).toBeVisible()
    expect(getByTestId('product-category-card-image-mobile')).toBeVisible()
  })

  it('shows card on tablet', () => {
    const {getByTestId} = render(
      <ProductCategoryCard
        res={{
          id: 5,
          name: 'Ikan Dasar',
          flag: true,
          images: 'https://www.linkpicture.com/q/productcategoryIkanDasar_Demersal.png',
        }}
        isMobileScreen={false}
        isTabletScreen
      />,
    )

    expect(getByTestId('product-category-card')).toBeVisible()
    expect(getByTestId('product-category-card-image-tablet')).toBeVisible()
  })

  it('shows card on desktop', () => {
    const {getByTestId} = render(
      <ProductCategoryCard
        res={{
          id: 5,
          name: 'Ikan Dasar',
          flag: true,
          images: 'https://www.linkpicture.com/q/productcategoryIkanDasar_Demersal.png',
        }}
        isMobileScreen={false}
        isTabletScreen={false}
      />,
    )

    expect(getByTestId('product-category-card')).toBeVisible()
    expect(getByTestId('product-category-card-image-desktop')).toBeVisible()
  })
})
