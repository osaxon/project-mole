import "../styles/globals.css";
import { useEffect } from "react";
import useStore from "../store/commerceStore";
import client from "../lib/commerce";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const toastOptions = {
	position: "bottom-center",
	draggable: false,
	hideProgressBar: true,
	className: "w-full md:max-w-xl",
	toastClassName: "bg-ecru-white rounded-lg text-black px-3 shadow-md",
};

function MyApp({ Component, pageProps }) {
	const cart = useStore((state) => state.cart);
	const setCart = useStore((state) => state.setCart);
	const setProducts = useStore((state) => state.setProducts);

	// Retrieve cart from Commerce.js API
	const fetchCart = async () => {
		try {
			const cart = await client.cart.retrieve();
			// set Commerce cart to app state
			setCart(cart);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchProducts = async () => {
		try {
			const { data } = await client.products.list();
			setProducts(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	return (
		<Elements stripe={stripePromise}>
			<Component {...pageProps} />
		</Elements>
	);
}

export default MyApp;
