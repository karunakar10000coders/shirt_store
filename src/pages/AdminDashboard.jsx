import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import products from "../data/products"
import usersData from "../data/users"

function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const totalProducts = products.length
  const totalUsers = usersData.length
  const totalMerchants = usersData.filter((u) => u.role === "merchant").length
  const totalRevenue = products.reduce((sum, p) => sum + p.price * (60 - p.stock), 0)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.name}! Manage your store from here.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div>
            <h3>{totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div>
            <h3>{totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏪</span>
          <div>
            <h3>{totalMerchants}</h3>
            <p>Merchants</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div>
            <h3>${totalRevenue.toFixed(0)}</h3>
            <p>Est. Revenue</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>
          Products
        </button>
        <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
          Users
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="dashboard-content">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span>🟢</span> New user registration — John Customer
            </div>
            <div className="activity-item">
              <span>📦</span> New product added — Blush Pink Satin by EliteWear
            </div>
            <div className="activity-item">
              <span>💳</span> Order #1024 completed — $89.98
            </div>
            <div className="activity-item">
              <span>⭐</span> New 5-star review on "Midnight Black Formal"
            </div>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="dashboard-content">
          <h2>All Products</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Merchant</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.name}</td>
                  <td><span className="table-badge">{p.category}</span></td>
                  <td>${p.price.toFixed(2)}</td>
                  <td className={p.stock < 20 ? "low-stock-text" : ""}>{p.stock}</td>
                  <td>{p.merchant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "users" && (
        <div className="dashboard-content">
          <h2>All Users</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((u) => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
