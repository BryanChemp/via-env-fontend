import { 
  faTachometerAlt,
  faCogs,
  faUsers,
  faHistory,
  faSlidersH,
  faQuestionCircle,
  faDatabase,
  faShieldAlt,
  faChartLine,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { AppPaths } from './Paths';

interface MenuItem {
  id: string;
  label: string;
  icon: IconDefinition;
  path: string;
  badge?: number;
  section: 'main' | 'tools' | 'settings';
}

export const MENU_ITEMS: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: faTachometerAlt, path: AppPaths.DASHBOARD, section: 'main' },
    { id: 'environment', label: 'Variáveis', icon: faCogs, path: AppPaths.ENVIRONMENTS, badge: 3, section: 'main' },
    { id: 'users', label: 'Usuários', icon: faUsers, path: AppPaths.USERS, section: 'main' },
    { id: 'analytics', label: 'Analytics', icon: faChartLine, path: AppPaths.ANALYTICS, section: 'main' },
    
    { id: 'logs', label: 'Logs', icon: faHistory, path: AppPaths.LOGS, section: 'tools' },
    { id: 'database', label: 'Database', icon: faDatabase, path: AppPaths.DATABASE, section: 'tools' },
    { id: 'security', label: 'Segurança', icon: faShieldAlt, path: AppPaths.SECURITY, section: 'tools' },
    
    { id: 'settings', label: 'Configurações', icon: faSlidersH, path: AppPaths.SETTINGS, section: 'settings' },
    { id: 'help', label: 'Ajuda', icon: faQuestionCircle, path: AppPaths.HELP, section: 'settings' },
];

export const MENU_SECTIONS = {
    main: MENU_ITEMS.filter(item => item.section === 'main'),
    tools: MENU_ITEMS.filter(item => item.section === 'tools'),
    settings: MENU_ITEMS.filter(item => item.section === 'settings'),
};

export const sectionLabels = {
    main: 'Principal',
    tools: 'Ferramentas',
    settings: 'Sistema',
};