import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';
import { commentActions } from '../Redux/commentSlice';

const CommentContainer = styled.div`
  height: 200px;
  width: 150px;
  margin: auto;
`;
function Content() {
  // 서버로부터 데이터를 받아와서 우리 입맛대로 렌더링할 포맷을 여기서 정해준다.
  // title, username, createdAt, uplaoded content, text content가 보여져야한다.
  // const contents = useSelector();
  const noimg = '';
  const dispatch = useDispatch();
  const contents = useSelector((state: any) => state.content);
  const [comment, setComment] = useState('');

  // TODO: 만약 이미지가 없으면 나올 배경을 설정해준다.
  // TODO: 이미지를 클릭했을 때, 그 게시물의 content-detail을 띄어주려면, 주소값을 어떻게 보내줘야할까?

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    // console.log(e.target.value);
  };
  // const submitComment = (e:)
  const submitComment = () => {
    // body: userid, 댓글 내용이 필요하다

    axios.post(`http://localhost:4000/posts/1/comments`, { comment }).then((res) => {
      if (res.status === 201) {
        console.log('잘 등록된듯?');
        console.log(res);
      } else {
        console.log('something is wrong..?');
      }
    });
  };

  // ? 여기서 handleCommentChange같은 함수들을 다뤄야
  return (
    <div className="content-container">
      <div className="title">{contents[0].title}</div>
      <img alt="content-img" src={contents[0].picture ? contents[0].picture : noimg} width="30vh" height="30vh" />
      <div className="content-text">{contents[0].text}</div>
      <br />
      <CommentContainer>
        <form onSubmit={submitComment}>
          <textarea onChange={handleCommentChange} placeholder="please enter your comment" className="write-comment" />
          <button className="submit-comment" type="submit">
            댓글 남기기
          </button>
        </form>
      </CommentContainer>
    </div>
  );
}

export default Content;
