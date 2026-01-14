import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { GenericTable, ColumnDefinition } from "./GenericTable";

export interface PaymentRow {
  id: number;
  consecutive: number;
  paymentDate: string;
  monthlyPayment: number;
  accumulated: number;
}

interface PaymentTableProps {
  payments: PaymentRow[];
  totalAmount: number;
  bankName: string;
  months: number;
  interestRate: number;
}

const columns: ColumnDefinition[] = [
  {
    uid: "consecutive",
    name: "No.",
    sortable: true,
  },
  {
    uid: "paymentDate",
    name: "Fecha de Pago",
    sortable: true,
  },
  {
    uid: "monthlyPayment",
    name: "Pago Mensual",
    sortable: true,
  },
  {
    uid: "accumulated",
    name: "Acumulado",
    sortable: true,
  },
];

export const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  totalAmount,
  bankName,
  months,
  interestRate,
}) => {
  const renderCell = (item: PaymentRow, columnKey: string) => {
    switch (columnKey) {
      case "consecutive":
        return <span className="font-semibold">{item.consecutive}</span>;
      case "paymentDate":
        return item.paymentDate;
      case "monthlyPayment":
        return (
          <span className="text-success font-semibold">
            ${item.monthlyPayment.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </span>
        );
      case "accumulated":
        return (
          <span className="font-semibold">
            ${item.accumulated.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </span>
        );
      default:
        return null;
    }
  };

  if (payments.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start gap-2">
        <p className="text-lg font-semibold">Plan de Pagos - {bankName}</p>
        <div className="flex flex-col gap-1 text-small text-default-500">
          <p>Monto total con intereses: ${totalAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
          <p>Plazo: {months} meses | Tasa de interés: {interestRate}%</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <GenericTable
          data={payments}
          columns={columns}
          renderCell={renderCell}
          hideSearch={true}
          hidePagination={true}
          disableSorting={true}
          defaultRowsPerPage={payments.length}
        />
      </CardBody>
    </Card>
  );
};