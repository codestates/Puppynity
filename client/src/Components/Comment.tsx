// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { cp } from 'fs';
// import { useSelector, useDispatch } from 'react-redux';
// import { commentActions } from '../Redux/commentSlice';
// // import qs from 'query-string';

// const CommentListContainer = styled.div`
//   height: 200px;
//   width: 150px;
//   margin: auto;
// `;

// const UserinfoContainer = styled.span`
//   height: 40px;
//   margin: auto;
// `;

// interface Dummytype {
//   username: string;
//   profilePic: string;
//   comment: string;
// }

// function Comment(): JSX.Element {
//   // 각 게시물의 댓글들 목록을 보여줄 컴포넌트
//   // 유저의 프로필 사진, 닉네임, createdAt, 댓글내용이 보여져야한다.
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     axios.get(`http://localhost:4000/posts/postId/comments`);
//   }, []);

//   return (
//     <div>
//       <div className="comment-form">
//         {/* {comments.map((el: any) => {
//           <CommentListContainer>
//             <div key={el.id}>
//               <UserinfoContainer>
//                 <img src={el.profilePic ? el.profilePic : 'no profile'} alt="comment-profile" />
//                 <div>{el.username}</div>
//               </UserinfoContainer>
//               {el.comment}
//             </div>
//           </CommentListContainer>;
//         })} */}
//       </div>
//     </div>
//   );
// }

// export default Comment;
