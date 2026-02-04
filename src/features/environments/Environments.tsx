// pages/EnvironmentPage.tsx
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faEye,
  faEyeSlash,
  faCopy,
  faTrash,
  faLock,
  faKey,
  faDatabase,
  faTerminal,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';
import { Tabs, type Tab } from '@/shared/constants/Tabs/Tabs';

// --- MOCK DATA ---
const mockEnvironments = [
  { id: 'dev', name: 'Development', color: '#10B981', count: 12 },
  { id: 'staging', name: 'Staging', color: '#F59E0B', count: 8 },
  { id: 'prod', name: 'Production', color: '#EF4444', count: 15 },
];

const mockVariables = [
  {
    id: '1',
    name: 'API_URL',
    value: 'https://api.viaenv.com/v1',
    type: 'string',
    isSecret: false,
    environment: 'dev',
    lastUpdated: '2 horas atrás',
    createdBy: 'João Silva',
  },
  {
    id: '2',
    name: 'DATABASE_URL',
    value: 'postgresql://user:password@localhost:5432/viaenv',
    type: 'database',
    isSecret: true,
    environment: 'dev',
    lastUpdated: '1 dia atrás',
    createdBy: 'Maria Santos',
  },
  {
    id: '3',
    name: 'JWT_SECRET',
    value: 'super-secret-jwt-key-2024',
    type: 'secret',
    isSecret: true,
    environment: 'dev',
    lastUpdated: '3 dias atrás',
    createdBy: 'Admin',
  },
  {
    id: '4',
    name: 'SENDGRID_API_KEY',
    value: 'SG.xxxxxxxx.yyyyyyyy',
    type: 'api_key',
    isSecret: true,
    environment: 'dev',
    lastUpdated: '1 semana atrás',
    createdBy: 'Ana Oliveira',
  },
];

export function Environments() {
  const [activeTab, setActiveTab] = useState<Tab>(mockEnvironments[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSecret, setShowSecret] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredVariables = mockVariables
    .filter(v => v.environment === activeTab.id)
    .filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'secret': return faLock;
      case 'api_key': return faKey;
      case 'database': return faDatabase;
      default: return faTerminal;
    }
  };

  return (
    <Container>
      {/* Header */}
      <PageHeader
        title={"Variáveis de Ambiente"}
        description={"Gerencie as chaves de configuração do seu projeto."}
        button={{
          text: "Nova Variável",
          onClick: () => { console.log("nova variável")},
          icon: faPlus
        }}
      />

      {/* Tabs */}
      <Tabs
        tabs={mockEnvironments}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Conteúdo */}
      <MainContent>
        <ActionBar>
          <SearchWrapper>
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input 
              type="text" 
              placeholder="Buscar variáveis..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
        </ActionBar>

        <TableContainer>
          <TableHead>
            <div className="col-name">Chave (Key)</div>
            <div className="col-value">Valor</div>
            <div className="col-meta">Atualizado em</div>
            <div className="col-actions"></div>
          </TableHead>

          <TableBody>
            {filteredVariables.length === 0 ? (
              <EmptyState>
                Nenhuma variável encontrada neste ambiente.
              </EmptyState>
            ) : (
              filteredVariables.map(variable => (
                <TableRow key={variable.id}>
                  <div className="col-name">
                    <TypeIcon $type={variable.type}>
                      <FontAwesomeIcon icon={getIconByType(variable.type)} />
                    </TypeIcon>
                    <div className="key-info">
                      <span className="key-name">{variable.name}</span>
                      <span className="key-type">{variable.type}</span>
                    </div>
                  </div>

                  <div className="col-value">
                    <ValueBox $isSecret={variable.isSecret}>
                      <span className="value-text">
                        {variable.isSecret && showSecret !== variable.id 
                          ? '••••••••••••••••••••••' 
                          : variable.value}
                      </span>
                      
                      <div className="value-actions">
                        {variable.isSecret && (
                          <IconButton 
                            onClick={() => setShowSecret(showSecret === variable.id ? null : variable.id)}
                            title={showSecret === variable.id ? "Ocultar" : "Revelar"}
                          >
                            <FontAwesomeIcon icon={showSecret === variable.id ? faEyeSlash : faEye} />
                          </IconButton>
                        )}
                        <IconButton 
                          onClick={() => handleCopy(variable.value, variable.id)}
                          $active={copiedId === variable.id}
                          title="Copiar"
                        >
                          <FontAwesomeIcon icon={copiedId === variable.id ? faCheck : faCopy} />
                        </IconButton>
                      </div>
                    </ValueBox>
                  </div>

                  <div className="col-meta">
                    <span className="date">{variable.lastUpdated}</span>
                    <span className="author">{variable.createdBy}</span>
                  </div>

                  <div className="col-actions">
                    <DeleteButton onClick={() => console.log('Delete', variable.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </DeleteButton>
                  </div>
                </TableRow>
              ))
            )}
          </TableBody>
        </TableContainer>
      </MainContent>
    </Container>
  );
}

