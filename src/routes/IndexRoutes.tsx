import DocsPage from "@modules/Bancos/pages/about";
import { Route, Routes } from "react-router-dom";

export function IndexRoutes() {
  return (
    <Routes>
      {/* <Route path="dashboard" element={<DashboardLayout />}> */}
      <Route>
        <Route element={<DocsPage />} path="empresas" />
      </Route>
      {/* <Route path="forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} /> */}
      {/* <Routes> */}
    </Routes>
  );
}
