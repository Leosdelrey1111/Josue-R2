import { RadioGroup, Radio, Card, CardBody, CardHeader, Divider } from "@heroui/react";

export interface Bank {
  id: string;
  name: string;
  months: number;
  interestRate: number;
}

export const BANKS: Bank[] = [
  {
    id: "banco1",
    name: "Banco1",
    months: 9,
    interestRate: 8,
  },
  {
    id: "banco2",
    name: "Banco2",
    months: 12,
    interestRate: 10,
  },
  {
    id: "banco3",
    name: "Banco3",
    months: 18,
    interestRate: 13,
  },
];

interface BankSelectorProps {
  selectedBank: string;
  onBankChange: (bankId: string) => void;
  totalAmount: number;
}

export const BankSelector: React.FC<BankSelectorProps> = ({
  selectedBank,
  onBankChange,
  totalAmount,
}) => {
  const isEligible = totalAmount >= 5000;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start gap-1">
        <p className="text-lg font-semibold">Pagos Diferidos</p>
        <p className="text-small text-default-500">
          {isEligible
            ? "Selecciona tu plan de financiamiento"
            : "Monto mínimo requerido: $5,000.00"}
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        {!isEligible ? (
          <div className="text-center py-4">
            <p className="text-danger">
              El monto de compra debe ser mayor o igual a $5,000.00 para acceder a pagos diferidos.
            </p>
            <p className="text-default-500 mt-2">
              Monto actual: ${totalAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ) : (
          <RadioGroup
            value={selectedBank}
            onValueChange={onBankChange}
            label="Bancos participantes:"
          >
            {BANKS.map((bank) => (
              <Radio
                key={bank.id}
                value={bank.id}
                description={`${bank.months} meses - Tasa de interés: ${bank.interestRate}%`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{bank.name}</span>
                </div>
              </Radio>
            ))}
          </RadioGroup>
        )}
      </CardBody>
    </Card>
  );
};