// --- STYLED COMPONENTS COM THEME ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.colors.text};
`;





const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.xxl}px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ActionBar = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const SearchWrapper = styled.div`
  position: relative;
  max-width: 400px;

  .icon {
    position: absolute;
    left: ${({ theme }) => theme.spacing.md}px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.typography.sizes.md}px;
  }

  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.sm}px 40px;
    border-radius: ${({ theme }) => theme.borderRadius.md}px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.inputBackground};
    font-size: ${({ theme }) => theme.typography.sizes.md}px;
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    transition: all ${({ theme }) => theme.transitions.fast};

    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20; // 20 = opacity hex
    }
  }
`;

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
  box-shadow: 0 1px 2px ${({ theme }) => theme.shadows.sm.shadowColor}0D; // Opacidade ajustada
`;

// Grid compartilhado
const gridLayout = css`
  display: grid;
  grid-template-columns: 2fr 3fr 1.5fr 0.5fr;
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
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  ${gridLayout}
  padding-top: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray50};
  }

  .col-name {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md}px;
    
    .key-info {
      display: flex;
      flex-direction: column;
    }
    
    .key-name {
      font-family: 'IBM Plex Mono', monospace; // Mono para chaves
      font-weight: ${({ theme }) => theme.typography.weights.semibold};
      color: ${({ theme }) => theme.colors.text};
      font-size: ${({ theme }) => theme.typography.sizes.md}px;
    }
    
    .key-type {
      font-size: ${({ theme }) => theme.typography.sizes.xs}px;
      color: ${({ theme }) => theme.colors.textLight};
      margin-top: 2px;
    }
  }

  .col-meta {
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
    
    .date { 
      color: ${({ theme }) => theme.colors.text}; 
      font-weight: ${({ theme }) => theme.typography.weights.medium};
    }
    .author { 
      color: ${({ theme }) => theme.colors.textSecondary}; 
      margin-top: 2px; 
    }
  }

  .col-actions {
    display: flex;
    justify-content: flex-end;
  }
`;

const TypeIcon = styled.div<{ $type: string }>`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  
  // Utilizando opacidade hex (ex: 1A = 10%) nas cores do tema
  background-color: ${({ theme, $type }) => {
    switch ($type) {
      case 'secret': return `${theme.colors.error}15`; 
      case 'database': return `${theme.colors.primary}15`;
      case 'api_key': return `${theme.colors.warning}15`;
      default: return theme.colors.gray100;
    }
  }};
  
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'secret': return theme.colors.error;
      case 'database': return theme.colors.primary;
      case 'api_key': return theme.colors.warning;
      default: return theme.colors.gray500;
    }
  }};
`;

const ValueBox = styled.div<{ $isSecret?: boolean }>`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
  max-width: 640px;
  margin-right: 32px;
  
  font-family: 'IBM Plex Mono', monospace;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme, $isSecret }) => $isSecret ? theme.colors.textLight : theme.colors.text};
  
  .value-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: ${({ $isSecret }) => $isSecret ? 0.7 : 1};
  }

  .value-actions {
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs}px;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  ${TableRow}:hover & .value-actions {
    opacity: 1;
  }
`;

const IconButton = styled.button<{ $active?: boolean }>`
  background: ${({ theme, $active }) => $active ? theme.colors.success : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.white : theme.colors.textSecondary};
  border: none;
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.xs}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $active }) => $active ? theme.colors.success : theme.colors.gray200};
    color: ${({ theme, $active }) => $active ? theme.colors.white : theme.colors.text};
  }
`;

const DeleteButton = styled(IconButton)`
  &:hover {
    background: ${({ theme }) => theme.colors.error}15; // Tint vermelho
    color: ${({ theme }) => theme.colors.error};
  }
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
`;