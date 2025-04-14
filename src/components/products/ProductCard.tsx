
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      navigate("/login?redirect=/products");
      return;
    }
    
    addToCart(product);
  };

  // Calculate final price after discount
  const finalPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 card-gradient">
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
              {Math.round(product.discountPercentage)}% OFF
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
              {product.title}
            </h3>
            <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="ml-1 text-xs font-medium text-yellow-700 dark:text-yellow-400">{product.rating}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
          <div className="mt-3 flex items-end">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${finalPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full btn-hover-effect bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            variant="default"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
