// pages/AnalyticsPage.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faKey,
  faUsers,
  faShieldVirus,
  faArrowUp,
  faArrowDown,
  faCalendarAlt,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from '@/shared/constants/PageHeader/PageHeader';

// --- MOCK DATA ---
const stats = [
  { id: 1, label: 'Requisições de Secrets', value: '1.2M', change: '+12.5%', trend: 'up', icon: faChartLine, color: '#0066FF' },
  { id: 2, label: 'Secrets Ativas', value: '452', change: '+18', trend: 'up', icon: faKey, color: '#10B981' },
  { id: 3, label: 'Membros Ativos', value: '12', change: '0%', trend: 'neutral', icon: faUsers, color: '#7E22CE' },
  { id: 4, label: 'Tentativas Bloqueadas', value: '143', change: '-5.2%', trend: 'down', icon: faShieldVirus, color: '#EF4444' },
];

export function Analytics() {
  return (
    <Container>
      <PageHeader
        title="Analytics & Insights"
        description="Visualize o uso de recursos e a atividade de segurança do seu projeto."
      />

      <MainContent>
        {/* Filtros de Período */}
        <PeriodBar>
          <div className="label">Mostrando dados de:</div>
          <SelectPeriod>
            <FontAwesomeIcon icon={faCalendarAlt} className="cal" />
            <span>Últimos 30 dias</span>
            <FontAwesomeIcon icon={faChevronDown} className="arrow" />
          </SelectPeriod>
        </PeriodBar>

        {/* Grid de KPIs */}
        <StatsGrid>
          {stats.map(stat => (
            <StatCard key={stat.id}>
              <div className="header">
                <IconBox $color={stat.color}>
                  <FontAwesomeIcon icon={stat.icon} />
                </IconBox>
                <TrendBadge $trend={stat.trend}>
                  <FontAwesomeIcon icon={stat.trend === 'up' ? faArrowUp : faArrowDown} />
                  {stat.change}
                </TrendBadge>
              </div>
              <div className="content">
                <span className="label">{stat.label}</span>
                <h2 className="value">{stat.value}</h2>
              </div>
            </StatCard>
          ))}
        </StatsGrid>

        {/* Mock de Gráfico Principal */}
        <ChartSection>
          <ChartHeader>
            <h3>Volume de Requisições por Ambiente</h3>
            <p>Monitoramento em tempo real de acessos via SDK e CLI.</p>
          </ChartHeader>
          <ChartPlaceholder>
            {/* Aqui entraria uma lib como Recharts ou Chart.js */}
            <div className="mock-bars">
              {[40, 70, 45, 90, 65, 80, 95, 60, 50, 85, 40, 75].map((h, i) => (
                <div key={i} className="bar" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="axis-labels">
              <span>01 Fev</span><span>07 Fev</span><span>14 Fev</span><span>21 Fev</span><span>28 Fev</span>
            </div>
          </ChartPlaceholder>
        </ChartSection>

        {/* Seção de Métricas Secundárias */}
        <BottomGrid>
          <ActivityCard>
            <h3>Top Variáveis Acessadas</h3>
            <ActivityItem>
              <code>DATABASE_URL</code>
              <span>450k calls</span>
            </ActivityItem>
            <ActivityItem>
              <code>STRIPE_SECRET_KEY</code>
              <span>210k calls</span>
            </ActivityItem>
            <ActivityItem>
              <code>AWS_ACCESS_KEY</code>
              <span>180k calls</span>
            </ActivityItem>
          </ActivityCard>

          <ActivityCard>
            <h3>Acessos por Região</h3>
             <ActivityItem>
              <span>🇺🇸 US-East-1 (N. Virginia)</span>
              <strong>65%</strong>
            </ActivityItem>
            <ActivityItem>
              <span>🇧🇷 SA-East-1 (São Paulo)</span>
              <strong>22%</strong>
            </ActivityItem>
            <ActivityItem>
              <span>🇪🇺 EU-West-1 (Ireland)</span>
              <strong>13%</strong>
            </ActivityItem>
          </ActivityCard>
        </BottomGrid>

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
  box-sizing: border-box;
`;

const PeriodBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  .label { font-size: 14px; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const SelectPeriod = styled.button`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 14px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  
  .cal { color: ${({ theme }) => theme.colors.textLight}; }
  .arrow { font-size: 10px; color: ${({ theme }) => theme.colors.textLight}; }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const StatCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .label { font-size: 14px; color: ${({ theme }) => theme.colors.textSecondary}; }
  .value { font-size: 28px; font-weight: 700; margin: 4px 0 0 0; color: ${({ theme }) => theme.colors.text}; }
`;

const IconBox = styled.div<{ $color: string }>`
  width: 40px; height: 40px;
  border-radius: 10px;
  background: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
`;

const TrendBadge = styled.div<{ $trend: string }>`
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex; align-items: center; gap: 4px;
  background: ${({ $trend }) => $trend === 'up' ? '#D1FAE5' : $trend === 'down' ? '#FEE2E2' : '#F3F4F6'};
  color: ${({ $trend }) => $trend === 'up' ? '#059669' : $trend === 'down' ? '#DC2626' : '#6B7280'};
`;

const ChartSection = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const ChartHeader = styled.div`
  margin-bottom: 24px;
  h3 { margin: 0; }
  p { margin: 4px 0 0 0; color: ${({ theme }) => theme.colors.textSecondary}; font-size: 14px; }
`;

const ChartPlaceholder = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .mock-bars {
    height: 100%;
    display: flex;
    align-items: flex-end;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    
    .bar {
      flex: 1;
      background: linear-gradient(to top, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primary}88);
      border-radius: 4px 4px 0 0;
      min-width: 20px;
    }
  }

  .axis-labels {
    display: flex;
    justify-content: space-between;
    padding-top: 12px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const ActivityCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  
  h3 { font-size: 16px; margin-bottom: 16px; }
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-size: 14px;

  code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
  &:last-child { border-bottom: none; }
`;