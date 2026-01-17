import { BankImplementor } from "../types/bank";
import { PaymentResult, PaymentScheduleItem } from "../types";

export class Banco1 implements BankImplementor {
  getName(): string {
    return "Banco1";
  }
  getMonths(): number {
    return 9;
  }
  getInterestRate(): number {
    return 0.08;
  }
  calculateTotal(amount: number): number {
    return amount * (1 + this.getInterestRate());
  }
  calculateMonthlyPayment(total: number): number {
    return total / this.getMonths();
  }
}

export class Banco2 implements BankImplementor {
  getName(): string {
    return "Banco2";
  }
  getMonths(): number {
    return 12;
  }
  getInterestRate(): number {
    return 0.1;
  }
  calculateTotal(amount: number): number {
    return amount * (1 + this.getInterestRate());
  }
  calculateMonthlyPayment(total: number): number {
    return total / this.getMonths();
  }
}

export class Banco3 implements BankImplementor {
  getName(): string {
    return "Banco3";
  }
  getMonths(): number {
    return 18;
  }
  getInterestRate(): number {
    return 0.13;
  }
  calculateTotal(amount: number): number {
    return amount * (1 + this.getInterestRate());
  }
  calculateMonthlyPayment(total: number): number {
    return total / this.getMonths();
  }
}

// Patrón Bridge - Abstracción
export abstract class PaymentPlan {
  protected bank: BankImplementor;

  constructor(bank: BankImplementor) {
    this.bank = bank;
  }

  abstract processPayment(amount: number): PaymentResult;
}

// Patrón Bridge - Refinamiento
export class DeferredPaymentPlan extends PaymentPlan {
  processPayment(amount: number): PaymentResult {
    const total = this.bank.calculateTotal(amount);
    const monthlyPayment = this.bank.calculateMonthlyPayment(total);
    const months = this.bank.getMonths();

    const schedule: PaymentScheduleItem[] = [];
    const today = new Date();
    let accumulated = 0;

    for (let i = 1; i <= months; i++) {
      accumulated += monthlyPayment;
      const paymentDate = new Date(today);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      schedule.push({
        number: i,
        date: paymentDate,
        amount: monthlyPayment,
        accumulated: accumulated,
      });
    }

    return {
      bankName: this.bank.getName(),
      originalAmount: amount,
      interestRate: this.bank.getInterestRate(),
      totalAmount: total,
      months: months,
      monthlyPayment: monthlyPayment,
      schedule: schedule,
    };
  }
}
