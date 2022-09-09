import useCheckout from "../store/checkoutStore";

export const nextStepFrom = (currentStep, shippingAddress) => {
	switch (currentStep) {
		case "extrafields":
			return shippingAddress ? "shipping" : "billing";
		case "shipping":
		default:
			return "billing";
	}
};
