import React, { useState, useEffect } from "react";
import useCart from "../store/cartStore";

const CartSummary = () => {
	const [myTotal, setTotal] = useState();
	const { totalItems } = useCart((state) => ({
		totalItems: state.cart.total_items,
	}));

	useEffect(() => {
		setTotal(totalItems);
	}, [totalItems]);

	return <button>Shopping Bag ({myTotal})</button>;
};

export default CartSummary;
