import { Instagram, Phone, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-luxury-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif mb-4">STYLE İN BAKU</h3>
            <div className="h-px w-16 bg-luxury-gold mb-6"></div>
            <p className="text-gray-400 font-light leading-relaxed">
              Premium kişi geyimləri və aksessuarları
            </p>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-4">Əlaqə</h4>
            <div className="space-y-3 text-gray-400">
              <a href="tel:+994508380078" className="flex items-center gap-2 luxury-hover">
                <Phone size={18} />
                <span>050-838-00-78</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Hər gün 10:00 - 22:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-4">Sosial Şəbəkələr</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/style_in.baku"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-600 flex items-center justify-center luxury-hover hover:border-luxury-gold"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com/@style_in_baku"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-600 flex items-center justify-center luxury-hover hover:border-luxury-gold"
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Style İn Baku. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  )
}
