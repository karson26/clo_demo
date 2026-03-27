import { Product } from '../components/productlist/ProductList'

export const pricingOption = {
    0: 'PAID',
    1: 'FREE',
    2: 'VIEW_ONLY'
}

export const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data'

export const sortProducts = (products: Product[], sort: string): Product[] => {
  const sorted = [...products]
  switch (sort) {
    case 'item-name':
      sorted.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'high-price':
      sorted.sort((a, b) => {
        const aIsPaid = a.pricingOption === 0
        const bIsPaid = b.pricingOption === 0
        if (aIsPaid && !bIsPaid) return -1
        if (!aIsPaid && bIsPaid) return 1
        return b.price - a.price
      })
      break
    case 'low-price':
      sorted.sort((a, b) => {
        const aIsPaid = a.pricingOption === 0
        const bIsPaid = b.pricingOption === 0
        if (aIsPaid && !bIsPaid) return -1
        if (!aIsPaid && bIsPaid) return 1
        return a.price - b.price
      })
      break
  }
  return sorted
}