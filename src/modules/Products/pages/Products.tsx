import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { ProductCard, Product } from "../../../components/ProductCard";
import { ShoppingCart, CartItem } from "../../../components/ShoppingCart";
import { Layout } from "../../../layouts/Layout";

// Productos de ejemplo
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Laptop Gaming",
    price: 15000,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    description: "Laptop de alto rendimiento para gaming",
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    price: 25000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    description: "Último modelo de Apple",
  },
  {
    id: "3",
    name: "Smart TV 55\"",
    price: 12000,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    description: "Televisor 4K con Smart TV",
  },
  {
    id: "4",
    name: "Consola PS5",
    price: 10000,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    description: "PlayStation 5 nueva generación",
  },
  {
    id: "5",
    name: "Tablet Pro",
    price: 8000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    description: "Tablet profesional con stylus",
  },
  {
    id: "6",
    name: "Auriculares Premium",
    price: 3500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description: "Auriculares con cancelación de ruido",
  },
];

export const ProductsPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    // Guardar en sessionStorage para pasar a la siguiente página
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    sessionStorage.setItem("cartTotal", total.toString());
    
    navigate("/checkout");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Layout cartItemsCount={totalItems}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna de productos */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Catálogo de Productos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Columna del carrito */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ShoppingCart
              items={cartItems}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
            />
            {cartItems.length > 0 && (
              <Button
                color="primary"
                size="lg"
                className="w-full mt-4"
                onPress={handleCheckout}
              >
                Proceder al Checkout
              </Button>
            )}
            {totalAmount > 0 && totalAmount < 5000 && (
              <p className="text-warning text-sm text-center mt-2">
                Necesitas al menos $5,000.00 para pagos diferidos
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};