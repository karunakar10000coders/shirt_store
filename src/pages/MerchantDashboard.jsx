import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import products from "../data/products"

function MerchantDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("products")

  const myProducts = products.filter((p) => p.merchantId === user.merchantId)
  const totalSold = myProducts.reduce((sum, p) => sum + (60 - p.stock), 0)
  const totalRevenue = myProducts.reduce((sum, p) => sum + p.price * (60 - p.stock), 0)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Merchant Dashboard</h1>
        <p>Welcome, {user.shopName || user.name}! Manage your products here.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div>
            <h3>{myProducts.length}</h3>
            <p>My Products</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div>
            <h3>{totalSold}</h3>
            <p>Units Sold</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div>
            <h3>${totalRevenue.toFixed(0)}</h3>
            <p>Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div>
            <h3>{(myProducts.reduce((s, p) => s + p.rating, 0) / myProducts.length).toFixed(1)}</h3>
            <p>Avg Rating</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>
          My Products
        </button>
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
          Orders
        </button>
      </div>

      {activeTab === "products" && (
        <div className="dashboard-content">
          <div className="content-header">
            <h2>My Products</h2>
          </div>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((p) => (
                <tr key={p.id}>
                  <td className="product-cell">
                    <span className="table-emoji">{p.image}</span> {p.name}
                  </td>
                  <td><span className="table-badge">{p.category}</span></td>
                  <td>${p.price.toFixed(2)}</td>
                  <td className={p.stock < 20 ? "low-stock-text" : ""}>{p.stock}</td>
                  <td>{"★".repeat(Math.floor(p.rating))} {p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="dashboard-content">
          <h2>Recent Orders</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span>📦</span> Order #1024 — Classic White Tee × 2 — $49.98 — <strong>Delivered</strong>
            </div>
            <div className="activity-item">
              <span>🚚</span> Order #1023 — Forest Green Henley × 1 — $34.99 — <strong>Shipped</strong>
            </div>
            <div className="activity-item">
              <span>⏳</span> Order #1022 — Sky Blue Linen × 3 — $149.97 — <strong>Processing</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MerchantDashboard
