import { MapPin, Phone, Clock } from 'lucide-react'

const locations = [
  {
    id: 1,
    name: 'JANAB BAKU',
    address: 'Janab Baku, Bakı',
    phone: '050-838-00-78',
    hours: '10:00 - 22:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.8236844421516!2d49.84523!3d40.38856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d8c7c8c8c8d%3A0x8c8c8c8c8c8c8c8c!2sJanab%20Baku!5e0!3m2!1sen!2saz!4v1234567890',
    directUrl: 'https://maps.app.goo.gl/hBtZM6ijotU4RDUZ9',
  },
  {
    id: 2,
    name: 'OUTLET XƏTAİ',
    address: 'Xətai rayonu, Bakı',
    phone: '050-838-00-78',
    hours: '10:00 - 22:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.1!2d49.868832!3d40.383663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d448fa75a3b%3A0x4ea7b48f9edddb63!2sEgoi1st!5e0!3m2!1sen!2saz!4v1234567890',
    directUrl: 'https://www.google.com/maps/place/Egoi1st/@40.383663,49.868832,1805m/data=!3m1!1e3!4m6!3m5!1s0x40307d448fa75a3b:0x4ea7b48f9edddb63!8m2!3d40.3836627!4d49.868832!16s%2Fg%2F11h_4jxznj',
  },
  {
    id: 3,
    name: 'BAKU MALL',
    address: 'Baku Mall, Bakı',
    phone: '050-838-00-78',
    hours: '10:00 - 22:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.5!2d49.8471!3d40.3677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBaku%20Mall!5e0!3m2!1sen!2saz!4v1234567890',
    directUrl: 'https://maps.app.goo.gl/hkxGb9hYBu9wdtZH6',
  },
  {
    id: 4,
    name: '8-ci Mikrorayon',
    address: '8-ci mikrorayon, Bakı',
    phone: '050-838-00-78',
    hours: '10:00 - 22:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.1!2d49.8771!3d40.3477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z8-ci%20mikrorayon!5e0!3m2!1sen!2saz!4v1234567890',
    directUrl: 'https://maps.app.goo.gl/AcN5xkGnSUchx2p16',
  },
  {
    id: 5,
    name: 'Bakıxanov Mall',
    address: 'Bakıxanov Mall, 2-ci mərtəbə, Bakı',
    phone: '050-838-00-78',
    hours: '10:00 - 22:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.2!2d49.9071!3d40.3277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQmFrxLF4YW5vdiBNYWxs!5e0!3m2!1sen!2saz!4v1234567890',
    directUrl: 'https://maps.app.goo.gl/pSsiq6hbXmuM6yq78',
  },
  {
    id: 6,
    name: 'Həzi Aslanov',
    address: 'Həzi Aslanov, Bakı',
    phone: '050-838-00-78',
    hours: '10:00 - 22:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.5!2d49.8871!3d40.3377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSMmZemkgQXNsYW5vdg!5e0!3m2!1sen!2saz!4v1234567890',
    directUrl: 'https://maps.app.goo.gl/TNaWXsb2s52o8gqY7',
  },
]

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[40vh] flex items-center justify-center bg-luxury-dark text-white">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 tracking-wide">
            Filiallarımız
          </h1>
          <div className="h-px w-24 bg-luxury-gold mx-auto mb-6"></div>
          <p className="text-lg font-light">
            Hər gün 10:00 - 22:00
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((location) => (
            <div 
              key={location.id}
              className="border luxury-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-video w-full">
                <iframe
                  src={location.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={location.name}
                ></iframe>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-4">{location.name}</h3>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-1 flex-shrink-0 text-luxury-gold" />
                    <span className="font-light">{location.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="flex-shrink-0 text-luxury-gold" />
                    <a 
                      href={`tel:+994508380078`}
                      className="font-light luxury-hover"
                    >
                      {location.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="flex-shrink-0 text-luxury-gold" />
                    <span className="font-light">{location.hours}</span>
                  </div>
                </div>

                <a
                  href={location.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block w-full text-center px-6 py-3 border-2 border-luxury-dark luxury-hover font-light tracking-wider"
                >
                  GOOGLE MAPS-DA AÇ
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 font-light mb-6">
            Ümumi əlaqə nömrəsi
          </p>
          <a
            href="tel:+994508380078"
            className="inline-block px-8 py-4 bg-luxury-dark text-white hover:bg-luxury-gold transition-colors duration-300 font-light tracking-wider"
          >
            050-838-00-78
          </a>
        </div>
      </section>
    </div>
  )
}
