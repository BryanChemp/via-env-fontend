// components/Sidebar/Sidebar.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt,
  faCogs,
  faUsers,
  faHistory,
  faSlidersH,
  faQuestionCircle,
  faBolt,
  faDatabase,
  faShieldAlt,
  faChartLine,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import * as S from './SidebarStyles';

interface MenuItem {
  id: string;
  label: string;
  icon: IconDefinition;
  path: string;
  badge?: number;
  section: 'main' | 'tools' | 'settings';
}

interface SidebarProps {
    activePath: string,
    onMenuItemClick: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePath = '/',
  onMenuItemClick,
}) => {
  const MENU_ITEMS: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: faTachometerAlt, path: '/', section: 'main' },
    { id: 'environment', label: 'Variáveis', icon: faCogs, path: '/environment', badge: 3, section: 'main' },
    { id: 'users', label: 'Usuários', icon: faUsers, path: '/users', section: 'main' },
    { id: 'analytics', label: 'Analytics', icon: faChartLine, path: '/analytics', section: 'main' },
    
    { id: 'logs', label: 'Logs', icon: faHistory, path: '/logs', section: 'tools' },
    { id: 'database', label: 'Database', icon: faDatabase, path: '/database', section: 'tools' },
    { id: 'security', label: 'Segurança', icon: faShieldAlt, path: '/security', section: 'tools' },
    
    { id: 'settings', label: 'Configurações', icon: faSlidersH, path: '/settings', section: 'settings' },
    { id: 'help', label: 'Ajuda', icon: faQuestionCircle, path: '/help', section: 'settings' },
  ];

  const handleMenuItemClick = (path: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(path);
    }
  };

  const menuSections = {
    main: MENU_ITEMS.filter(item => item.section === 'main'),
    tools: MENU_ITEMS.filter(item => item.section === 'tools'),
    settings: MENU_ITEMS.filter(item => item.section === 'settings'),
  };

  const sectionLabels = {
    main: 'Principal',
    tools: 'Ferramentas',
    settings: 'Sistema',
  };

  return (
    <S.SidebarContainer >
      <S.SidebarHeader >
        <S.LogoContainer>
          <S.LogoIcon>
            <FontAwesomeIcon icon={faBolt} />
          </S.LogoIcon>
          <S.LogoText >EnvControl</S.LogoText>
        </S.LogoContainer>
      </S.SidebarHeader>

      <S.SidebarContent>
        {Object.entries(menuSections).map(([sectionKey, items]) => (
          items.length > 0 && (
            <S.MenuSection key={sectionKey}>
              <S.SectionTitle >
                {sectionLabels[sectionKey as keyof typeof sectionLabels]}
              </S.SectionTitle>
              <S.MenuList>
                {items.map((item) => {
                  const isActive = activePath === item.path || 
                                 (item.path !== '/' && activePath.startsWith(item.path));
                  
                  return (
                    <S.MenuItem key={item.id}>
                      <S.MenuItemButton
                        $active={isActive}
                        onClick={() => handleMenuItemClick(item.path)}
                        aria-current={isActive ? "page" : undefined}
                        title={item.label}
                      >
                        <S.ActiveIndicator $active={isActive} />
                        <S.MenuItemIcon $active={isActive}>
                          <FontAwesomeIcon icon={item.icon} />
                        </S.MenuItemIcon>
                        <S.MenuItemLabel 
                          
                          $active={isActive}
                        >
                          {item.label}
                        </S.MenuItemLabel>
                        {item.badge && (
                          <S.MenuItemBadge >
                            {item.badge}
                          </S.MenuItemBadge>
                        )}
                      </S.MenuItemButton>
                    </S.MenuItem>
                  );
                })}
              </S.MenuList>
            </S.MenuSection>
          )
        ))}
      </S.SidebarContent>

      <S.SidebarFooter>
        <S.UserInfo >
          <S.UserAvatar>
            AD
          </S.UserAvatar>
          <S.UserDetails >
            <S.UserName>Admin User</S.UserName>
            <S.UserEmail>admin@envcontrol.com</S.UserEmail>
          </S.UserDetails>
        </S.UserInfo>
      </S.SidebarFooter>
    </S.SidebarContainer>
  );
};