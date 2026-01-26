import { Outlet } from "react-router-dom";
import * as S from "./AuthLayoutStyles";

export function AuthLayout() {
  return (
    <S.Container>
      <S.Card>
        <Outlet />
      </S.Card>
    </S.Container>
  );
}
