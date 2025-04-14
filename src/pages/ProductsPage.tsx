
import { useLocation } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryFilter from "@/components/products/CategoryFilter";

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || undefined;
  const searchQuery = queryParams.get("q") || undefined;

  // Helper function to format category name
  const formatCategoryName = (cat: string): string => {
    return cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm backdrop-blur-sm">
          <CategoryFilter />
        </div>
        
        <div className="w-full md:w-3/4 lg:w-4/5">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
            {searchQuery 
              ? `Search results for: "${searchQuery}"` 
              : category 
                ? formatCategoryName(category)
                : "All Products"}
          </h1>
          
          <ProductGrid category={category} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
