import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card shadow="sm" className="hover:shadow-lg transition-shadow">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="w-full object-cover h-[200px]"
          src={product.image}
        />
      </CardBody>
      <CardFooter className="text-small flex-col items-start gap-2">
        <div className="w-full">
          <b className="text-lg">{product.name}</b>
          {product.description && (
            <p className="text-default-500 text-sm mt-1">{product.description}</p>
          )}
        </div>
        <div className="w-full flex justify-between items-center mt-2">
          <p className="text-2xl font-bold text-primary">
            ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </p>
          <Button
            color="primary"
            size="sm"
            onPress={() => onAddToCart(product)}
            className="font-semibold"
          >
            Agregar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};