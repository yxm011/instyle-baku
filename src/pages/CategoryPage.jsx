import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { generateProducts, getCategoryData } from '../data/products'

export default function CategoryPage() {
  const { categoryName } = useParams()
  const category = getCategoryData(categoryName)
  const { addToCart, cartItems } = useCart()
  const [addedItems, setAddedItems] = useState({})

  const products = generateProducts(categoryName)

  const handleAddToCart = (product) => {
    addToCart(product)
    setAddedItems({ ...addedItems, [product.id]: true })
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">{category.name}</h1>
        <div className="h-px w-24 bg-luxury-gold mx-auto mb-6"></div>
        <p className="text-center text-gray-600 font-light">
          {category.count} məhsul
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <Link to={`/product/${product.id}`}>
              <div className="aspect-[3/4] bg-luxury-gray mb-3 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {isInCart(product.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </Link>
            <div className="text-center">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-light text-sm md:text-base mb-2 luxury-hover">
                  {product.name}
                </h3>
              </Link>
              <p className="text-luxury-gold font-semibold mb-3">{product.price} ₼</p>
              <button
                onClick={() => handleAddToCart(product)}
                className={`w-full py-2 text-sm font-light tracking-wider transition-all duration-300 ${
                  addedItems[product.id]
                    ? 'bg-green-500 text-white'
                    : 'border border-luxury-dark luxury-hover'
                }`}
              >
                {addedItems[product.id] ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} />
                    ƏLAVƏ EDİLDİ
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart size={16} />
                    SƏBƏTƏ ƏLAVƏ ET
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
