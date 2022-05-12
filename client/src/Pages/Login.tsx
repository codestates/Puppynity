import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'; // store에있는 상태 꺼내오기가능
/* eslint-disable */

import { setIsLogin, setUserPk, setLoginType } from '../Redux/authSlice';
import LogoImg from '../Assets/puppynityLogo.svg';
import KakaoLogin from '../Assets/kakao_login_medium.png';
import axios from 'axios';

const InputContainer = styled.div`
  align-items: center;
  margin-top: 30%;
  width: '200px';
  height: 40%;
  border-radius: 30%;
  background-color: papayawhip;
`;

const Button = styled.button`
  font-size: '1em';
  margin: '20px';
  padding: '0.25em' '1em';
  border: '5px' solid red;
  border-radius: '5px';
  background-color: white;
  width: '80px';
  height: '40px';
  cursor: 'pointer';
`;

// ==============================style=================================
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useState<boolean>(false);
  // const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  //! 카카오 oauth 요청 url
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  // 여기서 카카오 로그인 페이지로 리다이렉션 시켜준다 => KakaoAuthLoading에서 이후 토큰 발급 로직을 작성해준다.

  const kakaoLoginHandler = () => {
    // 두번째 방법
    window.location.assign(KAKAO_AUTH_URL);
  };
  // console.log(`${process.env.REACT_APP_BASE_URL}`)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json', loginType: localStorage.getItem('loginType') },
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.data.accessToken) {
          const userId = localStorage.setItem('user', JSON.stringify(res.data.id)); //! 유저 정보를 로컬 스토리지에 저장
          console.log(res);

          localStorage.setItem('user', JSON.stringify(res.data)); //! 유저 정보를 로컬 스토리지에 저장
          dispatch(setUserPk({ userPk: res.data.id }));
          dispatch(setLoginType({ loginType: res.data.loginType }));
          localStorage.setItem('token', res.data.accessToken); // 토큰 로컬에 저장
          localStorage.setItem('loginType', 'email');
          localStorage.setItem('userPk', res.data.id);
        }
        if (res.data.message === 'email 로그인 성공') {
          console.log('서버가 준 토큰 ---> ', res.data.accesToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
          // console.log(localStorage.getItem('token'));
          dispatch(
            setIsLogin({
              isLogin: true,
            }),
            // setUserId({
            //   action.payload = userId,
            // }),
          );
          navigate('/');
        }
      });
    setEmail('');
    setPassword('');
    // const isLogin = useSelector()
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <InputContainer>
        <img src={LogoImg} className="logo" style={{ width: '200px', height: '200px', margin: '20px' }} />
        <div>
          <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
            {/* onsubmit prevents websites refreshing */}
            <span>Email: </span>
            <input onChange={(e) => handleEmailChange(e)} className="userEmail" placeholder="please write your email" />
            <br />
            <br />
            <span>Password: </span>
            <input onChange={(e) => handlePassword(e)} className="pwd" type="password" placeholder="비밀번호" />
            <br />
            <br />
            <button className="btn-login" type="submit">
              Login
            </button>
            <br />
            {/* <a href={KAKAO_AUTH_URL}> */}
            <img
              onClick={kakaoLoginHandler}
              src={KakaoLogin}
              className="kakao-login"
              style={{ width: '80px', height: '40px', margin: '20px', cursor: 'pointer' }}
            />
            {/* </a> */}
          </form>
        </div>
      </InputContainer>
    </div>
  );
}
