import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CLOSE_MODAL } from '../Redux/signupSlice';

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
  background-color: red;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
`;

const AuthBox = styled.div`
  background-color: yellow;
`;

const CloseBtn = styled.button``;

// ==========================여기까지 스타일===========================

function SignupModal(props: any) {
  const { email, check } = props;
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.signup.isModalOpen);
  const [time, setTime] = useState(179);
  // const {verification} = useSelector((state: RootState)) => state.auth)
  // const {expireAt} = verification.OTP
  // ==========================상태===============================

  // 타이머 useEffect hook
  useEffect(() => {
    if (time > 0) {
      const Counter = setInterval(() => {
        const gap = Math.floor((new Date().getTime() - new Date().getTime()) / 1000);
        setTime(gap);
      }, 1000);
      return () => clearInterval(Counter);
    }
    return console.log('time over 🕰');
  }, [time]);

  const timeFormat = (e: number) => {
    const m = Math.floor(e / 60).toString();
    let s = (e % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `남은시간 : ${m}:${s}`;
  };

  // ==========================구현===============================
  return (
    <Body>
      {/* {state === true ? ( */}
      <Container>
        <AuthBox>
          <Title>이메일 인증</Title>
          <CloseBtn
            onClick={() => {
              dispatch(CLOSE_MODAL(false));
            }}
            type="button"
          >
            X
          </CloseBtn>
        </AuthBox>
        <AuthBox>
          <div>{`${email}로 인증번호가 발송되었습니다. 이메일로 전달받은 인증번호를 입력해주세요.`}</div>
        </AuthBox>
        <AuthBox>
          <Title>{timeFormat(time)}</Title>
        </AuthBox>
        <AuthBox>
          <Title>이메일 인증</Title>
        </AuthBox>
      </Container>
      {/* ) : (
        <div>hello</div>
      )} */}
    </Body>
  );
}

export default SignupModal;
