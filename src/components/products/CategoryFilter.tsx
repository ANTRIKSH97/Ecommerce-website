
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Define a type for categories that might be objects or strings
type Category = string | { slug: string; name: string; url: string };

const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current category from URL query params
  const queryParams = new URLSearchParams(location.search);
  const currentCategory = queryParams.get("category") || "";

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    // Handle both string and object categories
    const categoryValue = typeof category === 'string' ? category : category.slug;
    navigate(`/products?category=${categoryValue}`);
  };

  const clearFilter = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      </div>
    );
  }

  // Helper function to get display name from category
  const getCategoryDisplayName = (category: Category): string => {
    if (typeof category === 'string') {
      return category.replace("-", " ");
    }
    return category.name || category.slug.replace("-", " ");
  };

  // Helper function to get category value for comparison
  const getCategoryValue = (category: Category): string => {
    return typeof category === 'string' ? category : category.slug;
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!currentCategory ? "default" : "outline"}
          size="sm"
          onClick={clearFilter}
          className="mb-2 btn-hover-effect"
        >
          All
        </Button>
        
        {categories.map((category, index) => (
          <Button
            key={typeof category === 'string' ? category : category.slug || index}
            variant={currentCategory === getCategoryValue(category) ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category)}
            className="mb-2 capitalize btn-hover-effect"
          >
            {getCategoryDisplayName(category)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
