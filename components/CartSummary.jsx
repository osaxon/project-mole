import React, { useState, useEffect } from "react";
import useCart from "../store/commerceStore";

const CartSummary = () => {
	const [myTotal, setTotal] = useState();
	const total = useCart((state) => state?.cart?.total_items);
	const [open, setOpen] = useState(true);
	const { stateOpen, setStateOpen } = useCart((state) => ({
		stateOpen: state.open,
		setStateOpen: state.setOpen,
	}));

	useEffect(() => {
		setTotal(total);
		setOpen(stateOpen);
	}, [total, stateOpen]);

	return (
		<button onClick={() => setStateOpen(true)}>
			Shopping Bag ({myTotal})
		</button>
	);
};

export default CartSummary;
