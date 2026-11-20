import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import products from "../data/products"

function Home() {
  const featured = products.filter((p) => p.rating >= 4.5).slice(0, 4)

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🔥 New Collection 2026</span>
          <h1>Find Your Perfect Shirt</h1>
          <p>
            Premium quality shirts for every occasion. From casual tees to
            formal wear — discover your style.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">
              Shop Now →
            </Link>
            <Link to="/login" className="btn-secondary">
              Join Us
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-emoji">👕</div>
          <div className="hero-float-1">👔</div>
          <div className="hero-float-2">🎽</div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <h3>Free Shipping</h3>
          <p>On orders above $50</p>
        </div>
        <div className="feature">
          <span className="feature-icon">↩️</span>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🔒</span>
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💬</span>
          <h3>24/7 Support</h3>
          <p>Dedicated help center</p>
        </div>
      </section>

      <section className="featured-section">
        <h2>⭐ Top Rated Shirts</h2>
        <p className="section-subtitle">Our customers' absolute favorites</p>
        <div className="products-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/products" className="btn-view-all">
          View All Products →
        </Link>
      </section>

      <section className="cta-section">
        <h2>Ready to Upgrade Your Wardrobe?</h2>
        <p>Join thousands of happy customers. Sign up and get 15% off your first order!</p>
        <Link to="/login" className="btn-primary">
          Get Started →
        </Link>
      </section>
    </div>
  )
}

export default Home
