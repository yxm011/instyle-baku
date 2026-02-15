import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return

    const baseUrl = window.location.origin
    let message = 'Salam! Aşağıdakı məhsulları sifariş etmək istəyirəm:\n\n'
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Qiymət: ${item.price} ₼\n`
      message += `   Say: ${item.quantity}\n`
      message += `   Cəmi: ${(item.price * item.quantity).toFixed(2)} ₼\n`
      message += `   Link: ${baseUrl}/product/${item.id}\n\n`
    })
    
    message += `Ümumi məbləğ: ${getCartTotal().toFixed(2)} ₼\n\n`
    message += 'Bu məhsullar stokda varmı?'

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=994508380078&text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-3xl font-serif mb-4">Səbətiniz boşdur</h2>
            <p className="text-gray-600 mb-8">Məhsul əlavə etmək üçün kateqoriyalara baxın</p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-luxury-dark text-white hover:bg-luxury-gold transition-colors duration-300 font-light tracking-wider"
            >
              ALIŞVERİŞƏ DAVAM ET
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-serif">Səbət</h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            Səbəti təmizlə
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border luxury-border hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 bg-luxury-gray flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    Şəkil
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="font-serif text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                  <p className="text-luxury-gold font-semibold">{item.price} ₼</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Sil"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center gap-2 border luxury-border">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-luxury-gray transition-colors"
                      aria-label="Azalt"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-luxury-gray transition-colors"
                      aria-label="Artır"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="border luxury-border p-6 sticky top-24">
              <h2 className="text-2xl font-serif mb-6">Xülasə</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Məhsullar ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>{getCartTotal().toFixed(2)} ₼</span>
                </div>
                <div className="border-t luxury-border pt-3">
                  <div className="flex justify-between font-serif text-xl">
                    <span>Cəmi</span>
                    <span className="text-luxury-gold">{getCartTotal().toFixed(2)} ₼</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 font-light tracking-wider transition-colors duration-300 mb-3"
              >
                WHATSAPP İLƏ SİFARİŞ ET
              </button>

              <Link
                to="/"
                className="block w-full text-center border-2 border-luxury-dark py-3 luxury-hover font-light tracking-wider"
              >
                ALIŞVERİŞƏ DAVAM ET
              </Link>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Sifariş WhatsApp vasitəsilə göndəriləcək və stok mövcudluğu yoxlanılacaq
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
