import { Outlet, useLocation } from 'react-router-dom';
import * as S from './AppLayoutStyles';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

export function AppLayout() {
  const location = useLocation();

  const handleMenuItemClick = (path: string) => {
    console.log('Navegar para:', path);
  };

  const getPageTitle = (pathname: string): string => {
    const titles: Record<string, string> = {
      '/': 'Dashboard',
      '/environment': 'Variáveis de Ambiente',
      '/users': 'Gerenciar Usuários',
      '/logs': 'Logs do Sistema',
      '/settings': 'Configurações',
      '/help': 'Central de Ajuda',
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
      <Sidebar
        activePath={location.pathname}
        onMenuItemClick={handleMenuItemClick}
      />

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