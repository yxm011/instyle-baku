import { createContext, useContext, useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const { currentUser } = useAuth()
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('styleInBakuCart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [isLoadingCart, setIsLoadingCart] = useState(false)

  // Load cart from Firebase when user logs in
  useEffect(() => {
    async function loadCartFromFirebase() {
      if (currentUser) {
        setIsLoadingCart(true)
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
          if (userDoc.exists() && userDoc.data().cart) {
            const firebaseCart = userDoc.data().cart
            const localCartString = localStorage.getItem('styleInBakuCart')
            const localCart = localCartString ? JSON.parse(localCartString) : []
            
            // Merge local cart with Firebase cart (combine items, keep higher quantities)
            const mergedCart = [...firebaseCart]
            localCart.forEach(localItem => {
              const existingIndex = mergedCart.findIndex(item => item.id === localItem.id)
              if (existingIndex >= 0) {
                // Keep higher quantity
                if (localItem.quantity > mergedCart[existingIndex].quantity) {
                  mergedCart[existingIndex] = localItem
                }
              } else {
                mergedCart.push(localItem)
              }
            })
            
            setCartItems(mergedCart)
            // Clear localStorage after merging
            localStorage.removeItem('styleInBakuCart')
          }
        } catch (error) {
          console.warn('Failed to load cart from Firebase:', error)
        }
        setIsLoadingCart(false)
      }
    }
    
    loadCartFromFirebase()
  }, [currentUser?.uid])

  // Save cart to Firebase when user is logged in, or localStorage when not
  useEffect(() => {
    async function saveCart() {
      if (currentUser) {
        // Save to Firebase
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            cart: cartItems
          }, { merge: true })
        } catch (error) {
          console.warn('Failed to save cart to Firebase:', error)
          // Fallback to localStorage
          localStorage.setItem('styleInBakuCart', JSON.stringify(cartItems))
        }
      } else {
        // Save to localStorage for guests
        localStorage.setItem('styleInBakuCart', JSON.stringify(cartItems))
      }
    }
    
    if (!isLoadingCart) {
      saveCart()
    }
  }, [cartItems, currentUser, isLoadingCart])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
