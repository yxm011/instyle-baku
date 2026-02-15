const categoryData = {
  koynekler: { name: 'Köynəklər', count: 24, priceRange: [45, 85] },
  salvarlar: { name: 'Şalvarlar', count: 18, priceRange: [55, 95] },
  pencekler: { name: 'Pencəklər', count: 16, priceRange: [35, 65] },
  ayaqqabilar: { name: 'Ayaqqabılar', count: 20, priceRange: [70, 150] },
  blazerler: { name: 'Blazerlər', count: 12, priceRange: [120, 200] },
  godekceler: { name: 'Gödəkçələr', count: 15, priceRange: [100, 180] },
  aksessuarlar: { name: 'Aksessuarlar', count: 30, priceRange: [15, 50] },
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
