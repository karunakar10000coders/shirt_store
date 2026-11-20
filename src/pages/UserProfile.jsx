import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

function UserProfile() {
  const { user } = useAuth()
  const { cartCount } = useCart()

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Profile</h1>
        <p>Welcome back, {user.name}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🛒</span>
          <div>
            <h3>{cartCount}</h3>
            <p>Items in Cart</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div>
            <h3>3</h3>
            <p>Past Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">❤️</span>
          <div>
            <h3>5</h3>
            <p>Wishlist</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div>
            <h3>2</h3>
            <p>Reviews</p>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-card">
          <h2>Account Info</h2>
          <div className="profile-info">
            <div className="profile-row">
              <span className="profile-label">Name</span>
              <span>{user.name}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span>{user.email}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Role</span>
              <span className="role-badge role-user">{user.role}</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2>Recent Orders</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span>✅</span> Order #1020 — Classic White Tee — $24.99 — <strong>Delivered</strong>
            </div>
            <div className="activity-item">
              <span>✅</span> Order #1018 — Ocean Blue Polo — $39.99 — <strong>Delivered</strong>
            </div>
            <div className="activity-item">
              <span>🚚</span> Order #1025 — Crimson Red V-Neck — $27.99 — <strong>Shipped</strong>
            </div>
          </div>
          <Link to="/products" className="btn-primary" style={{ marginTop: "1rem", display: "inline-block" }}>
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
