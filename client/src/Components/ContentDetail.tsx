import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteComment, getCommentList, writeComment, setIndex } from '../Redux/commentSlice';
import { saveContentId } from '../Redux/contentSlice';
import { setCommentNum, setContentId } from '../Redux/authSlice';

const CommentContainer = styled.div`
  height: 700px;
  width: auto;
  margin-top: 20px;
  overflow-y: auto;
`;

const CommentListContainer = styled.div`
  height: auto;
  width: auto;
  margin: auto;
  margin-top: 30px;
  border-color: black;
  border: solid;
  overflow-x: auto;
`;
const ListStyle = styled.li`
  height: 50px;
  margin: auto;
  border-bottom: solid 3px;
  border-color: blue;
  text-align: left;
  list-style: none;
  overflow-y: auto;
`;

const Header = styled.div`
  height: 3vh;
  width: auto;
  border: orange solid 2px;
  text-align: cetner;
  padding: 10px;
  margin: auto;
  font-size: larger;
  > .author {
    // text-align: right;
  }
`;

const BtnTop = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 5px;
  margin: auto;
  margin-left: 4px;
  cursor: pointer;
  // bottom: 10px;
  :nth-child(1) {
    background-color: #ff7b8f;
    color: #fff;
    border: none;
  }
  :nth-child(2) {
    //border-radius: 100%;
    background-color: #ffa224;
    border: none;
    color: #fff;
  }
`;

const ContentDetail = styled.div`
  // height: auto;
  width: 100%;
  height: auto;
  display: flex;
  margin: auto;
  margin-top: 30px;
  > .content-text {
    border-radius: 20px;
    border: orange solid 2px;
    height: 50vh;
    width: 50vh;
    margin: auto;
  }
  > .img-box {
    height: 50vh;
    width: 50vh;
    border: black none 1px;

    margin: auto;

    > .img {
      /* min-height: 100%;
      min-width: 100%; */
      // object-fit: cover;
      max-width: 100%;
      max-height: 100%;
      border-radius: 20px;
    }
  }
`;

const ContentWrapper = styled.div`
  height: 70vh;
  > .button {
    float: right;
  }
`;

const Textarea = styled.textarea`
  width: 400px;
  height: 100px;
  border: solid 5px;
  border-color: peachpuff;
  border-radius: 5%;
