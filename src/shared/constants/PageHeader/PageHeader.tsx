import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

interface PageHeaderButtonProps {
  text: string;
  onClick: () => void;
  icon?: IconDefinition;
}

interface PageHeaderProps {
  title: string
  description: string
  button?: PageHeaderButtonProps
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  button
}) => {
    return (
        <Header>
                <HeaderTitle>
                  <h1>{title}</h1>
                  <p>{description}</p>
                </HeaderTitle>
                {button && (
                  <PrimaryButton onClick={button.onClick}>
                    {button.icon && (
                      <FontAwesomeIcon icon={button.icon} />
                    )}
                    {button.text}
                  </PrimaryButton>
                )}
              </Header>
    )
};

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.xxl}px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => theme.layout.headerHeight}px;
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.typography.sizes.xxl}px;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    margin: 0 0 ${({ theme }) => theme.spacing.xs}px 0;
    color: ${({ theme }) => theme.colors.text};
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.sizes.md}px;
  }
`;

const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;
