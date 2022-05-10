import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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
`;

const Title = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  color: #ffa224;
  /* background-color: yellow; */
  width: 800px;
  height: 30px;
  align-items: flex-end;
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
  background-color: lightgrey;
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

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
  }
`;

const Like = styled.div`
  padding: 18px;
  border: 2px solid #ecf0f1;
  margin: 15px;
  border-radius: 5px;
  width: 75px;
`;

const Write = styled.div`
  padding: 18px;
  border: 2px solid #ecf0f1;
  margin: 15px;
  border-radius: 5px;
  width: 75px;
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
  // ==========================여기까지 상태===========================

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(OPEN_MODAL(true));
  };
  const openDeleteModal = () => {
    dispatch(DELETE_USER_MODAL_OPEN(true));
  };

  if (userPk !== 0 && localStorage.getItem('loginType') === 'email') {
    useEffect(() => {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/users/:${userPk}`,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then((res) => {
        setIsNickname(res.data.userInfo.nickname);
        setAvatarImg(res.data.userInfo.avatarRef);
        console.log(res.data.userInfo.avatarRef);
      });
    }, []);
  }

  const kakaoNick: any = localStorage.getItem('user');

  useEffect(() => {
    if (localStorage.getItem('loginType') === 'kakao') {
      setIsNickname(kakaoNick);
      setIsKakao(true);
    } else {
      setIsKakao(false);
    }
  }, [isNickname]);

  console.log(avatarImg);
  console.log(typeof avatarImg);

  // ==========================여기까지 구현===========================

  return (
    <Body>
      {isOpen && <Modal />}
      {isDeleteUserModalOpen && <Modal2 />}
      <Container>
        <ChildBox>
          <ProfileImg
            src={
              avatarImg === 'null'
                ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                : `http://localhost:4000/uploads/${avatarImg}`
            }
          />
          {isNickname}
          {isKakao ? (
            <EditBtn disabled>카카오 로그인중 ...</EditBtn>
          ) : (
            <EditBtn onClick={openModal}>내 정보 변경하기</EditBtn>
          )}
        </ChildBox>

        <ChildBox>
          <Detail>내가 찜한 게시물</Detail>
          <Like>찜게1</Like>
          <Like>찜게2</Like>
          <Like>찜게3</Like>
          <Like>찜게4</Like>
          <Like>찜게5</Like>
          <Like>찜게6</Like>
          <Like>찜게7</Like>
          <Like>찜게8</Like>
        </ChildBox>

        <ChildBox>
          <Detail>내가 작성한 게시물</Detail>
          <Write>작성 1</Write>
          <Write>작성 2</Write>
          <Write>작성 3</Write>
          <Write>작성 4</Write>
          <Write>작성 5</Write>
          <Write>작성 6</Write>
          <Write>작성 7</Write>
          <Write>작성 8</Write>
        </ChildBox>

        <ChildBox>
          <DeleteBtn onClick={openDeleteModal}>회원 탈퇴</DeleteBtn>
        </ChildBox>
      </Container>
    </Body>
  );
}

export default MyPage;
