import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductItem from '../ProductItem'
import { Product } from '../ProductList'

const mockProduct: Product = {
  id: '1',
  creator: 'Test Creator',
  title: 'Test Product',
  pricingOption: 0,
  imagePath: '/test-image.jpg',
  price: 99.99,
}

describe('ProductItem', () => {
  test('should render product information correctly', () => {
    render(<ProductItem product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Creator')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  test('should render FREE pricing option', () => {
    const freeProduct: Product = {
      ...mockProduct,
      pricingOption: 1,
    }
    render(<ProductItem product={freeProduct} />)

    expect(screen.getByText('FREE')).toBeInTheDocument()
  })

  test('should render VIEW_ONLY pricing option', () => {
    const viewOnlyProduct: Product = {
      ...mockProduct,
      pricingOption: 2,
    }
    render(<ProductItem product={viewOnlyProduct} />)

    expect(screen.getByText('VIEW_ONLY')).toBeInTheDocument()
  })

  test('should render product image with correct alt text', () => {
    const { container } = render(<ProductItem product={mockProduct} />)
    const image = container.querySelector('img')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test Product')
  })
})