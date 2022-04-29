import 'styled-components';

// extend styled components
declare module 'stled-components' {
  export interface DefaultTheme {
    borderRadious: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
