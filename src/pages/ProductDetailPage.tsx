
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import { 
  ShoppingCart, 
  Check,
  Star, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight, 
  Loader2
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCart();
  
  const isInCart = product ? items.some(item => item.id === product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setActiveImage(data.thumbnail);
      } catch (err) {
        setError("Failed to load product. Please try again.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast({
        title: "Product added to cart",
        description: `${quantity} x ${product.title} added to your cart`,
      });
    }
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="mb-6">{error || "Product not found"}</p>
        <Link to="/products">
          <Button>
            <ArrowLeft className="mr-2" size={16} />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  // Calculate final price after discount
  const finalPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden mb-4 border h-[400px] flex items-center justify-center">
            <img 
              src={activeImage} 
              alt={product.title} 
              className="w-full h-full object-contain p-4"
            />
          </div>
          
          {/* Image gallery */}
          <div className="grid grid-cols-5 gap-2">
            {[product.thumbnail, ...product.images].slice(0, 5).map((image, index) => (
              <button
                key={index}
                className={`border rounded-md overflow-hidden h-20 ${
                  activeImage === image ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                }`}
                onClick={() => setActiveImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${product.title} - image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={`${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300"
                  }`} 
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
          </div>
          
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">${finalPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="ml-3 text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                Save {Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Brand</h3>
            <p className="text-gray-700">{product.brand}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
            <p className="capitalize text-gray-700">{product.category.replace("-", " ")}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Availability</h3>
            <div className="flex items-center">
              {product.stock > 0 ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-2 text-green-700">In Stock ({product.stock} available)</span>
                </>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>
          </div>
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <ChevronLeft size={16} />
              </Button>
              <span className="mx-4 text-lg font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10 || quantity >= product.stock}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full md:w-auto"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isInCart ? "Add More to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
