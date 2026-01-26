import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;



// Environment Selector
export const EnvironmentSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

export const EnvironmentTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const EnvironmentTab = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme, $active }) => 
    $active ? theme.colors.backgroundCard : 'transparent'};
  border: 1px solid ${({ theme, $active }) => 
    $active ? theme.colors.border : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

export const EnvIndicator = styled.div<{ $color?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

export const EnvName = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const EnvCount = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.background};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
`;

export const EnvActions = styled.div``;

export const ActionButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Toolbar
export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const ClearSearch = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md}px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const SortSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
`;

export const ViewButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.backgroundCard};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.white : theme.colors.text};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme, $active }) => 
      $active ? theme.colors.primaryDark : theme.colors.backgroundLight};
  }
`;

export const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Content
export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

// List View
export const VariableList = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
`;

export const TableColumn = styled.div<{ $width?: string }>`
  flex: ${({ $width }) => $width ? `0 0 ${$width}` : '1'};
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TableBody = styled.div``;

export const VariableRow = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: background ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const VariableCell = styled.div<{ $width?: string }>`
  flex: ${({ $width }) => $width ? `0 0 ${$width}` : '1'};
  display: flex;
  align-items: center;
`;

export const VariableName = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const SecretIcon = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const VariableDescription = styled.small`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const MaskedValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
`;

export const RevealButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const RevealedValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.error};
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  background: ${({ theme }) => theme.colors.error}10;
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  border: 1px solid ${({ theme }) => theme.colors.error}30;
`;

export const HideButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const PlainValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CopyButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const CopiedBadge = styled.span`
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  animation: fadeInOut 2s ease;
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
`;

export const TypeBadge = styled.div<{ $type: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  
  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'error': 
        return theme.colors.error + '10'; // Concatena a string aqui
      case 'warning': 
        return theme.colors.warning + '10';
      case 'info': 
        return theme.colors.info + '10';
      default: 
        return theme.colors.primary + '10';
    }
  }};
  
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary;
    }
  }};
`;

export const LastUpdated = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
`;

export const UpdatedBy = styled.small`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const ActionIconButton = styled.button<{ $danger?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme, $danger }) => 
    $danger ? theme.colors.error : theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme, $danger }) => 
      $danger ? theme.colors.error : theme.colors.primary};
    border-color: ${({ theme, $danger }) => 
      $danger ? theme.colors.error : theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

// Grid View
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

// Empty State
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxxl}px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}10;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px 0;
`;

export const EmptyMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px 0;
  max-width: 400px;
`;

export const EmptyAction = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

// Stats Footer
export const StatsFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl}px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  padding-top: ${({ theme }) => theme.spacing.lg}px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text};
`;