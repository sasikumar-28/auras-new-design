import useProductsByCategory from "@/hooks/useProductsByCategory";

const BestSellarsInKitchen = () => {
  const { products, loading, error } = useProductsByCategory({
    limit: 4, // Number of products per category
    offset: 0,
    categoryId: "ca5e506d-3c97-4b66-8be2-b81b5ea4f64a",
  });

  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-[#F2F2F2] p-5 rounded-xl mb-6">
      <h2 className="text-xl font-semibold mb-4">Best Sellars in Kitchen</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: any) => (
          <div className="">
            <div className="flex bg-white p-4 drop-shadow-lg rounded-xl h-24 gap-9">
              <img
                src={product.masterVariant.images[0].url}
                alt="Product 1"
                className="w-22 h-full object-cover rounded-lg"
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

export default BestSellarsInKitchen;
