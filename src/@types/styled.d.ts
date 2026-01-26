// types/styled.d.ts
import 'styled-components';
import type { Theme } from '../shared/theme/themeType';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}