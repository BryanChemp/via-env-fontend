// pages/DatabasePage.tsx
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDatabase,
  faSyncAlt,
  faCheckCircle,
  faExclamationCircle,
  faPlus,
  faEllipsisV,
  faClock,
  faServer
} from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';
import { Tabs, type Tab } from '@/shared/constants/Tabs/Tabs';

// --- MOCK DATA ---
const dbTabs: Tab[] = [
  { id: 'all', name: 'Todas as Conexões' },
  { id: 'sql', name: 'Relacionais (SQL)' },
  { id: 'nosql', name: 'NoSQL / Cache' },
];

const mockDatabases = [
  {
    id: '1',
    name: 'Production Primary',
    type: 'PostgreSQL',
    host: 'db-prod-01.aws.internal',
    status: 'connected',
    lastRotation: '2 dias atrás',
    nextRotation: 'Em 28 dias',
    rotationEnabled: true,
  },
  {
    id: '2',
    name: 'Redis Cache Layer',
    type: 'Redis',
    host: 'cache-cluster.aws.internal',
    status: 'connected',
    lastRotation: '5 horas atrás',
    nextRotation: 'Em 6 dias',
    rotationEnabled: true,
  },
  {
    id: '3',
    name: 'Legacy MySQL',
    type: 'MySQL',
    host: '192.168.0.55',
    status: 'error',
    errorMessage: 'Connection timeout',
    lastRotation: 'Falha há 1 dia',
    nextRotation: 'Pausado',
    rotationEnabled: false,
  },
];

export function Database() {
  const [activeTab, setActiveTab] = useState<Tab>(dbTabs[0]);

  // Função auxiliar para cor do ícone baseada no banco
  const getDbColor = (type: string) => {
    switch (type) {
      case 'PostgreSQL': return '#336791';
      case 'Redis': return '#DC382D';
      case 'MySQL': return '#F29111';
      default: return '#6B7280';
    }
  };

  return (
    <Container>
      <PageHeader
        title="Conexões de Banco de Dados"
        description="Gerencie credenciais dinâmicas e rotação automática de senhas."
        button={{
          text: "Nova Conexão",
          onClick: () => console.log('Novo DB'),
          icon: faPlus
        }}
      />

      <Tabs 
        tabs={dbTabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <MainContent>
        <Grid>
          {mockDatabases.map(db => (
            <DbCard key={db.id}>
              {/* Card Header */}
              <CardHeader>
                <DbIcon $color={getDbColor(db.type)}>
                  <FontAwesomeIcon icon={faDatabase} />
                </DbIcon>
                <div className="info">
                  <h3>{db.name}</h3>
                  <span className="type">{db.type}</span>
                </div>
                <StatusBadge $status={db.status}>
                  <FontAwesomeIcon icon={db.status === 'connected' ? faCheckCircle : faExclamationCircle} />
                  {db.status === 'connected' ? 'Ativo' : 'Erro'}
                </StatusBadge>
              </CardHeader>

              {/* Card Body */}
              <CardBody>
                <InfoRow>
                  <span className="label">
                    <FontAwesomeIcon icon={faServer} /> Host
                  </span>
                  <span className="value font-mono">{db.host}</span>
                </InfoRow>
                
                <InfoRow>
                   <span className="label">
                    <FontAwesomeIcon icon={faSyncAlt} /> Rotação
                  </span>
                  <span className="value">
                    {db.rotationEnabled ? 'Automática (30 dias)' : 'Manual / Desativada'}
                  </span>
                </InfoRow>

                <RotationInfo>
                  <div className="stat">
                     <span className="label">Última troca</span>
                     <strong>{db.lastRotation}</strong>
                  </div>
                  <div className="divider" />
                  <div className="stat">
                     <span className="label">Próxima troca</span>
                     <strong>{db.nextRotation}</strong>
                  </div>
                </RotationInfo>
              </CardBody>

              {/* Card Footer Actions */}
              <CardFooter>
                 <SecondaryButton disabled={!db.rotationEnabled}>
                    <FontAwesomeIcon icon={faClock} />
                    Rotacionar Agora
                 </SecondaryButton>
                 <IconButton>
                    <FontAwesomeIcon icon={faEllipsisV} />
                 </IconButton>
              </CardFooter>
            </DbCard>
          ))}
        </Grid>
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const DbCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md.shadowColor}0D 0 4px 12px;
  }
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;

  .info {
    flex: 1;
    h3 {
      margin: 0;
      font-size: ${({ theme }) => theme.typography.sizes.md}px;
      font-weight: ${({ theme }) => theme.typography.weights.semibold};
      color: ${({ theme }) => theme.colors.text};
    }
    .type {
      font-size: ${({ theme }) => theme.typography.sizes.xs}px;
      color: ${({ theme }) => theme.colors.textSecondary};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
`;

const DbIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const StatusBadge = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.pill}px;
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  
  ${({ $status, theme }) => {
    if ($status === 'connected') {
      return css`
        background: ${theme.colors.success}15;
        color: ${theme.colors.success};
      `;
    }
    return css`
      background: ${theme.colors.error}15;
      color: ${theme.colors.error};
    `;
  }}
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;

  .label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .value {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    
    &.font-mono {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 12px;
      background: ${({ theme }) => theme.colors.gray50};
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
`;

const RotationInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .divider {
    width: 1px;
    height: 24px;
    background: ${({ theme }) => theme.colors.border};
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    .label {
      font-size: 10px;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
    
    strong {
      font-size: ${({ theme }) => theme.typography.sizes.sm}px;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SecondaryButton = styled.button`
  background: white;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.gray50};
    border-color: ${({ theme }) => theme.colors.borderDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.text};
  }
`;