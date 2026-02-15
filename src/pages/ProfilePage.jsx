import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { User, Mail, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate('/')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  if (!currentUser) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Profil</h1>
          <div className="h-px w-24 bg-luxury-gold mx-auto"></div>
        </div>

        <div className="border luxury-border p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 bg-luxury-gray rounded-full flex items-center justify-center">
              <User size={48} className="text-gray-400" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-light mb-2 text-gray-600">
                Ad Soyad
              </label>
              <div className="flex items-center gap-3 p-4 bg-luxury-gray">
                <User size={20} className="text-gray-600" />
                <span className="font-light">{currentUser.displayName || 'İstifadəçi'}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-light mb-2 text-gray-600">
                Email
              </label>
              <div className="flex items-center gap-3 p-4 bg-luxury-gray">
                <Mail size={20} className="text-gray-600" />
                <span className="font-light">{currentUser.email}</span>
              </div>
            </div>

            <div className="pt-6 border-t luxury-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 font-light tracking-wider"
              >
                <LogOut size={20} />
                ÇIXIŞ
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-luxury-gray">
          <h3 className="font-serif text-lg mb-4">Hesab Məlumatları</h3>
          <div className="space-y-2 text-sm text-gray-600 font-light">
            <p>• Səbətiniz bütün cihazlarda sinxronlaşır</p>
            <p>• Sifariş tarixçəniz saxlanılır</p>
            <p>• Sevimli məhsullarınızı yadda saxlayın</p>
          </div>
        </div>
      </div>
    </div>
  )
}
