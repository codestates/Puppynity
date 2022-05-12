import { createGlobalStyle } from 'styled-components';
import GmarketBold from './GmarketSansBold.otf';
import GmarketLight from './GmarketSansLight.otf';
import GmarketMedium from './GmarketSansMedium.otf';

export default createGlobalStyle`
  @font-face {
    font-family: 'GmarketBold';
    src: local('GmarketBold'),
    url(${GmarketBold});
  }
  @font-face {
    font-family: 'GmarketLight';
    src: local('GmarketLight'),
    url(${GmarketLight});
  }
  @font-face {
    font-family: 'GmarketMedium';
    src: local('GmarketMedium'),
    url(${GmarketMedium});
  }
`;
