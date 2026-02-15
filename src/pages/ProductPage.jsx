import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ShoppingCart, Check, ArrowLeft, Share2 } from 'lucide-react'
import { useState } from 'react'
import { getProductById } from '../data/products'

export default function ProductPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart, cartItems } = useCart()
  const [added, setAdded] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const product = getProductById(productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Məhsul tapılmadı</h2>
          <Link to="/" className="text-luxury-gold luxury-hover">
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    )
  }

  const isInCart = cartItems.some((item) => item.id === product.id)
  const productUrl = window.location.href

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(productUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppInquiry = () => {
    const message = `Salam! Bu məhsul haqqında məlumat almaq istəyirəm:\n\n${product.name}\nQiymət: ${product.price} ₼\n\nLink: ${productUrl}\n\nBu məhsul stokda varmı?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=994508380078&text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 luxury-hover mb-8"
        >
          <ArrowLeft size={20} />
          <span>Geri</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-luxury-gray relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-lg font-light">Məhsul Şəkli</span>
            </div>
            {isInCart && (
              <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                <Check size={24} />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <Link
                to={`/category/${product.categorySlug}`}
                className="text-sm text-gray-600 luxury-hover mb-2 inline-block"
              >
                {product.category}
              </Link>
              <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
              <div className="h-px w-24 bg-luxury-gold mb-6"></div>
              <p className="text-3xl text-luxury-gold font-semibold mb-6">{product.price} ₼</p>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-serif mb-4">Xüsusiyyətlər</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full"></div>
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 font-light tracking-wider transition-all duration-300 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-luxury-dark text-white hover:bg-luxury-gold'
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={20} />
                    SƏBƏTƏ ƏLAVƏ EDİLDİ
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart size={20} />
                    SƏBƏTƏ ƏLAVƏ ET
                  </span>
                )}
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-light tracking-wider transition-colors duration-300"
              >
                WHATSAPP İLƏ SORUŞ
              </button>

              <button
                onClick={handleShare}
                className="w-full py-4 border-2 border-luxury-dark luxury-hover font-light tracking-wider flex items-center justify-center gap-2"
              >
                <Share2 size={20} />
                {copied ? 'LİNK KOPYALANDI' : 'LİNKİ PAYLAŞ'}
              </button>
            </div>

            <div className="mt-6 p-4 bg-luxury-gray">
              <p className="text-sm text-gray-600 font-light">
                <strong>Qeyd:</strong> Stok mövcudluğunu yoxlamaq üçün WhatsApp vasitəsilə bizimlə əlaqə saxlayın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