`;

function Content() {
  // 서버로부터 데이터를 받아와서 우리 입맛대로 렌더링할 포맷을 여기서 정해준다.
  // username, createdAt, uplaoded content, text content가 보여져야한다.
  // const contents = useSelector();
  const noimg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png';
  const reduxComments = useSelector((state: any) => state.commentList);
  // const viewCount = useSelector((state: number) => state.status) // 리덕스로 조회수 관리
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [commentList, setCommentList] = useState<any[]>([]);
  const [dbContent, setDbContent] = useState<any>([]);
  const [author, setAuthor] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [commentID, setCommentID] = useState<string | number>();
  const [like, setLike] = useState(false);

  const parameter = window.location.pathname;
  const loginState = useSelector((state: any) => state);
  const { userPk, loginType, commentNum } = loginState.auth;
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

  const handleEditCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditComment(e.target.value);
  };

  // console.log(dbContent.writer.nickname);
  const submitComment = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}${parameter}/comments`, // localhost:4000/posts/39/comments
        { userId: userPk, content: comment },
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            loginType,
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

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('좋아요 요청');
    console.log(`${process.env.REACT_APP_BASE_URL}${parameter}/likes`);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}${parameter}/likes`, {
        headers: { loginType },
      })
      .then((res) => {
        console.log(res);
        setLike(true);
      });
  };

  // 상세 게시물 정보 조회
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}${parameter}`).then((res) => {
      console.log(res.data);
      console.log('-------------------');
      console.log(res.data.post);
      setDbContent(res.data.post);
      console.log(dbContent);
      setAuthor(res.data.writer.nickname);
      console.log(author);
    });
  }, []);

  // 해당 게시물의 댓글들 조회
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}${parameter}/comments`).then((res) => {
      console.log(res.data.comments);
      const result = [...res.data.comments];
      console.log(result);
      setCommentList(result[0]); // 성공적으로 담기고 있음.
      console.log(commentList);
      dispatch(setCommentNum({ commentNum: result[1] }));
      // dispatch(getCommentList([res.data.comments])); // 리덕스에 현재 commentList를 담아준다.
    });
  }, []);

  const deleteContent = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}${parameter}`, {
        headers: {
          loginType,
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/community');
      });
  };
  const handleContentId = () => {
    dispatch(
      setContentId({
        contentId: dbContent.id, // redux 상태에 해당 게시물의 Id가 잘 담기고 있다
      }),
    );
    navigate('/editcontent');
  };

  // =====================handling content =============================

  const handleDeleteComment = (e: React.MouseEvent<HTMLElement>) => {
    // dispatch(deleteComment(e.currentTarget));
    console.log(e.currentTarget.id); // ? 버튼 클릭 시 해당 게시물의 Id가 전달됨
    const commentid = e.currentTarget.id;
    // dispatch(deleteComment({ commentid }));
    // commentList.filter((el) => el.id !== commentid);
    // commentList.filter((item) => item.id !== Number(commentid));
    setCommentList([...commentList].filter((item) => item.id !== commentid));

    //! axios.delete() 요청
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}${parameter}/comments/${commentid}`, {
        // localhost:4000/posts1/comments/comment-id
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          loginType,
        },
      })
      .then((res) => {
        console.log(res.data);
        // setCommentList([])
        window.location.reload(); // 삭제시 바로 리로드?
      });
  };
  const getId = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.id);
    setCommentID(e.currentTarget.id);
  };

  const selectComment = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e.currentTarget.id);
    // const commentId = e.currentTarget.id;
    setIsSelected(!isSelected);
    setCommentID(e.currentTarget.id);
  };

  const submitEditComment = () => {
    // setCommentList([...commentList].find((el) => el.id === commentId));

    //! axios request
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}${parameter}/comments/${commentID}`,
        { content: editComment },
        {
          headers: {
            loginType,
          },
        },
      )
      .then((res) => {
        console.log('댓글 수정 완료');
        console.log(res);
      });
  };

  // =========================== handling comments ================================

  return (
    <div className="content-container">
      <ContentWrapper>
        <Header>
          <span>{`제목: ${dbContent.title}`}</span>
          <span style={{ float: 'left' }}>{`글쓴이: ${author}`}</span>
          <BtnTop className="delete" onClick={deleteContent} type="button" style={{ float: 'right' }}>
            삭제
          </BtnTop>
          <BtnTop onClick={handleContentId} type="button" style={{ float: 'right' }}>
            게시글 수정
          </BtnTop>
          {/* <BtnTop className="heart" onClick={handleLike} type="button" style={{ float: 'right' }}>
            {like ? '♡' : '❤️'}
          </BtnTop> */}
        </Header>

        <ContentDetail>
          <div className="img-box">
            <img
              alt="content-img"
              className="img"
              src={dbContent.imgRef ? `${process.env.REACT_APP_BASE_URL}/uploads/${dbContent.imgRef}` : noimg}
            />
          </div>
          <div className="content-text">{dbContent.content}</div>
        </ContentDetail>
      </ContentWrapper>
      <CommentContainer>
        <form onSubmit={submitComment}>
          <textarea
            onChange={handleCommentChange}
            placeholder="please enter your comment"
            className="write-comment"
            style={{ margin: '2px' }}
          />
          <div>
            <button className="submit-comment" type="submit">
              댓글 남기기
            </button>
          </div>
        </form>

        <CommentListContainer>
          {commentList.map((el: any) => (
            <div key={el.id}>
              <ListStyle>
                {!isSelected ? (
                  <div>
                    <span>{`user:  ${el.writer.nickname}`}</span>
                    <div className="date" style={{ font: '3px', float: 'right' }}>
                      {el.createdAt.substr(0, 10)}
                    </div>
                    <div>
                      <button onClick={handleDeleteComment} id={el.id} type="button" style={{ float: 'right' }}>
                        X
                      </button>
                      <button onClick={selectComment} id={el.id} type="button" style={{ float: 'right' }}>
                        ...
                      </button>
                    </div>
                    <div>{el.content}</div>
                  </div>
                ) : (
                  <form onSubmit={submitEditComment}>
                    <div>
                      <textarea
                        onChange={handleEditCommentChange}
                        style={{ height: 'auto', margin: 'auto' }}
                        defaultValue={el.content}
                      />
                      <button type="submit" id={el.id} onClick={getId}>
                        댓글 수정
                      </button>
                      <button type="button" onClick={selectComment}>
                        취소
                      </button>
                    </div>
                  </form>
                )}
              </ListStyle>
              {/* {isSelected ? (
              <form onSubmit={submitEditComment}>
                <div>
                  <textarea onChange={handleEditCommentChange}>{el.content}</textarea>
                  <button type="submit" id={el.id}>
                    댓글 수정
                  </button>
                  <button type="button" onClick={selectComment}>
                    취소
                  </button>
                </div>
              </form>
            ) : (
              ''
            )} */}
            </div>
          ))}
        </CommentListContainer>
      </CommentContainer>
    </div>
  );
}

export default Content;
