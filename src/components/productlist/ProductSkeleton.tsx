const ProductSkeleton = () => {
  return (
    <div className="product-card skeleton">
      <div className="skeleton-image"></div>
      <div className="product-info">
        <div className="product-left">
          <div className="skeleton-title"></div>
          <div className="skeleton-creator"></div>
        </div>
        <div className="product-right">
          <div className="skeleton-price"></div>
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton