
import React from "react";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalPrice
}) {
  return (
    <section className="cart-section">

      <h2>🛒 Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty. Add some products!
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>

              <div className="cart-details">
                <h3>{item.name}</h3>

                <p>
                  ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                </p>

                <p>
                  Subtotal: ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="quantity-controls">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>

              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>

            </div>
          ))}

          <div className="total">
            <h2>
              Total Amount: ₹{totalPrice.toLocaleString("en-IN")}
            </h2>
          </div>

        </>
      )}

    </section>
  );
}

export default Cart;
