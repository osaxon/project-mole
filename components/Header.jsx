import React from "react";
import Link from "next/link";
import CartSummary from "./CartSummary";
import cc from "classcat";

const Header = ({ className }) => {
	const style = cc(["", className]);

	return (
		<header className={style}>
			<div className="py-3 lg:py-5 flex items-center justify-between">
				<Link href="/">
					<a>Shop</a>
				</Link>
				<CartSummary />
			</div>
		</header>
	);
};

export default Header;
