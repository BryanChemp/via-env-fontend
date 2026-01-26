// pages/EnvironmentPage.tsx
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faFilter,
  faEye,
  faEyeSlash,
  faCopy,
  faEdit,
  faTrash,
  faLock,
  faGlobe,
  faCodeBranch,
  faCheck,
  faKey,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import * as S from './EnvironmentsStyles';
import { EnvironmentCard } from './components/EnvironmentCard';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';

// Mock data
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
    description: 'URL base da API principal',
  },
  {
    id: '2',
    name: 'DATABASE_URL',
    value: 'postgresql://user:password@localhost:5432/viaenv',
    type: 'secret',
    isSecret: true,
    environment: 'dev',
    lastUpdated: '1 dia atrás',
    createdBy: 'Maria Santos',
    description: 'String de conexão com o banco',
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
    description: 'Chave para assinatura de tokens JWT',
  },
  {
    id: '4',
    name: 'REDIS_HOST',
    value: 'localhost',
    type: 'string',
    isSecret: false,
    environment: 'dev',
    lastUpdated: '5 horas atrás',
    createdBy: 'Pedro Costa',
    description: 'Host do servidor Redis',
  },
  {
    id: '5',
    name: 'SENDGRID_API_KEY',
    value: 'SG.xxxxxxxx.yyyyyyyy',
    type: 'api_key',
    isSecret: true,
    environment: 'dev',
    lastUpdated: '1 semana atrás',
    createdBy: 'Ana Oliveira',
    description: 'Chave da API SendGrid para emails',
  },
];

