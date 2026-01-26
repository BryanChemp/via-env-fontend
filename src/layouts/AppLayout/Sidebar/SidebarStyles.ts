// components/Sidebar/SidebarStyles.ts
import styled from 'styled-components';

interface MenuItemButtonProps {
  $active?: boolean;
}

// Container principal limpo
export const SidebarContainer = styled.aside`
  width: ${({ theme }) => theme.layout.sidebarWidth}px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: width ${({ theme }) => theme.transitions.medium};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.03);
`;

// Header simples
export const SidebarHeader = styled.div`
  height: ${({ theme }) => theme.layout.headerHeight}px;
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  flex-shrink: 0;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const LogoText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  white-space: nowrap;
  transition: opacity ${({ theme }) => theme.transitions.medium};
`;

// Conteúdo com scroll melhorado
export const SidebarContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px 0;
  overflow-y: auto;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.borderDark};
    }
  }
`;

// Seções simplificadas
export const MenuSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  transition: all ${({ theme }) => theme.transitions.medium};
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  margin: 0;
`;

// Botão do menu limpo
export const MenuItemButton = styled.button<MenuItemButtonProps>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:focus {
    outline: none;
  }
`;

export const MenuItemIcon = styled.div<{ $active?: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
  flex-shrink: 0;
  
  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme, $active }) => 
      $active ? theme.colors.primary : theme.colors.textSecondary};
  }
`;

export const MenuItemLabel = styled.span<{ $active?: boolean }>`
  color: ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  font-weight: ${({ theme, $active }) => 
    $active ? theme.typography.weights.medium : theme.typography.weights.normal};
  flex: 1;
  text-align: left;
  white-space: nowrap;
  transition: opacity ${({ theme }) => theme.transitions.medium};
`;

// Indicador ativo simples
export const ActiveIndicator = styled.div<{ $active?: boolean }>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 16px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 0 2px 2px 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.fast};
`;

export const MenuItemBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  margin-left: auto;
  transition: opacity ${({ theme }) => theme.transitions.medium};
`;

// Footer clean
export const SidebarFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  flex-shrink: 0;
`;

export const UserDetails = styled.div`
  transition: opacity ${({ theme }) => theme.transitions.medium};
  overflow: hidden;
`;

export const UserName = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  white-space: nowrap;
`;

export const UserEmail = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  margin-top: 2px;
  white-space: nowrap;
`;