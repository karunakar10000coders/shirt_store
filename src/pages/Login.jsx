import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoggedIn, user } = useAuth()
  const navigate = useNavigate()

  if (isLoggedIn) {
    return (
      <div className="login-page">
        <div className="already-logged">
          <h2>Welcome back, {user.name}!</h2>
          <p>You are logged in as <strong>{user.role}</strong></p>
          <div className="login-actions">
            {user.role === "admin" && <Link to="/admin" className="btn-primary">Go to Admin Panel</Link>}
            {user.role === "merchant" && <Link to="/merchant" className="btn-primary">Go to Dashboard</Link>}
            {user.role === "user" && <Link to="/products" className="btn-primary">Browse Products</Link>}
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    const result = login(email, password)
    if (result.success) {
      switch (result.role) {
        case "admin": navigate("/admin"); break
        case "merchant": navigate("/merchant"); break
        default: navigate("/products"); break
      }
    } else {
      setError(result.message)
    }
  }

  const fillCredentials = (email, password) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn-login">Sign In →</button>
          </form>
        </div>

        <div className="demo-credentials">
          <h3>Demo Accounts</h3>
          <p>Click to auto-fill credentials:</p>
          <div className="demo-cards">
            <button className="demo-card" onClick={() => fillCredentials("admin@store.com", "admin123")}>
              <span className="demo-icon">🛡️</span>
              <strong>Admin</strong>
              <span>admin@store.com</span>
            </button>
            <button className="demo-card" onClick={() => fillCredentials("john@email.com", "user123")}>
              <span className="demo-icon">👤</span>
              <strong>User</strong>
              <span>john@email.com</span>
            </button>
            <button className="demo-card" onClick={() => fillCredentials("urban@store.com", "merchant123")}>
              <span className="demo-icon">🏪</span>
              <strong>Merchant</strong>
              <span>urban@store.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
