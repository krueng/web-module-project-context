import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import data from './data';

import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const { Provider } = CartContext;
	const { push } = useHistory();
	const [products] = useState(data);

	const getLocalCart = localStorage.getItem('localCart');
	const [cart, setCart] = useState(JSON.parse(getLocalCart));

	const addItem = item => {
		// add the given item to the cart
		
		localStorage.setItem("localCart", JSON.stringify([...cart, { ...item, cartId: Date.now() }]));
		setCart([...cart, { ...item, cartId: Date.now() }]);
	};

	const removeItem = cartId => {

		localStorage.setItem("localCart", JSON.stringify(cart.filter(item => item.cartId !== cartId)));
		setCart(cart.filter(item => item.cartId !== cartId));
		
		push('/cart')
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem, removeItem }}>
				<Provider value={cart}>
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						{/* <Products products={products} addItem={addItem} /> */}
						{/* Simplify */}
						<Products />
					</Route>

					<Route key={cart.id} path="/cart">
						<ShoppingCart />
					</Route>
				</Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
