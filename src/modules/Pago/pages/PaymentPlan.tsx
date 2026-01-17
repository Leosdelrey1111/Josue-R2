import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "../../../components/icons";
import { BankSelector } from "../../../components/BankSelector";
import { useCart } from "../../../hooks/useCart";
import { BANKS_CONFIG } from "../../../config/products";
import { Banco1, Banco2, Banco3, DeferredPaymentPlan } from "../../../config/banks";

export const PaymentPage: React.FC = () => {
  const { getTotalCart } = useCart();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const navigate = useNavigate();
  const total = getTotalCart();

  const formatCurrency = (amount: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);

  const processPayment = () => {
    if (!selectedBank) {
      alert("Por favor seleccione un banco");
      return;
    }

    let bank;
    switch (selectedBank) {
      case "banco1":
        bank = new Banco1();
        break;
      case "banco2":
        bank = new Banco2();
        break;
      case "banco3":
        bank = new Banco3();
        break;
      default:
        return;
    }

    const paymentPlan = new DeferredPaymentPlan(bank);
    const result = paymentPlan.processPayment(total);

    // Guardar resultado en sessionStorage o context
    sessionStorage.setItem("paymentResult", JSON.stringify(result));
    navigate("/resultado");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pagos Diferidos</h2>
        <button onClick={() => navigate("/carrito")} className="text-blue-600 hover:text-blue-700 font-medium">
          ← Volver al carrito
        </button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-800">Total de tu compra:</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-gray-700">Selecciona tu banco:</h3>

      <BankSelector banks={BANKS_CONFIG} selectedBank={selectedBank} onSelectBank={setSelectedBank} cartTotal={total} />

      <button
        onClick={processPayment}
        disabled={!selectedBank}
        className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all ${
          selectedBank ? "bg-green-600 text-white hover:bg-green-700 shadow-lg" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {selectedBank ? "Calcular Plan de Pagos" : "Selecciona un banco para continuar"}
      </button>
    </div>
  );
};
