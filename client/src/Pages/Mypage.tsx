import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { OPEN_MODAL, DELETE_USER_MODAL_OPEN } from '../Redux/mypageSlice';
import Modal from '../Modals/EmailAuthModal';
import Modal2 from '../Modals/DeleteUserModal';

const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* ======== */
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #ecf0f1;
  font-family: GmarketLight;
`;

const ChildBox = styled.div`
  display: flex;
  width: 300px;
  height: 60px;
  align-items: center;
  padding: 18px;
  border: 2px solid #ecf0f1;
  margin: 15px;
  border-radius: 5px;
`;

const DeleteBtn = styled.button`
  align-items: right;
  justify-content: right;
  height: 34px;
  border-radius: 4px;
  color: #fff;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;
  background-color: #ff2424;
  cursor: pointer;
  font-family: GmarketLight;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ff2424;
  }
`;

const Detail = styled.div`
  display: flex;
  width: 600px;
`;

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  /* width: 70vw; */
  /* height: 80vh; */
  padding: 30px 30px;
  border-radius: 5px;
  justify-content: center;
  align-content: flex-start;
  /* align-items: flex-start; */
  width: 740px;
  height: 700px;

  ${ChildBox}:nth-child(1) {
    display: flex;
    flex-wrap: wrap;
    width: 700px;
    height: 60px;
    justify-content: space-between;
  }

  ${ChildBox}:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    width: 680px;
    height: 200px;
    justify-content: space-between;

    ${Detail}:nth-child(1) {
      padding-left: 16px;
    }
  }

  ${ChildBox}:nth-child(3) {
    display: flex;
    flex-wrap: wrap;
    width: 680px;
    height: 200px;
    justify-content: space-between;

    ${Detail}:nth-child(1) {
      padding-left: 16px;
    }
  }

  ${ChildBox}:nth-child(4) {
    display: flex;
    flex-wrap: wrap;
    width: 710px;
    height: 10px;
    justify-content: flex-end;
    border: none;
    margin: 0;
    padding: 0;
  }
`;

const ProfileImg = styled.img`
  border: 1px solid #aaa;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin-left: 16px;
`;

const EditBtn = styled.button`
  margin-right: 16px;
  height: 34px;
  border-radius: 4px;
  color: #fff;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;
  background-color: #ffa224;
  cursor: pointer;
  font-family: GmarketLight;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
  }
`;
interface ILike {
  to: any;
}

const Like = styled(Link)<ILike>`
  padding: 18px;
  border: 2px solid #ecf0f1;
  margin: 15px;
  border-radius: 5px;
  width: 140px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  font-family: GmarketMedium;
  color: #333;

  &:hover {
    transition: all 0.2s ease-in-out;
    border: 2px solid #ffa224;
    cursor: pointer;
  }
`;

const Write = styled.div`
  padding: 18px;
  border: 2px solid #ecf0f1;
  margin: 15px;
  border-radius: 5px;
  width: 140px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  font-family: GmarketMedium;
  color: #333;

  &:hover {
    transition: all 0.2s ease-in-out;
    border: 2px solid #ffa224;
    cursor: pointer;
  }
`;

const ContentsDetail = styled.div`
  margin: 10px;
  font-size: 12px;
  width: 50px;
  height: 30px;
`;

const NickDiv = styled.div``;

interface IImg {
  src: any;
}
const ContentsImg = styled.img<IImg>`
  display: flex;
  width: 30px;
  height: 30px;
  margin: 10px;
`;
// ==========================여기까지 스타일===========================