export function Environments() {
  const [selectedEnv, setSelectedEnv] = useState('dev');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSecret, setShowSecret] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'updated'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredVariables = mockVariables
    .filter(variable => variable.environment === selectedEnv)
    .filter(variable => 
      variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });

  const handleCopyValue = async (value: string, id: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRevealSecret = (id: string) => {
    setShowSecret(showSecret === id ? null : id);
  };

  const getVariableIcon = (type: string) => {
    switch (type) {
      case 'secret':
        return faLock;
      case 'api_key':
        return faKey;
      case 'database':
        return faDatabase;
      default:
        return faCodeBranch;
    }
  };

  const getVariableColor = (type: string) => {
    switch (type) {
      case 'secret':
        return 'error';
      case 'api_key':
        return 'warning';
      case 'database':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <S.Container>
      {/* Header da Página */}
      <PageHeader
        title={"Variáveis de ambiente"}
        description={"Gerencie e proteja suas variáveis por ambiente"}
        icon={faKey}
        button={{
            icon: faPlus,
            text: "Nova variável",
            onClick: () => {}
        }}
      />

      {/* Ambiente Selector */}
      <S.EnvironmentSelector>
        <S.EnvironmentTabs>
          {mockEnvironments.map(env => (
            <S.EnvironmentTab
              key={env.id}
              $active={selectedEnv === env.id}
              onClick={() => setSelectedEnv(env.id)}
            >
              <S.EnvIndicator $color={env.color} />
              <S.EnvName>{env.name}</S.EnvName>
              <S.EnvCount>{env.count}</S.EnvCount>
            </S.EnvironmentTab>
          ))}
        </S.EnvironmentTabs>

        <S.EnvActions>
          <S.ActionButton>
            <FontAwesomeIcon icon={faGlobe} />
            Configurar Ambientes
          </S.ActionButton>
        </S.EnvActions>
      </S.EnvironmentSelector>

      {/* Barra de Ferramentas */}
      <S.Toolbar>
        <S.SearchContainer>
          <S.SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </S.SearchIcon>
          <S.SearchInput
            placeholder="Buscar variáveis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <S.ClearSearch onClick={() => setSearchTerm('')}>
              Limpar
            </S.ClearSearch>
          )}
        </S.SearchContainer>

        <S.ViewControls>
          <S.SortSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="name">Ordenar por Nome</option>
            <option value="updated">Ordenar por Data</option>
          </S.SortSelect>

          <S.ViewToggle>
            <S.ViewButton
              $active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              Lista
            </S.ViewButton>
            <S.ViewButton
              $active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              Cards
            </S.ViewButton>
          </S.ViewToggle>

          <S.FilterButton>
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </S.FilterButton>
        </S.ViewControls>
      </S.Toolbar>

      {/* Conteúdo Principal */}
      <S.Content>
        {filteredVariables.length === 0 ? (
          <S.EmptyState>
            <S.EmptyIcon>
              <FontAwesomeIcon icon={faKey} />
            </S.EmptyIcon>
            <S.EmptyTitle>Nenhuma variável encontrada</S.EmptyTitle>
            <S.EmptyMessage>
              {searchTerm 
                ? `Nenhuma variável corresponde a "${searchTerm}"`
                : `Comece criando sua primeira variável para o ambiente ${mockEnvironments.find(e => e.id === selectedEnv)?.name}`
              }
            </S.EmptyMessage>
            <S.EmptyAction onClick={() => console.log('Criar primeira variável')}>
              Criar Primeira Variável
            </S.EmptyAction>
          </S.EmptyState>
        ) : viewMode === 'list' ? (
          /* Vista Lista */
          <S.VariableList>
            <S.TableHeader>
              <S.TableColumn $width="25%">Nome</S.TableColumn>
              <S.TableColumn $width="30%">Valor</S.TableColumn>
              <S.TableColumn $width="15%">Tipo</S.TableColumn>
              <S.TableColumn $width="20%">Última Atualização</S.TableColumn>
              <S.TableColumn $width="10%">Ações</S.TableColumn>
            </S.TableHeader>
            
            <S.TableBody>
              {filteredVariables.map(variable => (
                <S.VariableRow key={variable.id}>
                  <S.VariableCell $width="25%">
                    <S.VariableName>
                      {variable.isSecret && (
                        <S.SecretIcon>
                          <FontAwesomeIcon icon={faLock} />
                        </S.SecretIcon>
                      )}
                      {variable.name}
                      {variable.description && (
                        <S.VariableDescription>
                          {variable.description}
                        </S.VariableDescription>
                      )}
                    </S.VariableName>
                  </S.VariableCell>
                  
                  <S.VariableCell $width="30%">
                    <S.ValueContainer>
                      {variable.isSecret ? (
                        showSecret === variable.id ? (
                          <S.RevealedValue>
                            {variable.value}
                            <S.HideButton onClick={() => handleRevealSecret(variable.id)}>
                              <FontAwesomeIcon icon={faEyeSlash} />
                            </S.HideButton>
                          </S.RevealedValue>
                        ) : (
                          <S.MaskedValue>
                            ••••••••••••••••
                            <S.RevealButton onClick={() => handleRevealSecret(variable.id)}>
                              <FontAwesomeIcon icon={faEye} />
                              Revelar
                            </S.RevealButton>
                          </S.MaskedValue>
                        )
                      ) : (
                        <S.PlainValue>
                          {variable.value}
                          {copiedId === variable.id ? (
                            <S.CopiedBadge>
                              <FontAwesomeIcon icon={faCheck} />
                              Copiado!
                            </S.CopiedBadge>
                          ) : (
                            <S.CopyButton onClick={() => handleCopyValue(variable.value, variable.id)}>
                              <FontAwesomeIcon icon={faCopy} />
                            </S.CopyButton>
                          )}
                        </S.PlainValue>
                      )}
                    </S.ValueContainer>
                  </S.VariableCell>
                  
                  <S.VariableCell $width="15%">
                    <S.TypeBadge $type={getVariableColor(variable.type)}>
                      <FontAwesomeIcon icon={getVariableIcon(variable.type)} />
                      {variable.type}
                    </S.TypeBadge>
                  </S.VariableCell>
                  
                  <S.VariableCell $width="20%">
                    <S.LastUpdated>
                      {variable.lastUpdated}
                      <S.UpdatedBy>por {variable.createdBy}</S.UpdatedBy>
                    </S.LastUpdated>
                  </S.VariableCell>
                  
                  <S.VariableCell $width="10%">
                    <S.ActionButtons>
                      <S.ActionIconButton 
                        onClick={() => console.log('Editar', variable.id)}
                        title="Editar"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </S.ActionIconButton>
                      
                      <S.ActionIconButton 
                        onClick={() => handleCopyValue(variable.value, variable.id)}
                        title="Copiar valor"
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </S.ActionIconButton>
                      
                      <S.ActionIconButton 
                        $danger
                        onClick={() => console.log('Deletar', variable.id)}
                        title="Deletar"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </S.ActionIconButton>
                    </S.ActionButtons>
                  </S.VariableCell>
                </S.VariableRow>
              ))}
            </S.TableBody>
          </S.VariableList>
        ) : (
          /* Vista Grid/Cards */
          <S.CardGrid>
            {filteredVariables.map(variable => (
              <EnvironmentCard
                key={variable.id}
                variable={variable}
                isRevealed={showSecret === variable.id}
                isCopied={copiedId === variable.id}
                onReveal={() => handleRevealSecret(variable.id)}
                onCopy={() => handleCopyValue(variable.value, variable.id)}
                onEdit={() => console.log('Editar', variable.id)}
                onDelete={() => console.log('Deletar', variable.id)}
              />
            ))}
          </S.CardGrid>
        )}
      </S.Content>

      {/* Stats Footer */}
      <S.StatsFooter>
        <S.StatItem>
          <S.StatLabel>Total de Variáveis</S.StatLabel>
          <S.StatValue>{filteredVariables.length}</S.StatValue>
        </S.StatItem>
        
        <S.StatItem>
          <S.StatLabel>Secrets</S.StatLabel>
          <S.StatValue>
            {filteredVariables.filter(v => v.isSecret).length}
          </S.StatValue>
        </S.StatItem>
        
        <S.StatItem>
          <S.StatLabel>Última Atualização</S.StatLabel>
          <S.StatValue>
            {filteredVariables[0]?.lastUpdated || 'N/A'}
          </S.StatValue>
        </S.StatItem>
      </S.StatsFooter>
    </S.Container>
  );
}