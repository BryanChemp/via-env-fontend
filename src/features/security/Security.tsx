// pages/SecurityPage.tsx
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt,
  faNetworkWired,
  faRobot,
  faPlus,
  faTrash,
  faCheckCircle,
  faGlobe,
  faLaptopCode,
  faExclamationTriangle,
  faCopy
} from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';
import { Tabs, type Tab } from '@/shared/constants/Tabs/Tabs';

// --- MOCK DATA ---
const securityTabs: Tab[] = [
  { id: 'network', name: 'IP Allowlist (Firewall)', icon: faNetworkWired },
  { id: 'tokens', name: 'Service Tokens', icon: faRobot },
  { id: 'scanning', name: 'Secret Scanning', icon: faShieldAlt },
];

const mockIps = [
  { id: '1', ip: '192.168.1.0/24', description: 'Escritório Matriz', createdAt: '12 Out, 2023' },
  { id: '2', ip: '200.189.10.55', description: 'VPN Developers', createdAt: '15 Nov, 2023' },
  { id: '3', ip: '10.0.0.0/8', description: 'AWS VPC Production', createdAt: '02 Jan, 2024' },
];

const mockTokens = [
  { id: '1', name: 'GitHub Actions CI', prefix: 'vEnv_ci_...', lastUsed: '2 min atrás', expires: 'Nunca' },
  { id: '2', name: 'Vercel Integration', prefix: 'vEnv_vrc_...', lastUsed: '5 dias atrás', expires: 'Em 30 dias' },
];

