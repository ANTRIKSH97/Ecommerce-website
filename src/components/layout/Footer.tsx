
import { Link } from "react-router-dom";
import { 
  Linkedin, 
  Instagram, 
  Github,
  Mail, 
  Phone, 
  MapPin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">ShopEase</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your one-stop destination for quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="www.linkedin.com/in/antriksh-dwivedi-a09653299" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <Linkedin size={22} className="hover:scale-110 transition-transform" />
              </a>
              <a href="https://github.com/ANTRIKSH97" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Github size={22} className="hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/adilovesmusic" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                <Instagram size={22} className="hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Products</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Cart</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Login</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=smartphones" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Smartphones</Link>
              </li>
              <li>
                <Link to="/products?category=laptops" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Laptops</Link>
              </li>
              <li>
                <Link to="/products?category=fragrances" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Fragrances</Link>
              </li>
              <li>
                <Link to="/products?category=skincare" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Skincare</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Prayagraj, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center group">
                <Phone size={20} className="mr-2 flex-shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+91 6393176649</span>
              </li>
              <li className="flex items-center group">
                <Mail size={20} className="mr-2 flex-shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">antrikshdubey15@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} ShopEase. All rights reserved. Designed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">ANTRIKSH DUBEY</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
