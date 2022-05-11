// //! 정태영: 추후 searchbar 컴포넌트 분리할 때, 필요할지도 몰라서 남겨둡니다..

// import { SetStateAction, useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// /* eslint-disable */

// const SearchSection = styled.div`
//   /* border: 1px solid pink; */
//   width: 100%;
//   display: flex;
//   flex: 2;
//   justify-content: center;
//   align-items: center;
//   > .search-wrapper {
//     /* border: 1px solid red; */
//     margin-left: 40px;
//     background-color: #ffffff;
//     border: 1px solid #e0e0e0;
//     width: 35%;
//     padding: 0 0.8rem;
//     height: 3rem;
//     display: flex;
//     justify-content: space-evenly;
//     align-items: center;

//     > input {
//       border: none;
//       width: 85%;
//       height: 85%;
//       margin-right: 1rem;
//       &:focus {
//         outline: none;
//       }
//     }

//     > div {
//       font-size: 1.5rem;
//       color: #a3cca3;
//     }
//   }
// `;

// export default function Searchbar() {
//   // 검색창 인풋
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const searchInputChangeHandler = (event: { target: { value: SetStateAction<string> } }) => {
//     setSearchKeyword(event.target.value);
//   };

//   const searchHandler = (searchKeyword: string) => {
//     console.log('검색함수 실행한다.');
//     console.log(searchKeyword);
//     // 검색창 비우기
//     setSearchKeyword('');
//   };

//   const searchClickHandler = () => {
//     searchHandler(searchKeyword);
//   };

//   // 검색창에 글자 입력 후 엔터를 치면 검색 함수 실행
//   const KeyPressHandler = (event: { type: string; code: string }) => {
//     if (event.type === 'keypress' && event.code === 'Enter') {
//       console.log('검색함수실행');
//       searchClickHandler();
//     }
//   };

//   return (
//     <SearchSection>
//       <div className="search-wrapper">
//         <div onClick={searchClickHandler}>🔍</div>
//         <input
//           placeholder="검색어를 입력하세요"
//           type="text"
//           value={searchKeyword}
//           onChange={searchInputChangeHandler}
//           onKeyPress={KeyPressHandler}
//         ></input>
//       </div>
//     </SearchSection>
//   );
// }