export function Security() {
  const [activeTab, setActiveTab] = useState<Tab>(securityTabs[0]);
  const [newIp, setNewIp] = useState('');

  return (
    <Container>
      <PageHeader
        title="Segurança e Acesso"
        description="Gerencie regras de firewall, tokens de máquina e monitoramento de vazamentos."
      />

      <Tabs 
        tabs={securityTabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <MainContent>
        
        {/* TAB: NETWORK / FIREWALL */}
        {activeTab.id === 'network' && (
          <SectionContainer>
            <AlertBox>
              <FontAwesomeIcon icon={faGlobe} />
              <div className="content">
                <strong>Seu IP Atual: 201.55.99.123</strong>
                <p>Certifique-se de adicionar seu IP atual antes de habilitar o modo restrito.</p>
              </div>
              <SecondaryButton>Adicionar meu IP</SecondaryButton>
            </AlertBox>

            <Card>
              <CardHeader>
                <div>
                  <h3>Regras de IP Allowlist</h3>
                  <p>Apenas requisições vindas destes IPs poderão ler as secrets deste projeto.</p>
                </div>
                <ToggleLabel>
                  <span>Habilitado</span>
                  <ToggleSwitch $checked={true}>
                    <input type="checkbox" defaultChecked />
                    <span className="slider" />
                  </ToggleSwitch>
                </ToggleLabel>
              </CardHeader>

              <AddIpForm>
                <input 
                  placeholder="Ex: 192.168.0.1 ou 10.0.0.0/24" 
                  value={newIp}
                  onChange={e => setNewIp(e.target.value)}
                />
                <input placeholder="Descrição (Opcional)" className="desc-input" />
                <PrimaryButton>
                  <FontAwesomeIcon icon={faPlus} />
                  Adicionar Regra
                </PrimaryButton>
              </AddIpForm>

              <ListContainer>
                {mockIps.map(rule => (
                  <ListItem key={rule.id}>
                    <div className="info">
                      <code className="ip">{rule.ip}</code>
                      <span className="desc">{rule.description}</span>
                    </div>
                    <div className="meta">
                      <span>Adicionado em {rule.createdAt}</span>
                      <DeleteButton>
                        <FontAwesomeIcon icon={faTrash} />
                      </DeleteButton>
                    </div>
                  </ListItem>
                ))}
              </ListContainer>
            </Card>
          </SectionContainer>
        )}

        {/* TAB: SERVICE TOKENS */}
        {activeTab.id === 'tokens' && (
          <SectionContainer>
             <Card>
              <CardHeader>
                <div>
                  <h3>Service Tokens (Machine-to-Machine)</h3>
                  <p>Tokens usados por pipelines de CI/CD e servidores. Eles não contam como usuários.</p>
                </div>
                <PrimaryButton>
                  <FontAwesomeIcon icon={faPlus} />
                  Novo Token
                </PrimaryButton>
              </CardHeader>
              
              <ListContainer>
                {mockTokens.map(token => (
                  <ListItem key={token.id}>
                    <div className="token-icon">
                      <FontAwesomeIcon icon={faRobot} />
                    </div>
                    <div className="info">
                      <strong>{token.name}</strong>
                      <code className="prefix">{token.prefix}</code>
                    </div>
                    <div className="meta">
                      <Badge $status={token.expires === 'Nunca' ? 'warning' : 'success'}>
                        Expira: {token.expires}
                      </Badge>
                      <span className="last-used">Uso: {token.lastUsed}</span>
                      <DeleteButton>
                        <FontAwesomeIcon icon={faTrash} />
                      </DeleteButton>
                    </div>
                  </ListItem>
                ))}
              </ListContainer>
             </Card>
          </SectionContainer>
        )}

        {/* TAB: SECRET SCANNING */}
        {activeTab.id === 'scanning' && (
          <SectionContainer>
            <StatusCard $safe={true}>
              <div className="icon-area">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <div className="text-area">
                <h3>Nenhum vazamento detectado</h3>
                <p>O monitoramento automático verificou seus repositórios GitHub conectados há 10 minutos.</p>
              </div>
              <SecondaryButton>Verificar Agora</SecondaryButton>
            </StatusCard>

            <Card>
              <CardHeader>
                <h3>Repositórios Monitorados</h3>
              </CardHeader>
              <ListContainer>
                <ListItem>
                  <div className="info">
                    <FontAwesomeIcon icon={faLaptopCode} style={{ marginRight: 10, color: '#6B7280' }} />
                    <strong>my-company/backend-api</strong>
                  </div>
                  <div className="meta">
                    <span className="status-text ok">
                      <FontAwesomeIcon icon={faCheckCircle} /> Seguro
                    </span>
                  </div>
                </ListItem>
              </ListContainer>
            </Card>
          </SectionContainer>
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
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
  box-shadow: 0 1px 2px ${({ theme }) => theme.shadows.sm.shadowColor}0D;
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0 0 4px 0;
    font-size: ${({ theme }) => theme.typography.sizes.lg}px;
    color: ${({ theme }) => theme.colors.text};
  }
  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const AlertBox = styled.div`
  background-color: #EFF6FF; // Blue 50
  border: 1px solid #DBEAFE; // Blue 200
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  color: #1E40AF; // Blue 800

  svg { font-size: 20px; }

  .content {
    flex: 1;
    strong { display: block; margin-bottom: 2px; }
    p { margin: 0; font-size: ${({ theme }) => theme.typography.sizes.sm}px; opacity: 0.9; }
  }
`;

const AddIpForm = styled.div`
  padding: ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;

  input {
    padding: 10px 12px;
    border-radius: ${({ theme }) => theme.borderRadius.md}px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
    outline: none;
    
    &:first-child { flex: 1; font-family: 'IBM Plex Mono', monospace; }
    &.desc-input { flex: 2; }
    &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: background 0.2s;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.gray50}; }

  .info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .ip {
      font-family: 'IBM Plex Mono', monospace;
      background: ${({ theme }) => theme.colors.gray100};
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 13px;
      color: ${({ theme }) => theme.colors.text};
    }
    .desc { color: ${({ theme }) => theme.colors.textSecondary}; font-size: 14px; }
    
    strong { font-size: 14px; color: ${({ theme }) => theme.colors.text}; }
    .prefix { color: ${({ theme }) => theme.colors.textLight}; font-size: 13px; font-family: monospace; }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textSecondary};

    .status-text.ok { color: ${({ theme }) => theme.colors.success}; display: flex; gap: 6px; align-items: center; }
  }
  
  .token-icon {
    width: 32px; height: 32px;
    background: ${({ theme }) => theme.colors.primaryExtraLight};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    margin-right: 12px;
  }
`;

const StatusCard = styled.div<{ $safe?: boolean }>`
  background: white;
  border: 1px solid ${({ theme, $safe }) => $safe ? theme.colors.success : theme.colors.error};
  border-left: 4px solid ${({ theme, $safe }) => $safe ? theme.colors.success : theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg}px;

  .icon-area {
    font-size: 24px;
    color: ${({ theme, $safe }) => $safe ? theme.colors.success : theme.colors.error};
  }

  .text-area {
    flex: 1;
    h3 { margin: 0 0 4px 0; color: ${({ theme }) => theme.colors.text}; }
    p { margin: 0; color: ${({ theme }) => theme.colors.textSecondary}; font-size: 14px; }
  }
`;

// Componentes de Botão e Badge Reutilizáveis (Simplificados aqui)
const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white; border: none; padding: 8px 16px;
  border-radius: 6px; font-weight: 600; cursor: pointer;
  display: flex; gap: 8px; align-items: center;
  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
`;

const SecondaryButton = styled.button`
  background: white; color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 6px 12px; border-radius: 6px; font-weight: 600; cursor: pointer;
  &:hover { background: ${({ theme }) => theme.colors.primaryExtraLight}; }
`;

const DeleteButton = styled.button`
  background: transparent; border: none; color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer; padding: 6px; border-radius: 4px;
  &:hover { background: #FEE2E2; color: #DC2626; }
`;

const Badge = styled.span<{ $status: string }>`
  padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;
  background: ${({ $status }) => $status === 'warning' ? '#FEF3C7' : '#D1FAE5'};
  color: ${({ $status }) => $status === 'warning' ? '#D97706' : '#059669'};
`;

const ToggleSwitch = styled.label<{ $checked: boolean }>`
  position: relative; display: inline-block; width: 44px; height: 24px;
  input { opacity: 0; width: 0; height: 0; }
  .slider {
    position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
    background-color: ${({ $checked, theme }) => $checked ? theme.colors.success : '#ccc'};
    transition: .4s; border-radius: 34px;
  }
  .slider:before {
    position: absolute; content: ""; height: 18px; width: 18px;
    left: ${({ $checked }) => $checked ? '22px' : '4px'}; bottom: 3px;
    background-color: white; transition: .4s; border-radius: 50%;
  }
`;

const ToggleLabel = styled.div`
  display: flex; align-items: center; gap: 12px;
  span { font-size: 14px; font-weight: 600; color: ${({ theme }) => theme.colors.text}; }
`;