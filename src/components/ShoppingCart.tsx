import React from "react";
import { CartItem } from "../types";
import { X, Plus, Minus } from "./icons";

interface ShoppingCartItemProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const formatCurrency = (amount: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);

  return (
    <div className="flex items-center gap-4 bg-white border rounded-lg p-4">
      <div className="text-4xl">{item.image}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-lg font-bold text-green-600 mt-1">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-semibold w-8 text-center">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
