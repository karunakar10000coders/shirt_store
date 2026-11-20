import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

function Navbar() {
  const { user, logout, isLoggedIn } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const getDashboardLink = () => {
    if (!user) return "/login"
    switch (user.role) {
      case "admin": return "/admin"
      case "merchant": return "/merchant"
      default: return "/profile"
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span>👕</span> ShirtStore
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {isLoggedIn && (
          <Link to={getDashboardLink()}>
            {user.role === "admin" ? "Admin Panel" : user.role === "merchant" ? "Dashboard" : "Profile"}
          </Link>
        )}

        <Link to="/cart" className="nav-cart">
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        {isLoggedIn ? (
          <div className="nav-user">
            <span className="nav-user-name">Hi, {user.name.split(" ")[0]}</span>
            <span className="nav-role-badge">{user.role}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="btn-login-nav">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
