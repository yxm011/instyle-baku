import { Link } from 'react-router-dom'

const categories = [
  { 
    name: 'Köynəklər', 
    slug: 'koynekler', 
    description: 'Premium kişi köynəkləri',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'
  },
  { 
    name: 'Şalvarlar', 
    slug: 'salvarlar', 
    description: 'Klassik və casual şalvarlar',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'
  },
  { 
    name: 'Pencəklər', 
    slug: 'pencekler', 
    description: 'Müasir pencək kolleksiyası',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
  },
  { 
    name: 'Ayaqqabılar', 
    slug: 'ayaqqabilar', 
    description: 'Keyfiyyətli kişi ayaqqabıları',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80'
  },
  { 
    name: 'Blazerlər', 
    slug: 'blazerler', 
    description: 'Zərif blazer və pencək',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80'
  },
  { 
    name: 'Gödəkçələr', 
    slug: 'godekceler', 
    description: 'Qış və mövsümi gödəkçələr',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80'
  },
  { 
    name: 'Aksessuarlar', 
    slug: 'aksessuarlar', 
    description: 'Kəmər, saatlar və daha çox',
    image: 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=800&q=80'
  },
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
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
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
