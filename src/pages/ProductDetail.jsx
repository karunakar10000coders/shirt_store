import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import products from "../data/products"

function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <Link to="/products">← Back to Products</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize || product.sizes[0], quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="product-detail">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="detail-container">
        <div
          className="detail-image"
          style={{ background: `linear-gradient(135deg, ${product.color}33, ${product.color}66)` }}
        >
          <span className="detail-emoji">{product.image}</span>
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-merchant">by {product.merchant}</p>

          <div className="detail-rating">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
            <span>{product.rating} / 5</span>
          </div>

          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>

          <div className="detail-stock">
            {product.stock > 20 ? (
              <span className="in-stock">✓ In Stock ({product.stock} left)</span>
            ) : (
              <span className="low-stock">⚠ Low Stock ({product.stock} left)</span>
            )}
          </div>

          <div className="detail-options">
            <div className="size-selector">
              <label>Size:</label>
              <div className="size-buttons">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${(selectedSize || product.sizes[0]) === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          <button
            className={`btn-add-to-cart-lg ${added ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h2>You May Also Like</h2>
          <div className="related-grid">
            {related.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="related-card">
                <div
                  className="related-image"
                  style={{ background: `linear-gradient(135deg, ${p.color}33, ${p.color}66)` }}
                >
                  <span>{p.image}</span>
                </div>
                <h4>{p.name}</h4>
                <p>${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
