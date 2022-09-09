import create from "zustand";
import { persist } from "zustand/middleware";
import client from "../lib/commerce";

const useStore = create(
	persist(
		(set, get) => ({
			products: [],
			cart: {},
			order: {},
			error: null,
			open: false,
			setOpen: (value) => set(() => ({ open: value })),
			setProducts: (products) =>
				set((state) => ({
					...state,
					products: products,
				})),

			setCart: (cart) =>
				set((state) => ({
					...state,
					cart: cart,
				})),

			addToCart: async (prodctId, qty) => {
				try {
					const cart = await client.cart.add(prodctId, qty);
					get().setCart(cart);
				} catch (error) {
					console.error(error);
				}
			},

			refreshCart: async () => {
				const newCart = await client.cart.refresh();
				get().setCart(newCart);
			},

			setOrder: async (order) =>
				set((state) => ({
					...state,
					order: order,
				})),

			captureOrder: async (checkoutTokenId, newOrder) => {
				try {
					const incomingOrder = await client.checkout.capture(
						checkoutTokenId,
						newOrder
					);
					await get().setOrder(incomingOrder);
					await get().refreshCart();
				} catch (error) {
					console.error(error.data.error.message);
				}
			},

			setError: (error) =>
				set((state) => ({
					...state,
					error: error,
				})),
		}),
		{ name: "commerceStore" }
	)
);

export default useStore;
