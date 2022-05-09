import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const CommentContainer = styled.div`
  height: 200px;
  width: 150px;
  margin: auto;
`;

function Content() {
  // 서버로부터 데이터를 받아와서 우리 입맛대로 렌더링할 포맷을 여기서 정해준다.
  // title, username, createdAt, uplaoded content, text content가 보여져야한다.
  // const contents = useSelector();
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

  return (
    <div className="content-container">
      <div className="title">{contents[0].title}</div>
      <div className="content-img">{contents[0].picture}</div>
      <div className="content-text">{contents[0].text}</div>
      <br />
      <CommentContainer>
        <textarea onChange={handleCommentChange} placeholder="please enter your comment" className="write-comment" />
        <button className="submit-comment" type="submit">
          댓글 남기기
        </button>
      </CommentContainer>
    </div>
  );
}

export default Content;
