import Head from "next/head";
import Image from "next/future/image";
import { useEffect, useState } from "react";
import useStore from "../store/commerceStore";
import commerce from "../lib/commerce";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import ProductGrid from "../components/ProductGrid";
import { motion } from "framer-motion";

import Cart from "../components/Cart";

const Home = ({ products }) => {
	return (
		<>
			<Header className="border fixed w-full z-10" />

			<div className="md:min-h-screen md:flex md:items-center border-red-700 border">
				<div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-10 border border-blue-700">
					{/* <motion.div
						className="md:min-h-screen py-6 md:py-12 flex items-center md:z-40 mt-10"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -50 }}
					>
						<ProductGrid products={products} className="h-96" />
					</motion.div> */}

					<Cart />
				</div>
			</div>
		</>
	);
};

export async function getStaticProps() {
	const { data } = await commerce.products.list();
	const products = data.filter(({ active }) => active);

	return {
		props: {
			products,
		},
	};
}

export default Home;
