import React from 'react'
import {render} from '@testing-library/react'
import Footer from '../footer'

describe('Footer', () => {
  it('shows logo', () => {
    const {getByTestId} = render(<Footer />)

    expect(getByTestId('aruna-logo')).toBeVisible()
    expect(getByTestId('aruna-logo')).toHaveAttribute('alt', 'logo aruna')
  })

  it('shows all text', () => {
    const {getByText} = render(<Footer />)

    expect(getByText('Company')).toBeVisible()
    expect(getByText('About Us')).toBeVisible()
    expect(getByText('Help')).toBeVisible()
    expect(getByText('Contact Us')).toBeVisible()
  })

  it('shows all link', () => {
    const {getByTestId} = render(<Footer />)

    expect(getByTestId('facebook-link')).toHaveAttribute(
      'href',
      'https://www.facebook.com/arunaindonesia/',
    )
    expect(getByTestId('twitter-link')).toHaveAttribute(
      'href',
      'https://twitter.com/arunaindonesia',
    )
    expect(getByTestId('instagram-link')).toHaveAttribute(
      'href',
      'https://www.instagram.com/aruna.indonesia',
    )
  })
})
