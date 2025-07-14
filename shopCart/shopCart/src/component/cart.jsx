import { useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function Cart() {
  const { setcount } = useOutletContext();
  const [cartItems, setCartItems] = useState(() => {
    const stored = sessionStorage.getItem("itemCounts");
    return stored ? JSON.parse(stored) : {};
  });

  const cartEntries = Object.entries(cartItems);
  const cartEmpty = cartEntries.length === 0;

  const clearCart = () => {
    sessionStorage.removeItem("itemCounts");
    setCartItems({});
    setcount(0);
  }

    useEffect(() => {
        sessionStorage.setItem("itemCounts", JSON.stringify(cartItems));

        const total = Object.values(cartItems).reduce((acc, curr) => acc + curr.count, 0);
        setcount(total);
    }, [cartItems, setcount, setCartItems]);


  const updateQuantity = (id, total) => {
    total = Math.max(total, 0);
    setCartItems(prevItems => ({
        ...prevItems,
        [id]: {
        ...prevItems[id],
        count: total
        }
    }));
  }

const total = Object.values(cartItems).reduce(
  (acc, curr) => acc + curr.price * curr.count,
  0
);
  return ( 
    <div className="cart-container" style={{paddingTop: '30px'}}>
        <div className="cart-header">
            <h2
                style={{
                    borderBottom: '2px solid #4fc3f7',
                    paddingBottom: '0.3rem',
                }}
                >
                🛒 Your Cart
            </h2>
            {!cartEmpty && (
            <button 
                onClick={clearCart}
                className="clear-cart-btn"
                aria-label="Clear entire cart"
            >
                Clear Cart
            </button>
            )}
        </div>

        {cartEmpty ? (
            <div className="empty-cart">
            <p>Your cart is empty</p>
            <p className="empty-cart-subtitle">Add some items to get started!</p>
            </div>
            ) : (
            <div style={{display: "flex", flexDirection: "column", padding: '10px', gap: '20px'}}>
                {cartEntries.map(([id, item]) => (
                    <div key={id} className="cart-card">
                        <img
                            src={item.image}
                            alt={`Product ${id}`}
                            style={{ width: "100px",  height: "100px", objectFit: "contain" }}
                        />
                        <p><strong>Price:</strong> ${item.price}</p>
                        <p><strong>Quantity:</strong> {item.count }</p>
                        <p><strong>Subtotal:</strong> ${(item.price * item.count).toFixed(2)}</p>
                        <div className="quantity-controls">
                        <button
                            onClick={() => updateQuantity(id, item.count - 1)}
                            className="quantity-btn"
                            aria-label="Decrease quantity"
                        >
                        −
                        </button>
                        <span className="quantity-display">{item.count}</span>
                        <button
                            onClick={() => updateQuantity(id, item.count + 1)}
                            className="quantity-btn"
                            aria-label="Increase quantity"
                        >
                        +
                        </button>
                    </div>
                    </div>
                ))}
            </div>
            )}

            <div>
                <p><strong>TOTAL: </strong> {total.toFixed(2)} </p>
                <button onClick={clearCart}>CHECK OUT</button>
            </div>

            <style>{`
            .cart-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 30px 20px;
                font-family: system-ui, -apple-system, sans-serif;
            }
            .cart-header {
                padding: 20px;
                margin: 0;
                font-size: 1rem;
                color:  #1f2937;
            }
            .clear-cart-btn {
                background: #ef4444;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.875rem;
                transition: background-color 0.2s;
            }

            .clear-cart-btn:hover {
                background: #dc2626;
            }

            .cart-card {
                display: flex;
                padding: 1px;
                background-color: gray;
                border-radius: 12px;
                padding: 10px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .quantity-controls {
                display: flex;
                align-items: center;
                padding: 5px;
            }

            .quantity-btn {
                width: 32px;
                height: 32px;
                border: 1px solid #d1d5db;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.125rem;
                transition: all 0.2s;
                }

            .quantity-btn:hover {
                background: #f3f4f6;
                border-color: #9ca3af;
                }

            .quantity-display {
                min-width: 40px;
                text-align: center;
                font-weight: 600;
                font-size: 1rem;
            }

            `}</style>
        </div>

    )
}