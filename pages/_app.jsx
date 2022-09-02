import "../styles/globals.css";
import { useEffect } from "react";
import useCart from "../store/cartStore";
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
	const setCart = useCart((state) => state.setCart);
	const cart = useCart((state) => state.cart);

	useEffect(() => {
		if (!cart.id || cart.expires <= Math.floor(Date.now() / 1000)) {
			console.log("Fetching new cart");
			getCart();
		}
	}, []);

	// Retrieve cart from Commerce.js API
	const getCart = async () => {
		try {
			const cart = await client.cart.retrieve();
			// set Commerce cart to app state
			setCart(cart);
		} catch (err) {
			console.error(err);
		}
	};

	// if (!hasHydrated) {
	// 	return <p>Loading...</p>;
	// }

	return (
		<Elements stripe={stripePromise}>
			<Component {...pageProps} />
		</Elements>
	);
}

export default MyApp;
