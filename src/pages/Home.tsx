import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/productlist/ProductList'
import '../style/App.scss'

const Home = () => {
  return (
    <div className="home">
      <ProductFilter />
      <ProductList />
    </div>
  )
}

export default Home