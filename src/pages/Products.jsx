import { useState, useMemo } from "react"
import ProductCard from "../components/ProductCard"
import SearchBar from "../components/SearchBar"
import products from "../data/products"

function Products() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("default")

  const categories = [...new Set(products.map((p) => p.category))]

  const filtered = useMemo(() => {
    let result = products

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.merchant.toLowerCase().includes(term)
      )
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category)
    }

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return result
  }, [searchTerm, category, sortBy])

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Shirts</h1>
        <p>{filtered.length} products found</p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />

      <div className="products-toolbar">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">Sort By: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h3>No shirts found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  )
}

export default Products
