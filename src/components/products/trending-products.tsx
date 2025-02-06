import useProductsByCategory from "@/hooks/useProductsByCategory";

const TrendingProducts = () => {
  const { products, loading, error } = useProductsByCategory({
    limit: 1,   // Number of products per category
  });

  if (loading) return <div>Loading trending products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#F2F2F2] p-5 rounded-xl mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Trending products you may like
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div className="">
            <div className="flex bg-white p-4 drop-shadow-lg rounded-xl h-24 gap-9">
              <img
                src={product.masterVariant.images[0].url}
                alt="Product 1"
                className="w-22 h-full object-cover rounded-md mb-2"
              />
              <div className="text-sm">
                <p>{product.name}</p>
                <p className="font-bold">
                  ${product.masterVariant.prices[0].value.centAmount / 100}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
