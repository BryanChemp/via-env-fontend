import { Analytics } from "@/features/analytics/Analytics";
import { Database } from "@/features/database/Database";
import { Environments } from "@/features/environments/Environments";
import { Help } from "@/features/help/Help";
import { Login } from "@/features/login/Login";
import { Logs } from "@/features/logs/Logs";
import { Register } from "@/features/register/Register";
import { Security } from "@/features/security/Security";
import { Settings } from "@/features/settings/Settings";
import { Users } from "@/features/users/Users";
import { AppLayout } from "@/layouts/AppLayout/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout/AuthLayout";
import { AppPaths, AuthPaths } from "@/shared/constants/Paths";
import { Routes, Route } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path={AuthPaths.LOGIN} element={<Login />} />
        <Route path={AuthPaths.REGISTER} element={<Register/>} />
      </Route>

      {/* PAINEL */}
      <Route element={<AppLayout />}>
            <Route index element={<></>} />
            <Route path={AppPaths.ENVIRONMENTS} element={<Environments/>} />
            <Route path={AppPaths.USERS} element={<Users/>} />
            <Route path={AppPaths.ANALYTICS} element={<Analytics/>} />

            <Route path={AppPaths.LOGS} element={<Logs/>} />
            <Route path={AppPaths.DATABASE} element={<Database />} />
            <Route path={AppPaths.SECURITY} element={<Security/>} />

            <Route path={AppPaths.SETTINGS} element={<Settings/>} />
            <Route path={AppPaths.HELP} element={<Help/>} />
      </Route>
    </Routes>
  );
}
