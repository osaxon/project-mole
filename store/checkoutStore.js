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
			nextStepfrom: (currentStep) => {
				switch (currentStep) {
					case "extrafields":
						return get().collects.shipping_address
							? "shipping"
							: "billing";
					case "shipping":
						return "billing";
					default:
						return "billing";
				}
			},
			testFunction: () => {
				console.log("test ok");
			},
			capture: (values) => client.checkout.capture(get().id, values),
			setCheckout: (params) =>
				set((state) => ({
					...state,
					...params,
				})),
			setLive: (params) =>
				set((state) => ({
					...state,
					live: { ...state.live, ...params },
				})),
			setShippingMethod: async (shipping_option_id, country, region) => {
				try {
					const { live } = await client.checkout.checkShippingOption(
						state.id,
						{
							shipping_option_id,
							country,
							...(region && { region }),
						}
					);
					const setLive = get().setLive;
					setLive(payload);
				} catch (err) {
					console.error(err);
				}
			},
			setProcessing: (params) =>
				set((state) => ({
					...state,
					processing: params,
				})),
			setError: (params) =>
				set((state) => ({
					error: params,
				})),
			reset: () => {
				set(
					(state) => ({
						...initialState,
					}),
					// Zustand 'replace mode' overwrites existing state
					true
				);
			},
			generateToken: async (cartId) => {
				if (!cartId) {
					console.log("Invalid cart id");
					return;
				}
				try {
					console.log("Contacting Commerce JS API...");
					const checkout = await client.checkout.generateToken(
						cartId,
						{
							type: "cart",
						}
					);
					console.log(checkout);
					return checkout;
				} catch (err) {
					console.log(err);
				}
			},
		}),
		{ name: "checkout" }
	)
);

export default useCheckout;
