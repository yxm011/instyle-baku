import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import LocationsPage from './pages/LocationsPage'
import CartPage from './pages/CartPage'
import ProductPage from './pages/ProductPage'

function PageWrapper() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('fadeIn')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut')
    }
  }, [location, displayLocation])

  return (
    <>
      <Navbar />
      <main 
        className={`flex-grow transition-opacity duration-500 ease-in-out ${
          transitionStage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
        }`}
        onTransitionEnd={() => {
          if (transitionStage === 'fadeOut') {
            setTransitionStage('fadeIn')
            setDisplayLocation(location)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <PageWrapper />
        </div>
      </CartProvider>
    </Router>
  )
}

export default App
