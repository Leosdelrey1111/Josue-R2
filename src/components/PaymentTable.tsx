import React from "react";
import { PaymentResult } from "../types";
import { Calendar } from "./icons";

interface PaymentTableProps {
  result: PaymentResult;
}

export const PaymentTable: React.FC<PaymentTableProps> = ({ result }) => {
  const formatCurrency = (amount: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);

  const formatDate = (date: Date) => new Intl.DateTimeFormat("es-MX", { year: "numeric", month: "long", day: "numeric" }).format(date);

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Tabla de Amortización - {result.months} Meses
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pago #</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fecha de Pago</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Monto Mensual</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Acumulado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {result.schedule.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{payment.number}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(payment.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-lg font-semibold text-green-600">{formatCurrency(payment.amount)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-lg font-bold text-gray-800">{formatCurrency(payment.accumulated)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
