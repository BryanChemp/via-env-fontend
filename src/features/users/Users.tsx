// pages/UsersPage.tsx
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faUserShield,
  faCode,
  faEye,
  faTrash,
  faEnvelope,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';
import { Tabs, type Tab } from '@/shared/constants/Tabs/Tabs';

// --- MOCK DATA ---
const mockTabs = [
  { id: 'all', name: 'Todos os Membros', count: 12 },
  { id: 'admin', name: 'Administradores', count: 3 },
  { id: 'developer', name: 'Developers', count: 7 },
  { id: 'viewer', name: 'Viewers', count: 2 },
];

const mockUsers = [
  {
    id: '1',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@empresa.com',
    role: 'admin',
    status: 'active',
    lastActive: '2 min atrás',
    avatarUrl: null,
  },
  {
    id: '2',
    name: 'Ana Júlia Souza',
    email: 'ana.souza@empresa.com',
    role: 'developer',
    status: 'active',
    lastActive: '1 hora atrás',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: '3',
    name: 'Roberto Firmino',
    email: 'roberto.dev@empresa.com',
    role: 'developer',
    status: 'invited',
    lastActive: '-',
    avatarUrl: null,
  },
  {
    id: '4',
    name: 'Julia Roberts',
    email: 'julia.qa@empresa.com',
    role: 'viewer',
    status: 'active',
    lastActive: '3 dias atrás',
    avatarUrl: null,
  },
  {
    id: '5',
    name: 'Marcos Paulo',
    email: 'marcos.p@empresa.com',
    role: 'developer',
    status: 'active',
    lastActive: '5 horas atrás',
    avatarUrl: null,
  },
];

export function Users() {
  const [activeTab, setActiveTab] = useState<Tab>(mockTabs[0]);
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de filtro combinada (Tab + Busca)
  const filteredUsers = mockUsers
    .filter(user => {
      if (activeTab.id === 'all') return true;
      return user.role === activeTab.id;
    })
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return faUserShield;
      case 'developer': return faCode;
      default: return faEye;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <Container>
      {/* Header */}
        <PageHeader
            title={"Gerenciar Equipe"}
            description={"Controle o acesso e as permissões dos membros da equipe."}
            button={{
                text: "Novo usuário",
                onClick: () => { console.log("Convidar usuário")},
                icon: faPlus
            }}
        />

      {/* Tabs */}
      <Tabs 
        tabs={mockTabs}
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
              placeholder="Buscar por nome ou email..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
        </ActionBar>

        <TableContainer>
          <TableHead>
            <div className="col-user">Usuário</div>
            <div className="col-role">Permissão (Role)</div>
            <div className="col-status">Status</div>
            <div className="col-last-active">Último Acesso</div>
            <div className="col-actions"></div>
          </TableHead>

          <TableBody>
            {filteredUsers.length === 0 ? (
              <EmptyState>
                Nenhum usuário encontrado com os filtros atuais.
              </EmptyState>
            ) : (
              filteredUsers.map(user => (
                <TableRow key={user.id}>
                  {/* Coluna Usuário */}
                  <div className="col-user">
                    <Avatar>
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} />
                      ) : (
                        <span>{getInitials(user.name)}</span>
                      )}
                    </Avatar>
                    <div className="user-info">
                      <span className="name">{user.name}</span>
                      <span className="email">{user.email}</span>
                    </div>
                  </div>

                  {/* Coluna Role */}
                  <div className="col-role">
                    <RoleBadge $role={user.role}>
                      <FontAwesomeIcon icon={getRoleIcon(user.role)} />
                      {user.role}
                    </RoleBadge>
                  </div>

                  {/* Coluna Status */}
                  <div className="col-status">
                    <StatusIndicator $status={user.status}>
                      <span className="dot" />
                      {user.status === 'invited' ? 'Pendente' : 'Ativo'}
                    </StatusIndicator>
                  </div>

                  {/* Coluna Último Acesso */}
                  <div className="col-last-active">
                    <span className="date">{user.lastActive}</span>
                  </div>

                  {/* Coluna Ações */}
                  <div className="col-actions">
                    <IconButton title="Editar Permissões">
                      <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                    
                    {user.status === 'invited' && (
                      <IconButton title="Reenviar Convite">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </IconButton>
                    )}

                    <DeleteButton title="Remover Usuário">
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
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
  }
`;

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
  box-shadow: 0 1px 2px ${({ theme }) => theme.shadows.sm.shadowColor}0D;
`;

// Grid Layout Específico para Users
const gridLayout = css`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1fr 1fr 0.5fr; // User, Role, Status, LastActive, Actions
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

  /* User Column */
  .col-user {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md}px;
    
    .user-info {
      display: flex;
      flex-direction: column;
      
      .name {
        font-weight: ${({ theme }) => theme.typography.weights.semibold};
        color: ${({ theme }) => theme.colors.text};
        font-size: ${({ theme }) => theme.typography.sizes.md}px;
      }
      
      .email {
        font-size: ${({ theme }) => theme.typography.sizes.sm}px;
        color: ${({ theme }) => theme.colors.textSecondary};
      }
    }
  }

  /* Role Column */
  .col-role {
    display: flex;
    align-items: center;
  }

  /* Other Columns */
  .col-status, .col-last-active {
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .col-actions {
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing.xs}px;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  background-color: ${({ theme }) => theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  }
`;

const RoleBadge = styled.div<{ $role: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.pill}px;
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: capitalize;

  ${({ theme, $role }) => {
    switch ($role) {
      case 'admin':
        return css`
          background-color: #F3E8FF; // Purple tint custom
          color: #7E22CE; // Purple text
          border: 1px solid #E9D5FF;
        `;
      case 'developer':
        return css`
          background-color: ${theme.colors.primaryExtraLight};
          color: ${theme.colors.primaryDark};
          border: 1px solid ${theme.colors.primary}20;
        `;
      default: // viewer
        return css`
          background-color: ${theme.colors.gray100};
          color: ${theme.colors.gray600};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}
`;

const StatusIndicator = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme, $status }) => 
      $status === 'active' ? theme.colors.success : theme.colors.warning};
  }
`;

const IconButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const DeleteButton = styled(IconButton)`
  &:hover {
    background: ${({ theme }) => theme.colors.error}15;
    color: ${({ theme }) => theme.colors.error};
  }
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
`;