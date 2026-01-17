import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../../components/ProductCard";
import { PRODUCTS } from "../../../config/products";
import { useCart } from "../../../hooks/useCart";

export const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    // Opcional: mostrar notificación
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};
