

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Cart from './Cart';
import { useDispatch } from 'react-redux';
import { addNewProducts, removeProduct } from '../Redux/Reducers/ServicesSlice';





function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);







  useEffect(() => {
    fetch(`./mocks/products.json`)
      .then((response) => response.json())
      .then((result) => {
        setProducts(result.data);
      })
      .catch((e) => console.log(e));
  }, []);

  function handleAddToCart(product) {
    if (product.id) {
      const isAlreadyInCart = cart.find((item) => item.id === product.id);
      if (isAlreadyInCart) {
        dispatch(removeProduct(product.id));
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
      } else {
        dispatch(addNewProducts(product));
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      }
    }
  }

  function findAddedToCart(id = '') {
    const matchedItem = cart.find((d) => d.id === id);
    return matchedItem;
  }

  function handleQuantity(id = 0, type = 'increment') {
    const cartCopy = [...cart];
    const matchedItem = cartCopy.find((d) => d.id === id);

    if (type === 'increment') {
      matchedItem.quantity += 1;
    } else if (type === 'decrement' && matchedItem.quantity > 0) {
      matchedItem.quantity -= 1;
    }

    setCart(cartCopy);
  }

  function handleRemove(id) {
    dispatch(removeProduct(id));
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  return (
    <div>
      <Cart cartCount={cart.length} />
      {products?.map((d, i) => (
        <ProductCard
          data={d}
          key={`products-${i}-${d.id}`}
          handleAddToCart={handleAddToCart}
          isAddedToCart={findAddedToCart(d?.id)}
          handleQuantity={handleQuantity}
          handleRemove={handleRemove} 
        />
      ))}
    </div>
  );
}

export default Products;
