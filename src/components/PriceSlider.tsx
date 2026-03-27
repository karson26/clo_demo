import '../style/PriceSlider.scss'

interface PriceSliderProps {
  priceRange: [number, number]
  onPriceRangeChange: (priceRange: [number, number]) => void
}

const PriceSlider = ({ priceRange, onPriceRangeChange }: PriceSliderProps) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    const newPriceRange: [number, number] = [Math.min(value, priceRange[1] - 100), priceRange[1]]
    onPriceRangeChange(newPriceRange)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    const newPriceRange: [number, number] = [priceRange[0], Math.max(value, priceRange[0] + 100)]
    onPriceRangeChange(newPriceRange)
  }

  const getTrackStyle = () => {
    const minPercent = (priceRange[0] / 900) * 100
    const maxPercent = (priceRange[1] / 1000) * 100
    return {
      left: `${minPercent}%`,
      width: `${maxPercent - minPercent}%`
    }
  }

  return (
    <div className="price-range">
      <span className="option-label">Price Range</span>
      <div className="dual-slider">
        <div className="slider-track" style={getTrackStyle()}></div>
        <input
          type="range"
          min="0"
          max="900"
          step="100"
          value={priceRange[0]}
          onChange={handleMinPriceChange}
          className="price-slider min-slider"
        />
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={priceRange[1]}
          onChange={handleMaxPriceChange}
          className="price-slider max-slider"
        />
      </div>
      <span className="price-value">${priceRange[0]} - ${priceRange[1]}</span>
    </div>
  )
}

export default PriceSlider