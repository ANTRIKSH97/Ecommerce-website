
import { useLocation } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: "{searchQuery}"
      </h1>
      
      <ProductGrid searchQuery={searchQuery} />
    </div>
  );
};

export default SearchResultsPage;
