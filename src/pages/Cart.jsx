import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()
  const { isLoggedIn } = useAuth()
  const [ordered, setOrdered] = useState(false)

  const handleCheckout = () => {
    setOrdered(true)
    clearCart()
  }

  if (ordered) {
    return (
      <div className="cart-page">
        <div className="order-success">
          <span className="success-icon">🎉</span>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. Your shirts are on their way!</p>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <span className="empty-icon">🛒</span>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any shirts yet!</p>
          <Link to="/products" className="btn-primary">Browse Shirts</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button className="btn-clear" onClick={clearCart}>Clear All</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <div
                className="cart-item-image"
                style={{ background: `linear-gradient(135deg, ${item.color}33, ${item.color}66)` }}
              >
                <span>{item.image}</span>
              </div>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-meta">Size: {item.size} • {item.merchant}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                </div>
                <p className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="btn-remove" onClick={() => removeFromCart(item.id, item.size)}>
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{cartTotal >= 50 ? "Free" : "$5.99"}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${(cartTotal >= 50 ? cartTotal : cartTotal + 5.99).toFixed(2)}</span>
          </div>
          {cartTotal < 50 && (
            <p className="free-shipping-note">Add ${(50 - cartTotal).toFixed(2)} more for free shipping!</p>
          )}
          {isLoggedIn ? (
            <button className="btn-checkout" onClick={handleCheckout}>
              Checkout →
            </button>
          ) : (
            <Link to="/login" className="btn-checkout">
              Login to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
