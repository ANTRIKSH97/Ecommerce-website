
import { useState, useEffect } from "react";
import { fetchProducts, fetchProductsByCategory, searchProducts } from "@/services/api";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  category?: string;
  searchQuery?: string;
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  category, 
  searchQuery,
  limit = 12
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let response;
        
        if (searchQuery) {
          response = await searchProducts(searchQuery);
        } else if (category) {
          response = await fetchProductsByCategory(category, page, limit);
        } else {
          response = await fetchProducts(page, limit);
        }
        
        setProducts(page === 1 ? response.products : [...products, ...response.products]);
        setTotalProducts(response.total);
        setHasMore(response.products.length >= limit && (page * limit) < response.total);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load products. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, category, searchQuery, limit]);

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <Button 
          onClick={() => setPage(1)} 
          variant="outline" 
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-8 text-center">
          <Button 
            onClick={loadMoreProducts} 
            disabled={loading}
            variant="outline"
            className="px-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
