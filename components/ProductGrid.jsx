import Product from "./Product";

const ProductGrid = ({ products, ...props }) => {
	if (!products || products.length === 0) return null;

	console.log(products);

	return (
		<div className="w-full grid lg:grid-cols-3 gap-4 xl:gap-8">
			{products.map((product) => (
				<Product key={product.id} {...product} {...props} />
			))}
		</div>
	);
};

export default ProductGrid;
