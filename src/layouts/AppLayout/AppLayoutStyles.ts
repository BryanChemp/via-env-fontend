// components/AppLayout/AppLayoutStyles.ts
import styled from 'styled-components';

interface MainContentProps {
  $sidebarCollapsed?: boolean;
}

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const MainContent = styled.main<MainContentProps>`
  flex: 1;
  margin-left: ${({ theme, $sidebarCollapsed }) => 
    $sidebarCollapsed ? theme.layout.sidebarCollapsedWidth : theme.layout.sidebarWidth}px;
  transition: margin-left ${({ theme }) => theme.transitions.medium};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl}px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.borderDark};
    }
  }
`;