import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react";
import { Product } from "./ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Carrito de Compras</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-default-500 text-center py-8">
            Tu carrito está vacío
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Carrito de Compras</p>
          <p className="text-small text-default-500">{items.length} producto(s)</p>
        </div>
        <Button
          size="sm"
          color="danger"
          variant="flat"
          onPress={onClearCart}
        >
          Vaciar
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-default-500">
                ${item.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                isIconOnly
                variant="flat"
                onPress={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                -
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                size="sm"
                isIconOnly
                variant="flat"
                onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
              <Button
                size="sm"
                isIconOnly
                color="danger"
                variant="light"
                onPress={() => onRemoveItem(item.id)}
              >
                ×
              </Button>
            </div>
          </div>
        ))}
        <Divider />
        <div className="flex justify-between items-center pt-2">
          <p className="text-xl font-bold">Total:</p>
          <p className="text-2xl font-bold text-primary">
            ${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};