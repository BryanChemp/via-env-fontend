// components/EnvironmentCard.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faEye,
  faEyeSlash,
  faCopy,
  faEdit,
  faTrash,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

interface EnvironmentCardProps {
  variable: {
    id: string;
    name: string;
    value: string;
    type: string;
    isSecret: boolean;
    description?: string;
    lastUpdated: string;
    createdBy: string;
  };
  isRevealed: boolean;
  isCopied: boolean;
  onReveal: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const EnvironmentCard: React.FC<EnvironmentCardProps> = ({
  variable,
  isRevealed,
  isCopied,
  onReveal,
  onCopy,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardHeader>
        <VariableName>
          {variable.isSecret && (
            <SecretIndicator>
              <FontAwesomeIcon icon={faLock} />
            </SecretIndicator>
          )}
          {variable.name}
        </VariableName>
        <TypeBadge $type={variable.type}>
          {variable.type}
        </TypeBadge>
      </CardHeader>
      
      {variable.description && (
        <Description>{variable.description}</Description>
      )}
      
      <ValueSection>
        <ValueLabel>Valor</ValueLabel>
        {variable.isSecret ? (
          isRevealed ? (
            <RevealedValue>
              {variable.value}
              <HideButton onClick={onReveal}>
                <FontAwesomeIcon icon={faEyeSlash} />
              </HideButton>
            </RevealedValue>
          ) : (
            <MaskedValue>
              ••••••••••••••••
              <RevealButton onClick={onReveal}>
                <FontAwesomeIcon icon={faEye} />
                Revelar
              </RevealButton>
            </MaskedValue>
          )
        ) : (
          <PlainValue>
            <Code>{variable.value}</Code>
            {isCopied ? (
              <CopiedText>
                <FontAwesomeIcon icon={faCheck} />
                Copiado!
              </CopiedText>
            ) : (
              <CopyButton onClick={onCopy}>
                <FontAwesomeIcon icon={faCopy} />
              </CopyButton>
            )}
          </PlainValue>
        )}
      </ValueSection>
      
      <CardFooter>
        <LastUpdated>
          Atualizado {variable.lastUpdated}
          <Author>por {variable.createdBy}</Author>
        </LastUpdated>
        
        <Actions>
          <IconButton onClick={onEdit} title="Editar">
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
          <IconButton onClick={onCopy} title="Copiar">
            <FontAwesomeIcon icon={faCopy} />
          </IconButton>
          <IconButton $danger onClick={onDelete} title="Deletar">
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Actions>
      </CardFooter>
    </Card>
  );
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const VariableName = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const SecretIndicator = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

const TypeBadge = styled.span<{ $type: string }>`
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  line-height: 1.4;
`;

const ValueSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ValueLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const MaskedValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const RevealedValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.error}10;
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.error}30;
`;

const PlainValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Code = styled.code`
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RevealButton = styled.button`
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

const HideButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const CopyButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CopiedText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.md}px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const LastUpdated = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
`;

const Author = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const IconButton = styled.button<{ $danger?: boolean }>`
  width: 28px;
  height: 28px;
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