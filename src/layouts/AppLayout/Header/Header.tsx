// components/Header/Header.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell,
  faSearch,
  faCog,
  faChevronDown,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';
import * as S from './HeaderStyles';

interface HeaderProps {
  title: string;
  breadcrumb?: string;
  onToggleTheme?: () => void;
  isDark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  breadcrumb,
  onToggleTheme,
  isDark = false,
}) => {
  return (
    <S.HeaderContainer>
      <S.HeaderLeft>
        {breadcrumb && (
          <S.Breadcrumb>
            <span>Via Env</span> / {breadcrumb}
          </S.Breadcrumb>
        )}
      </S.HeaderLeft>
      
      <S.HeaderRight>
        <S.HeaderActions>
          <S.HeaderButton aria-label="Pesquisar">
            <FontAwesomeIcon icon={faSearch} />
          </S.HeaderButton>
          
          {onToggleTheme && (
            <S.HeaderButton 
              onClick={onToggleTheme}
              aria-label="Alternar tema"
            >
              <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            </S.HeaderButton>
          )}
          
          <S.HeaderButton aria-label="Notificações">
            <FontAwesomeIcon icon={faBell} />
            <S.NotificationBadge>3</S.NotificationBadge>
          </S.HeaderButton>
          
          <S.HeaderButton aria-label="Configurações">
            <FontAwesomeIcon icon={faCog} />
          </S.HeaderButton>
          
          <S.UserMenu>
            <S.UserAvatar>
              AD
            </S.UserAvatar>
            <S.UserName>Admin</S.UserName>
            <FontAwesomeIcon icon={faChevronDown} />
          </S.UserMenu>
        </S.HeaderActions>
      </S.HeaderRight>
    </S.HeaderContainer>
  );
};