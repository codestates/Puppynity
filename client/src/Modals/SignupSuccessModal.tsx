import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import axios from 'axios';
import { CLOSE_SUCCESS_MODAL } from '../Redux/signupSlice';

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
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  padding: 30px 30px;
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: #ffa224;
  /* background-color: green; */
  justify-content: center;
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    dispaly: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #ffa224;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;
  margin-left: 10px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
  }
`;

const CloseBtn = styled(Link)`
  position: absolute;
  margin-left: 300px;
  margin-bottom: 300px;
  border-radius: 4px;
  background: #ffa224;
  padding: 10px 20px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
  }
`;

// ==========================여기까지 스타일===========================

function SignupSuccessModal(props: any) {
  console.log(props);
  const dispatch = useDispatch();
  const isSuccessOpen = useSelector((state: any) => state.signup.isSuccessModalOpen);
  const closeModal = () => {
    dispatch(CLOSE_SUCCESS_MODAL(false));
  };

  // ==========================상태===============================

  // ==========================구현===============================
  return (
    <Body>
      <Container>
        <Title>회원가입 성공</Title>
        <CloseBtn
          onClick={() => {
            dispatch(CLOSE_SUCCESS_MODAL(false));
          }}
          to="/"
        >
          X
        </CloseBtn>
        <NavBtn>
          <NavBtnLink to="/" onClick={closeModal}>
            메인으로
          </NavBtnLink>
          <NavBtnLink to="/login" onClick={closeModal}>
            로그인
          </NavBtnLink>
        </NavBtn>
      </Container>
    </Body>
  );
}

export default SignupSuccessModal;
