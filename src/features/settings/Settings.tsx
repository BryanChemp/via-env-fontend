// pages/SettingsPage.tsx
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faExclamationTriangle,
  faCopy,
  faCheck,
  faShieldAlt,
  faCreditCard,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';
import { Tabs, type Tab } from '@/shared/constants/Tabs/Tabs';

// --- MOCK DATA ---
const settingsTabs: Tab[] = [
  { id: 'general', name: 'Geral', icon: faCog },
  { id: 'security', name: 'Segurança & Acesso', icon: faShieldAlt },
  { id: 'billing', name: 'Faturamento', icon: faCreditCard },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>(settingsTabs[0]);
  const [copied, setCopied] = useState(false);
  const [projectName, setProjectName] = useState('Meu Projeto SaaS');

  const handleCopyId = () => {
    navigator.clipboard.writeText('proj_89sfd789sdf789');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <PageHeader
        title="Configurações do Projeto"
        description="Gerencie as informações gerais, segurança e preferências do projeto."
      />

      <Tabs 
        tabs={settingsTabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <MainContent>
        {activeTab.id === 'general' && (
          <SettingsGrid>
            
            {/* Seção Principal */}
            <SettingsCard>
              <CardHeader>
                <h3>Informações Básicas</h3>
                <p>Detalhes de identificação do seu projeto.</p>
              </CardHeader>
              
              <FormGroup>
                <Label>Nome do Projeto</Label>
                <Input 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)} 
                />
              </FormGroup>

              <FormGroup>
                <Label>Project ID</Label>
                <InputGroup>
                  <Input value="proj_89sfd789sdf789" readOnly disabled />
                  <IconButton onClick={handleCopyId} title="Copiar ID">
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                  </IconButton>
                </InputGroup>
                <HelperText>Este ID é usado para integrações via CLI e API.</HelperText>
              </FormGroup>

              <CardFooter>
                <PrimaryButton>
                  <FontAwesomeIcon icon={faSave} />
                  Salvar Alterações
                </PrimaryButton>
              </CardFooter>
            </SettingsCard>

            {/* Seção de Ambiente */}
            <SettingsCard>
              <CardHeader>
                <h3>Configuração de Ambientes</h3>
                <p>Defina quais ambientes estão habilitados para este projeto.</p>
              </CardHeader>
              <CheckboxGroup>
                <label>
                  <input type="checkbox" defaultChecked /> Development
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Staging
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Production
                </label>
              </CheckboxGroup>
            </SettingsCard>

            {/* Danger Zone */}
            <DangerZone>
              <div className="info">
                <h3>Deletar Projeto</h3>
                <p>Esta ação removerá permanentemente todos as secrets, logs e configurações. Não pode ser desfeito.</p>
              </div>
              <DangerButton>
                Excluir Projeto
              </DangerButton>
            </DangerZone>

          </SettingsGrid>
        )}

        {activeTab.id === 'security' && (
          <SettingsCard>
             <CardHeader>
                <h3>Segurança do Projeto</h3>
                <p>Configurações de IP Allowlist e rotacionamento de chaves.</p>
              </CardHeader>
             <EmptyState>Conteúdo da aba de segurança...</EmptyState>
          </SettingsCard>
        )}
      </MainContent>
    </Container>
  );
}

// --- STYLED COMPONENTS ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  font-family: 'Inter', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.xxl}px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 60px;
`;

const SettingsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl}px;
`;

const SettingsCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm.shadowColor}0D 0 1px 2px;
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs}px 0;
    font-size: ${({ theme }) => theme.typography.sizes.lg}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  }
`;

const FormGroup = styled.div`
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.xl}px;
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.gray50};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const IconButton = styled.button`
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const HelperText = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  color: ${({ theme }) => theme.colors.textLight};
`;

const CheckboxGroup = styled.div`
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.xl}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: ${({ theme }) => theme.typography.sizes.md}px;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
  }
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;
  background: ${({ theme }) => theme.colors.gray50};
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  justify-content: flex-end;
`;

const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const DangerZone = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.error}40;
  background: ${({ theme }) => theme.colors.error}08; // Transparência vermelha bem leve
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info h3 {
    color: ${({ theme }) => theme.colors.error};
    margin: 0 0 4px 0;
    font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  }

  .info p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  }
`;

const DangerButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error}60;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const EmptyState = styled.div`
    padding: 40px;
    text-align: center;
    color: ${({theme}) => theme.colors.textSecondary};
`;