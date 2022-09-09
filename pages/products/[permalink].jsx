import React from "react";
import client from "../../lib/commerce";
import Header from "../../components/Header";
import useStore from "../../store/commerceStore";

const ProductPage = ({ product }) => {
	const addToCart = useStore((state) => state.addToCart);

	const handleAdd = () => addToCart(product.id, 1);

	return (
		<div>
			<Header />
			<h1>{product.name}</h1>
			<button onClick={handleAdd}>Add</button>
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
