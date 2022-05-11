import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteComment, getCommentList, writeComment, setIndex } from '../Redux/commentSlice';
import { saveContent } from '../Redux/contentSlice';

const CommentContainer = styled.div`
  height: 150px;
  width: 150px;
  margin: auto;
`;

const CommentListContainer = styled.div`
  height: 200px;
  width: 300px;
  margin: auto;
  border-color: black;
  border: solid;
`;
const ListStyle = styled.li`
  height: 40px;
  margin: auto;
  border: solid 3px;
  border-color: blue;
`;

function Content() {
  // 서버로부터 데이터를 받아와서 우리 입맛대로 렌더링할 포맷을 여기서 정해준다.
  // username, createdAt, uplaoded content, text content가 보여져야한다.
  // const contents = useSelector();
  const noimg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png';
  const reduxComments = useSelector((state: any) => state.commentList);
  // const viewCount = useSelector((state: number) => state.status) // 리덕스로 조회수 관리
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<any[]>([]);
  const [dbContent, setDbContent] = useState<any>([]);
  const parameter = window.location.pathname;
  const loginState = useSelector((state: any) => state);
  const { userPk } = loginState.auth;
  const [writer, setWriter] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { status } = useSelector((state) => ({
  //   status: state.increaseView.status,
  // }));

  // console.log(userPk); // 성공적으로 로그인되어있는 UserId가 출력된다.
  // TODO: useState로 새로운 댓글을 추가하면 안된다. 그러면 별도의 변수를 선언해서 해당 변수에 댓글리스트를 담아줄까?
  console.log(parameter);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    // console.log(e.target.value);
  };
  // console.log(dbContent.writer.nickname);
  const submitComment = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:4000${parameter}/comments`,
        { userId: userPk, content: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data.comment.writer.nickname);
        setWriter(res.data.comment.writer.nickname); // 댓글 쓴 사람 닉
        // setComment(res.data.comment);
        setCommentList([res.data.comment, ...commentList]);
        // dispatch(writeComment(res.data.comment));
      });
  };
  // 상세 게시물 정보 조회
  React.useEffect(() => {
    axios.get(`http://localhost:4000${parameter}`).then((res) => {
      console.log(res.data);
      console.log('-------------------');
      console.log(res.data.post);
      setDbContent(res.data.post);
    });
  }, []);

  // 해당 게시물의 댓글들 조회
  React.useEffect(() => {
    axios.get(`http://localhost:4000${parameter}/comments`).then((res) => {
      console.log(res.data.comments);
      const result = [...res.data.comments];
      console.log(result);
      setCommentList(result[0]); // 성공적으로 담기고 있음.
      console.log(commentList);
      // dispatch(getCommentList([res.data.comments])); // 리덕스에 현재 commentList를 담아준다.
    });
  }, []);

  const handleDeleteComment = (e: React.MouseEvent<HTMLElement>) => {
    // dispatch(deleteComment(e.currentTarget));
    console.log(e.currentTarget.id); // ? 버튼 클릭 시 해당 게시물의 Id가 전달됨
    const commentid = e.currentTarget.id;
    // dispatch(deleteComment({ commentid }));
    // commentList.filter((el) => el.id !== commentid);
    commentList.filter((item) => item.id !== Number(commentid));
    //! axios.delete() 요청
    axios
      .delete(`http://localhost:4000${parameter}/comments/${commentid}`, {
        // localhost:4000/posts1/comments/comment-id
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleEditContent = () => {
    dispatch(
      saveContent({
        id: dbContent.id,
        title: dbContent.title,
        username: dbContent.writer.nickname,
        imgref: dbContent.imgref,
        content: dbContent.content,
        param: parameter,
      }),
    );
    // navigate('/editcontent');
  };

  const handleEditComment = () => {
    console.log('comment to edit');
  };

  return (
    <div className="content-container">
      <div className="header">
        <div className="title">
          {`제목: ${dbContent.title}`}
          {/* {`글쓴이: ${dbContent.writer.name}`} */}
        </div>

        <span>{`조회수: ${0}`}</span>
      </div>
      <span>
        <button onClick={handleEditContent} type="button">
          게시글 수정
        </button>
      </span>
      <img alt="content-img" src={dbContent.imgref ? dbContent.imgref : noimg} width="200vh" height="200vh" />
      <div className="content-text">{dbContent.content}</div>
      <br />
      <CommentContainer>
        <form onSubmit={submitComment}>
          <textarea
            onChange={handleCommentChange}
            placeholder="please enter your comment"
            className="write-comment"
            style={{ margin: '2px' }}
          />
          <button className="submit-comment" type="submit">
            댓글 남기기
          </button>
        </form>
      </CommentContainer>
      <CommentListContainer>
        {commentList.map((el: any) => (
          <div key={el.id}>
            <ListStyle>
              <span style={{ font: '3px' }}>{el.createdAt}</span>
              <span>{`user:${writer}`}</span>
              <button onClick={handleDeleteComment} id={el.id} type="button" style={{ float: 'right' }}>
                X
              </button>
              <button onClick={handleEditComment} id={el.id} type="button" style={{ float: 'right' }}>
                ...
              </button>
              <div>{el.content}</div>
            </ListStyle>
          </div>
        ))}
      </CommentListContainer>
    </div>
  );
}

export default Content;
