import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import jwt from 'jsonwebtoken';
import { OPEN_MODAL, TRUE_INPUT_DISABLE } from '../Redux/signupSlice';

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
  font-family: GmarketMedium;
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

const AuthInput = styled.input`
  height: 28px;
  border: none;
  outline: none;
  border-bottom: 1px solid #aaa;
`;

const Detail = styled.div`
  color: #ffa224;
  font-family: GmarketMedium;
  font-size: 13px;
`;

const AuthSubmit = styled.button`
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
  margin-left: 10px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
  }
`;

// ==========================여기까지 스타일===========================

function SignupModal(props: any) {
  const { email } = props;
  console.log(email);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.signup.isModalOpen);
  const [time, setTime] = useState(179);
  const [inputValue, setInputValue] = useState({ validNum: '' });
  const [disable, setDisable] = useState(true);
  const [validMsg, setValidMsg] = useState('');
  // const {verification} = useSelector((state: RootState)) => state.auth)
  // const {expireAt} = verification.OTP
  // ==========================상태===============================
  const [validNum, setValidNum] = useState();
  // handleInput 함수
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // useEffect 인증메일 post 요청
  useEffect(() => {
    if (email !== '') {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/auth/email-auth`,
        data: {
          email,
        },
        headers: {
          'Content-Type': `application/json`,
          withCredentials: true,
          loginType: localStorage.getItem('loginType'),
        },
      })
        .then((res: any) => {
          console.log(res);
          console.log(res.data.data.number);
          setValidNum(res.data.data.number);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
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

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  // 인증하기 버튼
  const handleValid = () => {
    const validNumNum = Number(inputValue.validNum);
    if (validNumNum === validNum) {
      setDisable(false);
      setValidMsg('');
      dispatch(OPEN_MODAL(false));
      dispatch(TRUE_INPUT_DISABLE(true));
      // 이메일 인풋 디스에이블 시키는 함수 넣기
    } else {
      setDisable(true);
      setValidMsg('번호가 다릅니다.');
    }
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
            dispatch(OPEN_MODAL(false));
          }}
          type="button"
        >
          X
        </CloseBtn>
        <AuthBox>
          <Detail>{`${email}로 인증번호가 발송되었습니다. 이메일로 전달받은 인증번호를 입력해주세요.`}</Detail>
        </AuthBox>
        {/* <AuthBox>
          <Title>{timeFormat(time)}</Title>
        </AuthBox> */}
        <AuthBox>
          <AuthInput name="validNum" onChange={handleInput} />
        </AuthBox>
        <AuthBox>
          <AuthSubmit onClick={handleValid}>인증하기</AuthSubmit>
        </AuthBox>
        <AuthBox>{validMsg}</AuthBox>
      </Container>
    </Body>
  );
}

export default SignupModal;
