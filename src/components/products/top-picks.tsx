import useProductsByCategory from "@/hooks/useProductsByCategory";

const TopPicks = () => {
  const { products, loading, error } = useProductsByCategory({
    limit: 1, // Number of products per category
    offset: 1, // Starting point for fetching
  });

  if (loading) return <div>Loading top picks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#F2F2F2] p-5 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Top Picks for You</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <div className="flex bg-white p-4 drop-shadow-lg rounded-xl h-24 gap-9">
              <img
                src={
                  product.masterVariant.images[0]?.url ||
                  "https://via.placeholder.com/150"
                }
                alt={product.name}
                className="w-22 h-full object-cover rounded-md mb-2"
              />
              <div className="text-sm">
                <p>{product.name}</p>
                <p className="font-bold">
                  $
                  {product.masterVariant.prices[0]?.value.centAmount / 100 ||
                    "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicks;
