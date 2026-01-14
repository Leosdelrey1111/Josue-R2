import { title } from "@components/primitives";
import { GenericCard } from "@components/GenericCard";
import { GenericTable } from "@components/GenericTable";
import DefaultLayout from "../../../layouts/default";
import { BankSelector } from "@components/BankSelector";
import { PaymentTable } from "@components/PaymentTable";
import { Product, ProductCard } from "@components/ProductCard";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-6 py-8 md:py-10">
        <h1 className={title()}>Docs</h1>

        <GenericCard>
          <GenericTable data={[]} columns={[]} />
        </GenericCard>
      </section>
      
      <section className="flex flex-col gap-6 py-8 md:py-10">
        <BankSelector selectedBank={""} onBankChange={function (bankId: string): void {
          throw new Error("Function not implemented.");
        } } totalAmount={0}></BankSelector>
      </section>

      <section className="flex flex-col gap-6 py-8 md:py-10">
        <PaymentTable payments={[]} totalAmount={0} bankName={""} months={0} interestRate={0}></PaymentTable>
      </section>
      
      <section className="flex flex-col gap-6 py-8 md:py-10">
        <ProductCard product={} onAddToCart={function (product: Product): void {
          throw new Error("Function not implemented.");
        } }></ProductCard>
      </section>
      


    </DefaultLayout>
  );
}