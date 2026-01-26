import { Outlet, useLocation } from 'react-router-dom';
import * as S from './AppLayoutStyles';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { AppPaths } from '@/shared/constants/Paths';

export function AppLayout() {
  const location = useLocation();

  const getPageTitle = (pathname: string): string => {
    const titles: Record<string, string> = {
      [AppPaths.DASHBOARD]: 'Dashboard',
      [AppPaths.ENVIRONMENTS]: 'Variáveis de Ambiente',
      [AppPaths.USERS]: 'Gerenciar Usuários',
      [AppPaths.ANALYTICS]: 'Relatórios e Métricas',


      [AppPaths.LOGS]: 'Logs do Sistema',
      [AppPaths.DATABASE]: 'Dados e Armazenamento',
      [AppPaths.SECURITY]: 'Segurança do Sistema',

      [AppPaths.SETTINGS]: 'Configurações',
      [AppPaths.HELP]: 'Central de Ajuda',
    };
    
    return titles[pathname] || 'Dashboard';
  };

  const getBreadcrumb = (pathname: string): string => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'Dashboard';
    
    return segments.map(segment => {
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    }).join(' / ');
  };

  return (
    <S.AppContainer>
      <Sidebar/>

      <S.MainContent>
        <Header
          title={getPageTitle(location.pathname)}
          breadcrumb={getBreadcrumb(location.pathname)}
          onToggleTheme={() => {}}
          isDark={false}
        />

        <S.Content>
          <Outlet />
        </S.Content>
      </S.MainContent>
    </S.AppContainer>
  );
}