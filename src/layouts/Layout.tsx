import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  cartItemsCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartItemsCount }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cartItemsCount} />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>
      <footer className="border-t border-divider mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-default-500">
          <p className="text-sm">
            © 2026 Pagos Diferidos - Sistema de Financiamiento
          </p>
        </div>
      </footer>
    </div>
  );
};