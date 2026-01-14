import { title } from "@components/primitives";
import { GenericCard } from "@components/GenericCard";
import { GenericTable } from "@components/GenericTable";
import { BankSelector } from "@components/BankSelector";
import { PaymentTable } from "@components/PaymentTable";
import { Product, ProductCard } from "@components/ProductCard";

import DefaultLayout from "../../../layouts/default";
import { ShoppingCart } from "@components/ShoppingCart";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-6 py-8 md:py-10">
        <h1 className={title()}>Docs</h1>

        <GenericCard>
          <GenericTable columns={[]} data={[]} />
        </GenericCard>
      </section>

      <section className="flex flex-col gap-6 py-8 md:py-10">
        <BankSelector
          selectedBank={""}
          totalAmount={0}
          onBankChange={function (bankId: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </section>

      <section className="flex flex-col gap-6 py-8 md:py-10">
        <PaymentTable bankName={""} interestRate={0} months={0} payments={[]} totalAmount={0} />
      </section>

      <section className="flex flex-col gap-6 py-8 md:py-10">
        <ProductCard
          product={{
            id: "1",
            name: "Producto de Ejemplo",
            price: 299.99,
            image: "https://via.placeholder.com/200",
            description: "Descripción del producto",
          }}
          
          onAddToCart={(product) => {
            console.log("Producto agregado:", product);
            // Aquí iría tu lógica real para agregar al carrito
          }}
        />
      </section>

      
      <section className="flex flex-col gap-6 py-8 md:py-10">
        <ShoppingCart items={[]} onRemoveItem={function (productId: string): void {
          throw new Error("Function not implemented.");
        } } onUpdateQuantity={function (productId: string, quantity: number): void {
          throw new Error("Function not implemented.");
        } } onClearCart={function (): void {
          throw new Error("Function not implemented.");
        } }></ShoppingCart>
      </section>
    </DefaultLayout>
  );
}
