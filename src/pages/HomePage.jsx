import { Link } from 'react-router-dom'

const categories = [
  { name: 'Köynəklər', slug: 'koynekler', description: 'Premium kişi köynəkləri' },
  { name: 'Şalvarlar', slug: 'salvarlar', description: 'Klassik və casual şalvarlar' },
  { name: 'Pencəklər', slug: 'pencekler', description: 'Müasir pencək kolleksiyası' },
  { name: 'Ayaqqabılar', slug: 'ayaqqabilar', description: 'Keyfiyyətli kişi ayaqqabıları' },
  { name: 'Blazerlər', slug: 'blazerler', description: 'Zərif blazer və pencək' },
  { name: 'Gödəkçələr', slug: 'godekceler', description: 'Qış və mövsümi gödəkçələr' },
  { name: 'Aksessuarlar', slug: 'aksessuarlar', description: 'Kəmər, saatlar və daha çox' },
]

export default function HomePage() {
  return (
    <div>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=2070&auto=format&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif font-light mb-6 tracking-wide drop-shadow-lg">
            Premium Kişi Geyimləri
          </h2>
          <div className="h-px w-32 bg-luxury-gold mx-auto mb-8"></div>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-8 drop-shadow-md">
            Dəyərli müştərilərimiz bütün filiallarımız hər gün saat 10:00-dan 22:00-dək fəaliyyət göstərir
          </p>
          <Link
            to="/locations"
            className="inline-block px-8 py-4 border-2 border-white hover:bg-white hover:text-luxury-dark transition-all duration-300 font-light tracking-wider"
          >
            FİLİALLARIMIZ
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-serif mb-4">Kolleksiyalarımız</h3>
          <div className="h-px w-24 bg-luxury-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group"
            >
              <div className="aspect-[3/4] bg-luxury-gray mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-sm font-light">{category.name}</span>
                </div>
              </div>
              <h4 className="text-xl font-serif mb-2 luxury-hover">{category.name}</h4>
              <p className="text-gray-600 font-light text-sm">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
