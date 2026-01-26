// components/Sidebar/Sidebar.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import * as S from './SidebarStyles';
import { MENU_SECTIONS, sectionLabels } from '@/shared/constants/Menu';
import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const activePath = location.pathname;

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
        {Object.entries(MENU_SECTIONS).map(([sectionKey, items]) => (
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