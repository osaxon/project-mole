import create from "zustand";
import { persist } from "zustand/middleware";
import client from "../lib/commerce";

const initialState = {
	total_items: 0,
	total_unique_items: 0,
	line_items: [],
};

const useCart = create(
	persist(
		(set, get) => ({
			_hasHydrated: false,
			setHasHydrated: (state) => {
				set({
					_hasHydrated: state,
				});
			},

			// Controls cart visibility
			open: false,
			toggle: () =>
				set(
					(prev) => ({
						open: !prev.open,
					}),
					false,
					"toggle"
				),

			cart: {},

			setCart: (params) => {
				set(
					(state) => ({
						...state,
						cart: params,
					}),
					true
				);
			},

			// Reset to default state
			reset: async () => {
				set(
					(state) => ({
						...initialState,
					}),
					// Zustand 'replace mode' overwrites existing state
					true
				);
			},
		}),

		{
			name: "cart",
			onRehydrateStorage: () => (state) => {
				state.setHasHydrated(true);
			},
		}
	)
);

export default useCart;
