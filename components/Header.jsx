import React from "react";
import Link from "next/link";
import CartSummary from "./CartSummary";

const Header = () => {
	return (
		<header className="">
			<div className="py-3 lg:py-5 flex items-center">
				<Link href="/">
					<a>Shop</a>
				</Link>
				<span className="pr-1">,</span>
				<CartSummary />
			</div>
		</header>
	);
};

export default Header;
