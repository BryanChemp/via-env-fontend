import { AppLayout } from "@/layouts/AppLayout/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout/AuthLayout";
import { Routes, Route, Navigate } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Cadastro</div>} />
      </Route>

      {/* PAINEL */}
      <Route element={<AppLayout />}>
            <Route index element={<></>} />
            <Route path="environment" element={<></>} />
            <Route path="users" element={<div>Users Page</div>} />
            <Route path="logs" element={<div>Logs Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
            <Route path="help" element={<div>Help Page</div>} />
      </Route>
    </Routes>
  );
}