function MyPage() {
  const loginStatus = useSelector((state: any) => state.auth.isLogin);
  const loginState = useSelector((state: any) => state);
  const { userPk } = loginState.auth;
  const isOpen = useSelector((state: any) => state.mypage.isModalOpen);
  const isDeleteUserModalOpen = useSelector((state: any) => state.mypage.isDeleteUserModalOpen);
  const [isNickname, setIsNickname] = useState('');
  const [isKakao, setIsKakao] = useState(false);
  const [avatarImg, setAvatarImg] = useState('');
  const [myContentsList, setMyContentsList] = useState<any[]>([]);
  const [myBookmarks, setMybookmarks] = useState<any[]>([]);
  // ==========================여기까지 상태===========================

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(OPEN_MODAL(true));
  };
  const openDeleteModal = () => {
    dispatch(DELETE_USER_MODAL_OPEN(true));
  };

  if (userPk !== 0 && loginState.auth.loginType === 'email') {
    useEffect(() => {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/users/:${userPk}`,
        method: 'get',
        headers: {
          // Authorization: axios.defaults.headers.common.Authorization,
          loginType: loginState.auth.loginType,
        },
      }).then((res) => {
        console.log(res);
        setIsNickname(res.data.userInfo.nickname);
        setAvatarImg(res.data.userInfo.avatarRef);
        console.log(res.data.userInfo.avatarRef);
        console.log(typeof res.data.userInfo.avatarRef);
      });
    }, []);
  }

  // const kakaoNick: any = localStorage.getItem('user');

  console.log(loginState);
  useEffect(() => {
    // if (localStorage.getItem('loginType') === 'kakao') {
    if (loginState.auth.loginType === 'kakao') {
      setIsNickname(loginState.auth.kakaoNickname);
      setIsKakao(true);
    } else {
      setIsKakao(false);
    }
  }, [isNickname]);

  // 내가 좋아요 한 글 불러오기

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/users/${userPk}/mybookmarks?limit=6`,
      method: 'get',
      headers: {
        loginType: loginState.auth.loginType,
      },
    }).then((res) => {
      console.log(res.data.posts);
      setMybookmarks(res.data.posts);
    });
  }, []);

  // 내가 쓴 게시글 불러오기

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/users/${userPk}/myposts?limit=6`,
      method: 'get',
      headers: {
        loginType: loginState.auth.loginType,
      },
    }).then((res) => {
      console.log(`============게시글 불러오기===========`);
      // console.log(res.data.posts[0].imgRef); // 0번째 이미지 ref
      // console.log(res.data.posts[0].title); // 0번째 제목
      // console.log(res.data.posts[0].content); // 0번째 내용
      // console.log(res.data.posts[0].updatedAt); // 0번째 마지막 수정일
      console.log(res.data.posts);
      setMyContentsList(res.data.posts);
    });
  }, []);

  const navigate = useNavigate();

  const redirectToContentDetail = (e: React.MouseEvent<HTMLInputElement>) => {
    // onClick event로 해당 게시물의 원래 주소(페이지)를 띄어준다.
    const clickid = e.currentTarget.id;
    console.log(clickid);
    navigate(`/posts/${clickid}`);
  };

  // ==========================여기까지 구현===========================

  return (
    <Body>
      {isOpen && <Modal />}
      {isDeleteUserModalOpen && <Modal2 />}
      <Container>
        <ChildBox>
          {isKakao ? (
            <ProfileImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          ) : (
            <ProfileImg
              src={
                avatarImg === 'null' || avatarImg === null || avatarImg === undefined || avatarImg === ''
                  ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                  : `${process.env.REACT_APP_BASE_URL}/uploads/${avatarImg}`
              }
            />
          )}
          <NickDiv>{isNickname}</NickDiv>
          {isKakao ? (
            <EditBtn disabled>카카오 로그인중 ...</EditBtn>
          ) : (
            <EditBtn onClick={openModal}>내 정보 변경하기</EditBtn>
          )}
        </ChildBox>

        <ChildBox>
          <Detail>내가 찜한 게시물</Detail>
          {myBookmarks.length === 0
            ? '좋아요 한 게시물이 없습니다.'
            : myBookmarks.map((post, index) => (
                <Write key={post.id} id={post.post.id} onClick={redirectToContentDetail}>
                  <ContentsImg
                    src={post.length === 0 ? null : `${process.env.REACT_APP_BASE_URL}/uploads/${post.post.imgRef}`}
                  />
                  <ContentsDetail>{post.post.title}</ContentsDetail>
                </Write>
              ))}
        </ChildBox>

        <ChildBox>
          <Detail>내가 작성한 게시물</Detail>
          {myContentsList.length === 0
            ? '아직 작성한 게시물이 없습니다.'
            : myContentsList.map((posts, index) => (
                <Write key={posts.id} id={posts.id} onClick={redirectToContentDetail}>
                  <ContentsImg
                    src={posts.length === 0 ? null : `${process.env.REACT_APP_BASE_URL}/uploads/${posts.imgRef}`}
                  />
                  <ContentsDetail>{posts.title}</ContentsDetail>
                </Write>
              ))}
        </ChildBox>

        <ChildBox>
          <DeleteBtn onClick={openDeleteModal}>회원 탈퇴</DeleteBtn>
        </ChildBox>
      </Container>
    </Body>
  );
}

export default MyPage;
