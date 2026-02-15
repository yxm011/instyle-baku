import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, X, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const categories = [
  { name: 'Köynəklər', slug: 'koynekler' },
  { name: 'Şalvarlar', slug: 'salvarlar' },
  { name: 'Pencəklər', slug: 'pencekler' },
  { name: 'Ayaqqabılar', slug: 'ayaqqabilar' },
  { name: 'Blazerlər', slug: 'blazerler' },
  { name: 'Gödəkçələr', slug: 'godekceler' },
  { name: 'Aksessuarlar', slug: 'aksessuarlar' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center w-1/3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 luxury-hover"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex flex-col items-center">
              <h1 className="text-lg sm:text-xl md:text-3xl font-serif font-semibold tracking-wider text-luxury-dark">
                STYLE İN BAKU
              </h1>
              <div className="h-px w-16 bg-luxury-gold mt-1"></div>
            </Link>
          </div>

          <div className="flex items-center justify-end w-1/3 gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 luxury-hover"
              aria-label="Axtar"
            >
              <Search size={24} />
            </button>
            <Link
              to="/cart"
              className="p-2 luxury-hover relative"
              aria-label="Səbət"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            searchOpen ? 'max-h-24 pb-4' : 'max-h-0'
          }`}
        >
          <input
            type="text"
            placeholder="Axtar..."
            className="w-full px-4 py-3 border luxury-border focus:outline-none focus:border-luxury-gold transition-colors"
            autoFocus={searchOpen}
          />
        </div>
      </div>

      <div 
        className={`fixed top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-white border-r luxury-border shadow-2xl transform transition-transform duration-500 ease-in-out z-40 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 h-full overflow-y-auto">
          <div className="flex flex-col gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`text-xl font-light luxury-hover py-3 border-b luxury-border transform transition-all duration-300 ${
                  menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{
                  transitionDelay: menuOpen ? `${index * 50}ms` : '0ms'
                }}
                onClick={() => setMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 top-20 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}
