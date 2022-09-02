import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import useCart from "../../store/cartStore";
import useCheckout from "../../store/checkoutStore";
import shallow from "zustand/shallow";

const Checkout = ({ cartId }) => {
	const { generateToken } = useCheckout((state) => ({
		generateToken: state.generateToken,
	}));
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		generateToken(cartId);
	}, [cartId]);

	return <div>Checkout</div>;
};

export default Checkout;
