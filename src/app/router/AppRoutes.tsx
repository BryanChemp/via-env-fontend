import { Environments } from "@/features/environments/Environments";
import { AppLayout } from "@/layouts/AppLayout/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout/AuthLayout";
import { AppPaths, AuthPaths } from "@/shared/constants/Paths";
import { Routes, Route } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path={AuthPaths.LOGIN} element={<div>Login</div>} />
        <Route path={AuthPaths.REGISTER} element={<div>Cadastro</div>} />
      </Route>

      {/* PAINEL */}
      <Route element={<AppLayout />}>
            <Route index element={<></>} />
            <Route path={AppPaths.DASHBOARD} element={<></>} />
            <Route path={AppPaths.ENVIRONMENTS} element={<Environments/>} />
            <Route path={AppPaths.USERS} element={<></>} />
            <Route path={AppPaths.ANALYTICS} element={<></>} />

            <Route path={AppPaths.LOGS} element={<></>} />
            <Route path={AppPaths.DATABASE} element={<></>} />
            <Route path={AppPaths.SECURITY} element={<></>} />

            <Route path={AppPaths.SETTINGS} element={<></>} />
            <Route path={AppPaths.HELP} element={<></>} />
      </Route>
    </Routes>
  );
}
