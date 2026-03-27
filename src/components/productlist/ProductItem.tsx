import React from 'react'
import { Product, pricingOption } from './ProductList'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  const getPriceLabel = () => {
    if (pricingOption[product.pricingOption] === 'PAID') {
      return `$${product.price.toFixed(2)}`
    }
    return pricingOption[product.pricingOption]
  }

  return (
    <div className="product-card">
      <img src={product.imagePath} alt={product.title} className="product-image" />
      <div className="product-info">
        <div className="product-left">
          <h3>{product.title}</h3>
          <p className="product-creator">{product.creator}</p>
        </div>
        <div className="product-right">
          <p className="product-pricing-option">{getPriceLabel()}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductItem