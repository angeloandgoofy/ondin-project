import { useApiCall } from './apicall';
import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

export default function Shop() {
  const [isLoading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(() => {
    const stored = sessionStorage.getItem("itemCounts");
    return stored ? JSON.parse(stored) : {};
  });

  const { setcount } = useOutletContext();

  useEffect(() => {
    sessionStorage.setItem("itemCounts", JSON.stringify(cartItems));

    const total = Object.values(cartItems).reduce((acc, curr) => acc + curr.count, 0);
    setcount(total);
  }, [cartItems, setcount, setCartItems]);

  const handleCountChange = (id, delta, item) => {
    const prevCount = cartItems[id]?.count || 0;
    const newCount = Math.max(prevCount + delta, 0);

    const updatedCart = {
      ...cartItems,
      [id]: {
        count: newCount,
        image: item.image,
        price: item.price,
      },
    };

    if (newCount === 0) {
      delete updatedCart[id];
    }

    setCartItems(updatedCart);
    sessionStorage.setItem("itemCounts", JSON.stringify(updatedCart));
  };

  const data = useApiCall();

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ paddingTop: '30px' }}>
        <h2 style={{ textAlign: 'center' }}><strong>Products</strong></h2>
      </div>
      <div className="shop-cart" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {data.map((item) => {
          const itemCount = cartItems[item.id]?.count || 0;
          return (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
              <h3>{item.title}</h3>
              <p><strong>Price:</strong> ${item.price}</p>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{item.description.slice(0, 100)}...</p>
              <p><strong>Rating:</strong> ⭐ {item.rating.rate} ({item.rating.count} reviews)</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <button onClick={() => handleCountChange(item.id, -1, item)}>-</button>
                <input
                  style={{ width: '30px' }}
                  type="number"
                  min={0}
                  value={itemCount}
                  onChange={(e) =>
                    handleCountChange(item.id, parseInt(e.target.value) - itemCount, item)
                  }
                />
                <button onClick={() => handleCountChange(item.id, 1, item)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}