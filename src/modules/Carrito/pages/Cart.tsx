import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CreditCard } from '../../../components/icons';
import { ShoppingCartItem } from '../../../components/ShoppingCart';
import { GenericCard } from '../../../components/GenericCard';
import { useCart } from '../../../hooks/useCart';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getTotalCart } = useCart();
  const navigate = useNavigate();
  const total = getTotalCart();
  const canUseDeferredPayment = total >= 5000;

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Carrito de Compras</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <ShoppingCartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
          
          <GenericCard className="p-6 border-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-700">Total:</span>
              <span className="text-3xl font-bold text-green-600">{formatCurrency(total)}</span>
            </div>
            
            {canUseDeferredPayment ? (
              <button
                onClick={() => navigate('/pago')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="w-6 h-6" />
                Continuar a Pagos Diferidos
              </button>
            ) : (
              <div className="text-center">
                <p className="text-red-600 font-semibold mb-2">
                  Monto mínimo para pagos diferidos: $5,000
                </p>
                <p className="text-gray-600">
                  Te faltan {formatCurrency(5000 - total)} para acceder a esta promoción
                </p>
              </div>
            )}
          </GenericCard>
        </>
      )}
    </div>
  );
};