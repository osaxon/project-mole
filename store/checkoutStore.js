import create from "zustand";
import { persist } from "zustand/middleware";
import client from "../lib/commerce";

const initialState = {
	currentStep: "extrafields",
	processing: false,
	error: null,
};

const useCheckout = create(
	persist(
		(set, get) => ({
			...initialState,
			setCurrentStep: (params) =>
				set((state) => ({
					...state,
					currentStep: params.currentStep,
				})),
			setCheckout: (payload) =>
				set((state) => ({
					...state,
					...payload,
				})),
			generateToken: async (cartId) => {
				if (!cartId) return;
				try {
					const payload = await client.checkout.generateToken(
						cartId,
						{
							type: "cart",
						}
					);
					const set = get().setCheckout;
					set(payload);
					console.log(payload);
				} catch (err) {
					console.log(err);
				}
			},
		}),
		{ name: "checkout" }
	)
);

export default useCheckout;
