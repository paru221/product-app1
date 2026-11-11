
import React, { useState, useMemo } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 55000,
    image: "/images/laptop.jpg"
  },
  {
    id: 2,
    name: "Headphones",
    category: "Electronics",
    price: 1500,
    image: "/images/headphones1.jpg"
  },
  {
    id: 3,
    name: "Notebook",
    category: "Stationery",
    price: 60,
    image: "/images/notebook.jpg"
  },
  {
    id: 4,
    name: "Pen",
    category: "Stationery",
    price: 10,
    image: "/images/pen.jpg"
  },
  {
    id: 5,
    name: "Backpack",
    category: "Accessories",
    price: 900,
    image: "/images/backpack.jpg"
  },
  {
    id: 6,
    name: "Watch",
    category: "Accessories",
    price: 2500,
    image: "/images/watch.jpg"
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Search, filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sort]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // Wishlist
  const toggleWishlist = (id) => {
    setWishlist((previousWishlist) =>
      previousWishlist.includes(id)
        ? previousWishlist.filter((itemId) => itemId !== id)
        : [...previousWishlist, id]
    );
  };

  // Cart calculations
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">

      <header className="header">
        <h1>🛍️ Product Catalog</h1>
        <p>Find your favourite products at the best prices!</p>

        <div className="header-info">
          <span>🛒 Cart Items: {totalItems}</span>
          <span>❤️ Wishlist: {wishlist.length}</span>
        </div>
      </header>

      {/* Search */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Sorting */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Product section */}
      <section className="products-section">
        <h2>Available Products</h2>

        <p className="product-count">
          Showing {filteredProducts.length} products
        </p>

        <div className="list">
          {filteredProducts.length === 0 ? (
            <p className="no-products">
              No products found!
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                isWishlisted={wishlist.includes(product.id)}
                toggleWishlist={toggleWishlist}
              />
            ))
          )}
        </div>
      </section>

      {/* Shopping cart */}
      <Cart
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
      />

      <footer>
        <p>© 2026 Product Catalog | Built with React</p>
      </footer>

    </div>
  );
}

export default App;
