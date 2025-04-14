
import Hero from "@/components/home/Hero";
import FeatureSection from "@/components/home/FeatureSection";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeatureSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="mt-4 text-xl text-gray-500">Check out our latest products</p>
        </div>
        
        <ProductGrid limit={8} />
        
        <div className="mt-10 text-center">
          <Link to="/products">
            <Button size="lg">View All Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
