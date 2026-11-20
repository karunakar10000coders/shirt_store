import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div
        className="product-image"
        style={{ background: `linear-gradient(135deg, ${product.color}33, ${product.color}66)` }}
      >
        <span className="product-emoji">{product.image}</span>
        {product.stock < 20 && (
          <span className="product-low-stock">Low Stock</span>
        )}
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-merchant">by {product.merchant}</p>
        <div className="product-rating">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
          <span>{product.rating}</span>
        </div>
        <div className="product-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="btn-add-cart" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
