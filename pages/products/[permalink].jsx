import React from "react";
import useCart from "../../store/cartStore";
import useCheckout from "../../store/checkoutStore";
import client from "../../lib/commerce";
import Header from "../../components/Header";

const ProductPage = ({ product }) => {
	const setCart = useCart((state) => state.setCart);

	const addToCart = async () => {
		try {
			const cart = await client.cart.add(product.id, 1);

			setCart(cart);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Header />
			<h1>{product.name}</h1>
			<button onClick={addToCart}>Add</button>
		</div>
	);
};

export async function getStaticProps({ params }) {
	const { permalink } = params;

	const product = await client.products.retrieve(permalink, {
		type: "permalink",
	});

	return {
		props: {
			product,
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const { data: products } = await client.products.list();

	return {
		paths: products.map(({ permalink }) => ({
			params: {
				permalink,
			},
		})),
		fallback: false,
	};
}

export default ProductPage;
