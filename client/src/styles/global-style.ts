import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

/* eslint-disable */

const GlobalStyle = createGlobalStyle`
${reset}
/* global style 작성 */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

export default GlobalStyle;
