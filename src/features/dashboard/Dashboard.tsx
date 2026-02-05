// pages/LogsPage.tsx
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faHistory,
  faShieldAlt,
  faDownload,
  faInfoCircle,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';
import { Tabs, type Tab } from '@/shared/constants/Tabs/Tabs';

// --- MOCK DATA ---
const mockTabs: Tab[] = [
  { id: 'all', name: 'Todos os Eventos', count: 150 },
  { id: 'security', name: 'Segurança', count: 12 },
  { id: 'secrets', name: 'Variáveis', count: 85 },
];

const mockLogs = [
  {
    id: '1',
    user: 'Carlos Mendes',
    action: 'Visualizou Secret',
    target: 'DATABASE_URL',
    environment: 'Production',
    timestamp: 'Hoje, 14:20',
    type: 'security', // para o ícone
    ip: '192.168.1.1'
  },
  {
    id: '2',
    user: 'Ana Júlia Souza',
    action: 'Criou Variável',
    target: 'STRIPE_KEY',
    environment: 'Staging',
    timestamp: 'Hoje, 12:05',
    type: 'secrets',
    ip: '177.45.12.90'
  },
  {
    id: '3',
    user: 'Sistema',
    action: 'Backup Automático',
    target: 'Snapshot #442',
    environment: 'Global',
    timestamp: 'Ontem, 23:59',
    type: 'system',
    ip: '::1'
  },
  {
    id: '4',
    user: 'Marcos Paulo',
    action: 'Removeu Usuário',
    target: 'roberto.dev@empresa.com',
    environment: 'Global',
    timestamp: 'Ontem, 16:40',
    type: 'security',
    ip: '189.22.41.5'
  },
];

export function LogsPage() {
  const [activeTab, setActiveTab] = useState<Tab>(mockTabs[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'security': return faShieldAlt;
      case 'secrets': return faKey;
      default: return faHistory;
    }
  };

  return (
    <Container>
      <PageHeader
        title="Logs de Auditoria"
        description="Rastreabilidade completa de todas as ações realizadas na plataforma."
        button={{
          text: "Exportar CSV",
          onClick: () => console.log("Exportando..."),
          icon: faDownload
        }}
      />

      <Tabs 
        tabs={mockTabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <MainContent>
        <ActionBar>
          <SearchWrapper>
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input 
              type="text" 
              placeholder="Filtrar por usuário, ação ou alvo..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
          
          <FilterInfo>
            <FontAwesomeIcon icon={faInfoCircle} />
            Retenção de logs: <strong>30 dias</strong>
          </FilterInfo>
        </ActionBar>

        <TableContainer>
          <TableHead>
            <div className="col-event">Evento</div>
            <div className="col-env">Ambiente</div>
            <div className="col-user">Realizado por</div>
            <div className="col-ip">Endereço IP</div>
            <div className="col-time">Data/Hora</div>
          </TableHead>

          <TableBody>
            {mockLogs.map(log => (
              <TableRow key={log.id}>
                {/* Coluna Evento */}
                <div className="col-event">
                  <LogIcon $type={log.type}>
                    <FontAwesomeIcon icon={getActionIcon(log.type)} />
                  </LogIcon>
                  <div className="log-info">
                    <span className="action">{log.action}</span>
                    <span className="target">{log.target}</span>
                  </div>
                </div>

                {/* Coluna Ambiente */}
                <div className="col-env">
                  <EnvBadge $isProd={log.environment === 'Production'}>
                    {log.environment}
                  </EnvBadge>
                </div>

                {/* Coluna Usuário */}
                <div className="col-user">
                  <span className="user-name">{log.user}</span>
                </div>

                {/* Coluna IP */}
                <div className="col-ip">
                  <code>{log.ip}</code>
                </div>

                {/* Coluna Time */}
                <div className="col-time">
                  <span className="timestamp">{log.timestamp}</span>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
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
  max-width: ${({ theme }) => theme.layout.contentMaxWidth}px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ActionBar = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 400px;
  .icon {
    position: absolute;
    left: ${({ theme }) => theme.spacing.md}px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textLight};
  }
  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.sm}px 40px;
    border-radius: ${({ theme }) => theme.borderRadius.md}px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.white};
    outline: none;
    &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
  }
`;

const FilterInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 8px;
  strong { color: ${({ theme }) => theme.colors.text}; }
`;

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
`;

const gridLayout = css`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.5fr 1fr 1.2fr;
  gap: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
`;

const TableHead = styled.div`
  ${gridLayout}
  height: 48px;
  background: ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  ${gridLayout}
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  &:hover { background-color: ${({ theme }) => theme.colors.gray50}; }

  .col-event {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md}px;
    .log-info {
      display: flex;
      flex-direction: column;
      .action { 
        font-weight: ${({ theme }) => theme.typography.weights.semibold};
        font-size: ${({ theme }) => theme.typography.sizes.md}px;
      }
      .target { 
        font-size: ${({ theme }) => theme.typography.sizes.xs}px;
        color: ${({ theme }) => theme.colors.textLight};
        font-family: 'IBM Plex Mono', monospace;
      }
    }
  }

  .user-name {
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
    color: ${({ theme }) => theme.colors.text};
  }

  code {
    background: ${({ theme }) => theme.colors.gray100};
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .timestamp {
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const LogIcon = styled.div<{ $type: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $type }) => 
    $type === 'security' ? `${theme.colors.error}10` : 
    $type === 'secrets' ? `${theme.colors.primary}10` : theme.colors.gray100};
  color: ${({ theme, $type }) => 
    $type === 'security' ? theme.colors.error : 
    $type === 'secrets' ? theme.colors.primary : theme.colors.gray500};
`;

const EnvBadge = styled.span<{ $isProd?: boolean }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  background: ${({ $isProd, theme }) => $isProd ? '#FEF2F2' : theme.colors.gray100};
  color: ${({ $isProd, theme }) => $isProd ? theme.colors.error : theme.colors.textSecondary};
  border: 1px solid ${({ $isProd, theme }) => $isProd ? '#FEE2E2' : theme.colors.border};
`;