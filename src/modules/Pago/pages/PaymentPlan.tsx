import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { PaymentTable, PaymentRow } from "../../../components/PaymentTable";
import { Layout } from "../../../layouts/Layout";
import { BANKS } from "../../../components/BankSelector";

export const PaymentPlanPage = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [bankName, setBankName] = useState<string>("");
  const [months, setMonths] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [totalWithInterest, setTotalWithInterest] = useState<number>(0);
  const [originalAmount, setOriginalAmount] = useState<number>(0);

  useEffect(() => {
    // Recuperar datos del sessionStorage
    const storedTotal = sessionStorage.getItem("cartTotal");
    const storedBank = sessionStorage.getItem("selectedBank");
    const storedDate = sessionStorage.getItem("purchaseDate");

    if (!storedTotal || !storedBank || !storedDate) {
      // Si no hay datos, redirigir a productos
      navigate("/products");
      return;
    }

    const amount = parseFloat(storedTotal);
    const bank = BANKS.find((b) => b.id === storedBank);

    if (!bank) {
      navigate("/products");
      return;
    }

    // Calcular plan de pagos
    const interestAmount = amount * (bank.interestRate / 100);
    const total = amount + interestAmount;
    const monthlyPayment = total / bank.months;

    // Generar tabla de pagos
    const purchaseDate = new Date(storedDate);
    const paymentsArray: PaymentRow[] = [];

    for (let i = 1; i <= bank.months; i++) {
      const paymentDate = new Date(purchaseDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      paymentsArray.push({
        id: i,
        consecutive: i,
        paymentDate: paymentDate.toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        monthlyPayment: monthlyPayment,
        accumulated: monthlyPayment * i,
      });
    }

    setPayments(paymentsArray);
    setBankName(bank.name);
    setMonths(bank.months);
    setInterestRate(bank.interestRate);
    setTotalWithInterest(total);
    setOriginalAmount(amount);
  }, [navigate]);

  const handleNewPurchase = () => {
    // Limpiar sessionStorage
    sessionStorage.removeItem("cartItems");
    sessionStorage.removeItem("cartTotal");
    sessionStorage.removeItem("selectedBank");
    sessionStorage.removeItem("purchaseDate");
    
    navigate("/products");
  };

  const handlePrint = () => {
    window.print();
  };

  if (payments.length === 0) {
    return (
      <Layout cartItemsCount={0}>
        <div className="text-center py-12">
          <p>Cargando plan de pagos...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout cartItemsCount={0}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Plan de Pagos Generado</h1>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              onPress={handlePrint}
              startContent={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              }
            >
              Imprimir
            </Button>
            <Button color="success" onPress={handleNewPurchase}>
              Nueva Compra
            </Button>
          </div>
        </div>

        {/* Resumen financiero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardBody className="text-center">
              <p className="text-sm text-default-500 mb-1">Monto Original</p>
              <p className="text-2xl font-bold">
                ${originalAmount.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <p className="text-sm text-default-500 mb-1">Interés Total</p>
              <p className="text-2xl font-bold text-warning">
                ${(totalWithInterest - originalAmount).toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <p className="text-sm text-default-500 mb-1">Total a Pagar</p>
              <p className="text-2xl font-bold text-primary">
                ${totalWithInterest.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Tabla de amortización */}
        <PaymentTable
          payments={payments}
          totalAmount={totalWithInterest}
          bankName={bankName}
          months={months}
          interestRate={interestRate}
        />

        {/* Información adicional */}
        <Card className="mt-6">
          <CardHeader>
            <p className="font-semibold">Detalles del Financiamiento</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-default-500">Banco seleccionado:</p>
                <p className="font-semibold">{bankName}</p>
              </div>
              <div>
                <p className="text-default-500">Plazo:</p>
                <p className="font-semibold">{months} meses</p>
              </div>
              <div>
                <p className="text-default-500">Tasa de interés:</p>
                <p className="font-semibold">{interestRate}%</p>
              </div>
              <div>
                <p className="text-default-500">Pago mensual:</p>
                <p className="font-semibold">
                  ${(totalWithInterest / months).toLocaleString('es-MX', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Notas importantes */}
        <Card className="mt-6 border-l-4 border-l-warning">
          <CardBody>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Notas Importantes
            </h3>
            <ul className="list-disc list-inside text-sm text-default-600 space-y-1">
              <li>Los pagos se realizarán de forma mensual en las fechas indicadas</li>
              <li>El primer pago inicia un mes después de la fecha de compra</li>
              <li>El acumulado muestra el total pagado hasta ese mes</li>
              <li>Este es un plan de pagos diferidos con interés fijo</li>
              <li>Guarda o imprime este documento para tu referencia</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};