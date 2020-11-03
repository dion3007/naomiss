import React from 'react'
import {render} from '@testing-library/react'
import BreadcrumbsComponent from '../breadcrumbs'

describe('breadCrumbs', () => {
  it('show valid img', () => {
    const {getByTestId} = render(
      <BreadcrumbsComponent productName="load" category={[]} classProp="breadcrumbsDiv" />,
    )

    expect(getByTestId('img-separator')).toBeVisible()
  })
})
