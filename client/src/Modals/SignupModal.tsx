import React, { useEffect, useState } from 'react';
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
`;

const AuthBox = styled.div`
  /* background-color: yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  margin-left: 300px;
  margin-bottom: 300px;
`;

const AuthInput = styled.input``;

const Detail = styled.div`
  color: #ffa224;
`;

const AuthSubmit = styled.button`
  color: #ffa224;
`;

// ==========================여기까지 스타일===========================

function SignupModal(props: any) {
  const { email } = props;
  console.log(email);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.signup.isModalOpen);
  const [time, setTime] = useState(179);
  // const {verification} = useSelector((state: RootState)) => state.auth)
  // const {expireAt} = verification.OTP
  // ==========================상태===============================

  // useEffect 인증메일 post 요청
  useEffect(() => {
    if (email !== '') {
      axios({
        method: 'post',
        url: 'http://localhost:8080/auth/email-auth',
        data: {
          email,
        },
        headers: {
          'Content-Type': `application/json`,
          withCredentials: true,
        },
      })
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
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
      <Container>
        <AuthBox>
          <Title>이메일 인증</Title>
        </AuthBox>
        <CloseBtn
          onClick={() => {
            dispatch(CLOSE_MODAL(false));
          }}
          type="button"
        >
          X
        </CloseBtn>
        <AuthBox>
          <Detail>{`${email}로 인증번호가 발송되었습니다. 이메일로 전달받은 인증번호를 입력해주세요.`}</Detail>
        </AuthBox>
        <AuthBox>
          <Title>{timeFormat(time)}</Title>
        </AuthBox>
        <AuthBox>
          <AuthInput />
        </AuthBox>
        <AuthBox>
          <AuthSubmit>Submit</AuthSubmit>
        </AuthBox>
      </Container>
    </Body>
  );
}

export default SignupModal;
