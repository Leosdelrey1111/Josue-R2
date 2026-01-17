import React from "react";
import { Product } from "../types";
import { GenericCard } from "./GenericCard";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatCurrency = (amount: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);

  return (
    <GenericCard>
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <span className="text-6xl">{product.image}</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">{formatCurrency(product.price)}</span>
        </div>
        <button onClick={() => onAddToCart(product)} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Agregar al carrito
        </button>
      </div>
    </GenericCard>
  );
};
