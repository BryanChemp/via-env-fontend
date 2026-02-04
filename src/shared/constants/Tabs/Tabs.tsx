import type { Dispatch, FC } from "react";
import styled from "styled-components";

export interface Tab {
    id: string,
    name: string,
    color?: string,
    count?: number,
}

interface TabsProps {
    tabs: Tab[];
    activeTab: Tab;
    setActiveTab: Dispatch<Tab>;
}

export const Tabs: FC<TabsProps> = ({
    tabs,
    activeTab,
    setActiveTab
}) => {
    return (
        <TabsContainer>
            <TabsList>
            {tabs.map(tab => (
                <Tab 
                    key={tab.id} 
                    $active={activeTab.id === tab.id}
                    $color={tab.color}
                    onClick={() => setActiveTab(tab)}
                >
                {tab.color && <span className="dot" />}
                {tab.name}
                {typeof tab.count === 'number' && (
                    <span className="count">{tab.count}</span>
                )}
                </Tab>
            ))}
            </TabsList>
      </TabsContainer>
    )
}

const TabsContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.xxl}px;
  padding-top: ${({ theme }) => theme.spacing.md}px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TabsList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl}px;
`;

const Tab = styled.button<{ $active?: boolean; $color?: string }>`
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing.md}px 0;
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  font-weight: ${({ theme, $active }) => 
    $active ? theme.typography.weights.semibold : theme.typography.weights.medium};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.text : theme.colors.textSecondary};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  transition: color ${({ theme }) => theme.transitions.fast};

    &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${({ theme, $active }) => 
        $active ? (theme.colors.primary) : 'transparent'};
        transition: all ${({ theme }) => theme.transitions.fast};
    }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  .dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $color, theme }) => $color || theme.colors.gray300};
  }

  .count {
    margin-left: 2px;
    background: ${({ theme }) => theme.colors.gray100};
    padding: 2px 8px;
    border-radius: ${({ theme }) => theme.borderRadius.pill}px;
    font-size: ${({ theme }) => theme.typography.sizes.xs}px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }
`;
