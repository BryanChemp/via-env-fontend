// pages/HelpPage.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faRocket,
  faShieldAlt,
  faCode,
  faCommentDots,
  faEnvelope,
  faExternalLinkAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';

const helpCategories = [
  {
    title: 'Primeiros Passos',
    description: 'Aprenda o básico para configurar seus ambientes e integrar sua primeira secret.',
    icon: faRocket,
    color: '#0066FF'
  },
  {
    title: 'Documentação da API',
    description: 'Endpoints, autenticação e SDKs para integrar o ViaEnv no seu código.',
    icon: faCode,
    color: '#10B981'
  },
  {
    title: 'Segurança & Compliance',
    description: 'Como protegemos seus dados e como configurar MFA e permissões avançadas.',
    icon: faShieldAlt,
    color: '#F59E0B'
  },
  {
    title: 'Guias de Melhores Práticas',
    description: 'Estruture suas variáveis de forma eficiente e segura para grandes times.',
    icon: faBook,
    color: '#7E22CE'
  }
];

export function Help() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container>
      <PageHeader
        title="Central de Ajuda"
        description="Encontre guias, tutoriais e suporte técnico para sua jornada."
      />

      <MainContent>
        {/* Hero Section com Busca */}
        <HeroSection>
          <h2>Como podemos ajudar hoje?</h2>
          <SearchBox>
            <FontAwesomeIcon icon={faSearch} />
            <input 
              placeholder="Pesquise por 'Configurar CLI', 'Roles', 'Webhooks'..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
        </HeroSection>

        {/* Grid de Categorias */}
        <CategoryGrid>
          {helpCategories.map((cat, index) => (
            <CategoryCard key={index}>
              <IconWrapper $color={cat.color}>
                <FontAwesomeIcon icon={cat.icon} />
              </IconWrapper>
              <h3>{cat.title}</h3>
              <p>{cat.description} </p>
              <button>Ver artigos <FontAwesomeIcon icon={faExternalLinkAlt} /></button>
            </CategoryCard>
          ))}
        </CategoryGrid>

        {/* Seção de Suporte Direto */}
        <SupportSection>
          <SupportContent>
            <div className="text-group">
              <h3>Não encontrou o que precisava?</h3>
              <p>Nossa equipe técnica está disponível para ajudar com questões específicas do seu projeto.</p>
            </div>
            <ButtonGroup>
              <SecondaryButton>
                <FontAwesomeIcon icon={faEnvelope} />
                Enviar Email
              </SecondaryButton>
              <PrimaryButton>
                <FontAwesomeIcon icon={faCommentDots} />
                Abrir Chat
              </PrimaryButton>
            </ButtonGroup>
          </SupportContent>
        </SupportSection>
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
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.xxl}px;
  width: 100%;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
  
  h2 {
    font-size: ${({ theme }) => theme.typography.sizes.xxl}px;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const SearchBox = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;

  svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textLight};
  }

  input {
    width: 100%;
    padding: 16px 16px 16px 50px;
    border-radius: ${({ theme }) => theme.borderRadius.lg}px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.sizes.base}px;
    box-shadow: ${({ theme }) => theme.shadows.md.shadowColor}08 0 4px 12px;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}15;
    }
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl}px;
`;

const CategoryCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  padding: ${({ theme }) => theme.spacing.xl}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.borderDark};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.lg}px;
    margin: ${({ theme }) => theme.spacing.md}px 0 ${({ theme }) => theme.spacing.sm}px;
  }

  p {
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  }

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-size: ${({ theme }) => theme.typography.sizes.sm}px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover { text-decoration: underline; }
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const SupportSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

const SupportContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg}px;

  h3 { margin: 0 0 8px 0; }
  p { margin: 0; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SecondaryButton = styled.button`
  background: white;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover { background: ${({ theme }) => theme.colors.gray50}; }
`;