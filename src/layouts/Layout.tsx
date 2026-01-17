import React, { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Bell, Heart, Menu, MapPin, ChevronRight, Package } from "../components/icons";
import { useCart } from "../hooks/useCart";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Banner */}
      <div className="bg-yellow-400 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Envía a Dolores Hidalgo 37806</span>
            </div>
            <div className="hidden md:block">
              <span className="font-semibold">🎉 Ofertas por tiempo limitado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-yellow-300 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer flex-shrink-0">
              <div className="bg-yellow-400 rounded-lg p-2 shadow-sm">
                <Package className="w-8 h-8 text-blue-900" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">mercado</h1>
                <p className="text-xs text-gray-700 -mt-1">libre</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos, marcas y más..."
                  className="w-full pl-4 pr-10 py-2 rounded-sm shadow-sm border-0 focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-white hover:bg-gray-100 text-gray-600 rounded-r-sm">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-yellow-400 rounded-lg transition-colors hidden md:block">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-yellow-400 rounded-lg transition-colors hidden md:block">
                <Heart className="w-5 h-5" />
              </button>
              <button onClick={() => navigate("/carrito")} className="p-2 hover:bg-yellow-400 rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">{cart.length}</span>
                )}
              </button>
              <button className="p-2 hover:bg-yellow-400 rounded-lg transition-colors md:hidden">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 mt-3 text-sm">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Categorías
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Ofertas
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Cupones
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Supermercado
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Moda
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Vender
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Ayuda
            </a>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate("/")} className="hover:text-blue-600 transition-colors">
              Inicio
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Productos</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[600px]">{children || <Outlet />}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Acerca de</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Mercado Libre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Investor relations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Tendencias
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Sustentabilidad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Otros sitios</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Developers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Mercado Pago
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Mercado Envíos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Mercado Shops
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Ayuda</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Comprar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Vender
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Resolución de problemas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Centro de seguridad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Redes sociales</h5>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <span className="font-semibold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all">
                  <span className="font-semibold">𝕏</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all"
                >
                  <span className="font-semibold">in</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center">
            <p className="text-sm text-gray-600">Copyright © 1999-2026 MercadoLibre México SAPI de CV</p>
            <p className="text-xs text-gray-500 mt-2">Av. Insurgentes Sur 1602, Piso 9, Suite 900, Crédito Constructor, Benito Juárez, 03940, Ciudad de México, CDMX, México</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
