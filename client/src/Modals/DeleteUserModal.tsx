import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import axios from 'axios';
import { DELETE_USER_MODAL_CLOSE } from '../Redux/mypageSlice';

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

const Btn = styled.button``;

const ModalBox = styled.div``;

// ==========================여기까지 스타일===========================

function DeleteUserModal(props: any) {
  // ==========================상태===============================

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(DELETE_USER_MODAL_CLOSE(false));
  };
  // ==========================구현===============================
  return (
    <Body>
      <Container>
        <ModalBox>
          <Btn>계정을 삭제하시겠습니까?</Btn>
        </ModalBox>
        <ModalBox>
          <Btn onClick={closeModal}>X</Btn>
        </ModalBox>
      </Container>
    </Body>
  );
}

export default DeleteUserModal;
