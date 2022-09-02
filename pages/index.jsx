import Head from "next/head";
import Image from "next/future/image";
import { useEffect, useState } from "react";
import useCart from "../store/cartStore";
import useCheckout from "../store/checkoutStore";
import commerce from "../lib/commerce";
import ProductList from "../components/ProductList";
import Checkout from "../components/Checkout/Checkout";
import Header from "../components/Header";

const Home = ({ merchant, categories, products }) => {
	const { id } = useCart((state) => ({ id: state.id }));

	return (
		<div>
			<Header />
			<ProductList products={products} />
		</div>
	);
};

export async function getStaticProps() {
	const merchantData = await commerce.merchants.about();
	const merchant = merchantData.data[0];
	const { data: categories } = await commerce.categories.list();
	const { data: products } = await commerce.products.list();

	return {
		props: {
			merchant,
			categories,
			products,
		},
	};
}

export default Home;
