import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* ======== */
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #ecf0f1;
`;

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  /* width: 70vw; */
  /* height: 80vh; */
  padding: 30px 30px;
  border-radius: 5px;
`;

// ==========================여기까지 스타일===========================

function MyPage() {
  return (
    <Body>
      <Container>
        <div>개인정보 수정</div>
      </Container>
    </Body>
  );
}

export default MyPage;
