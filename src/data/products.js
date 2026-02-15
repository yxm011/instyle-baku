const categoryData = {
  koynekler: { 
    name: 'Köynəklər', 
    count: 24, 
    priceRange: [45, 85],
    imageBase: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80' // men's shirts
  },
  salvarlar: { 
    name: 'Şalvarlar', 
    count: 18, 
    priceRange: [55, 95],
    imageBase: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80' // men's trousers
  },
  pencekler: { 
    name: 'Pencəklər', 
    count: 16, 
    priceRange: [35, 65],
    imageBase: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' // men's t-shirts
  },
  ayaqqabilar: { 
    name: 'Ayaqqabılar', 
    count: 20, 
    priceRange: [70, 150],
    imageBase: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80' // men's shoes
  },
  blazerler: { 
    name: 'Blazerlər', 
    count: 12, 
    priceRange: [120, 200],
    imageBase: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80' // men's blazers
  },
  godekceler: { 
    name: 'Gödəkçələr', 
    count: 15, 
    priceRange: [100, 180],
    imageBase: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80' // men's jackets
  },
  aksessuarlar: { 
    name: 'Aksessuarlar', 
    count: 30, 
    priceRange: [15, 50],
    imageBase: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80' // men's accessories
  },
}

const generatePrice = (categorySlug, index) => {
  const category = categoryData[categorySlug]
  if (!category) return 50
  
  const seed = categorySlug.charCodeAt(0) + index
  const range = category.priceRange[1] - category.priceRange[0]
  return category.priceRange[0] + (seed % (range + 1))
}

export const generateProducts = (categorySlug) => {
  const category = categoryData[categorySlug]
  if (!category) return []
  
  return Array.from({ length: category.count }, (_, i) => ({
    id: `${categorySlug}-${i + 1}`,
    slug: `${categorySlug}-${i + 1}`,
    name: `${category.name} ${i + 1}`,
    category: category.name,
    categorySlug: categorySlug,
    price: generatePrice(categorySlug, i),
    image: `${category.imageBase}&seed=${i}`,
    description: `Premium keyfiyyətli ${category.name.toLowerCase()} - Model ${i + 1}`,
    features: [
      'Yüksək keyfiyyətli material',
      'Rahat geyim',
      'Müasir dizayn',
      'Uzunömürlü',
    ],
  }))
}

export const getProductById = (productId) => {
  const [categorySlug] = productId.split('-')
  const products = generateProducts(categorySlug)
  return products.find(p => p.id === productId)
}

export const getCategoryData = (categorySlug) => {
  return categoryData[categorySlug] || { name: 'Məhsullar', count: 24, priceRange: [50, 100] }
}

export { categoryData }
