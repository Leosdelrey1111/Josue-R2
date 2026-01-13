import { title } from "@components/primitives";
import { GenericCard } from "@components/GenericCard";
import { GenericTable } from "@components/GenericTable";
import DefaultLayout from "../../../layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-6 py-8 md:py-10">
        <h1 className={title()}>Docs</h1>

        <GenericCard>
          <GenericTable data={[]} columns={[]} />
        </GenericCard>
      </section>
    </DefaultLayout>
  );
}
