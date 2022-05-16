import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, NavLink as Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { DELETE_USER_MODAL_CLOSE } from '../Redux/mypageSlice';
import { setIsLogin, setUserPk, setLoginType } from '../Redux/authSlice';

const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* ======== */
  display: flex;
  height: 400px;
  width: 400px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  position: fixed;
  border: 1px solid #000;
`;

const Container = styled.div`
  /* background-color: red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 300px;
  padding: 30px 30px;
  border-radius: 5px;
`;

const CloseBtn = styled.button`
  position: absolute;
  margin-left: 300px;
  margin-bottom: 300px;
`;

const Detail = styled.div`
  /* width: 100px; */
  display: flex;
  justify-content: center;
  color: #ffa224;
`;

const DeleteBtn = styled.button`
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

const ModalBox = styled.div`
  width: 300px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
`;

// ==========================여기까지 스타일===========================

function DeleteUserModal(props: any) {
  // ==========================상태===============================

  console.log(localStorage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state: any) => state);
  const closeModal = () => {
    dispatch(DELETE_USER_MODAL_CLOSE(false));
  };

  const pathId = loginState.auth.userPk;
  const headerLoginType = loginState.auth.loginType;

  const handleDelete = () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/users/${pathId}`,
      method: 'delete',
      headers: { loginType: headerLoginType },
    }).then((res) => {
      console.log(res);
    });
    dispatch(setIsLogin(false));
    dispatch(setUserPk({ userPk: 0 }));
    dispatch(setLoginType({ loginType: '' }));
    dispatch(DELETE_USER_MODAL_CLOSE(false));

    // window.location.replace('/');
    navigate('/');
  };
  // ==========================구현===============================
  return (
    <Body>
      <Container>
        <ModalBox>
          <Detail>아쉽네요.. 정말 탈퇴하시겠어요?</Detail>
        </ModalBox>
        <ModalBox>
          <DeleteBtn onClick={handleDelete}>탈퇴하기</DeleteBtn>
        </ModalBox>
        <CloseBtn onClick={closeModal}>X</CloseBtn>
      </Container>
    </Body>
  );
}

export default DeleteUserModal;
