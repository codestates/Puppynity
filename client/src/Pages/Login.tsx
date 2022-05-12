import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'; // store에있는 상태 꺼내오기가능
/* eslint-disable */

import { setIsLogin, setUserPk, setLoginType, setNickname } from '../Redux/authSlice';
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

  const [isNickname, setIsNickname] = React.useState<string | undefined>('');

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

  const JWT_EXPIRY_TIME = 1000 * 15;

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

          axios({
            // 요청이 잘 오고있다.
            url: `${process.env.REACT_APP_BASE_URL}/users/:${res.data.id}`,
            method: 'get',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }).then((res) => {
            const name = res.data.userInfo.nickname;
            console.log(res.data.userInfo.nickname);
            dispatch(setNickname({ nickname: name }));
          });
        }
        if (res.data.message === 'email 로그인 성공') {
          console.log('서버가 준 토큰 ---> ', res.data.accesToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
          // console.log(localStorage.getItem('token'));
          dispatch(
            setIsLogin({
              isLogin: true,
            }),
          );
          navigate('/');
        }
      });
    setEmail('');
    setPassword('');
    // const isLogin = useSelector()
  };

  //  const refreshToken = () => {
  //   axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refreshtoken`, {Headers:{
  //     "Content-Type": "application/json",
  //   }}).then((res) => {
  //     console.log(res.data);
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`

  //     setTimeout(() =>{
  //       refreshToken(null);
  //     }, (10* 1000))
  //   })
  // }

  // const onSilentRefresh = () => {
  //   // refresh token이 쿠키에 담겨있을 예정.
  //   // accessToken을 브라우저 상 private 변수로 저장한다.
  //   // 주기적인 로그인 요청
  //   axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, { email, password }, { headers:
  //      { 'Content-Type': 'application/json' }, withCredentials: true })
  //     .then((res) => {
  //     console.log(res.data);
  //     // console.log(res.cookie) // refreshtoken 확인
  //     const {token} = res.data; // token을 변수에 저장한다.

  //     setTimeout(()=> {
  //         // 15초 뒤 액세스 토큰 재발급.
  //         // 자동적으로 setTimeout이 발행해 accesstoken이 갱신됨.
  //         axios.post(`${process.env.REACT_APP_BASE_URL}/auth/token-refresh`, {Headers: {
  //            'Content-Type': 'application/json' }, withCredentials: true
  //         })
  //     }, 15 * 1000)

  //     // res.cookie
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`
  //       dispatch(setIsLogin({
  //         isLogin: true
  //       }))

  //       // accessToken이 만료되면 바로 또 요청
  //       // if accessToken is expired
  //       if (!token) {
  //         console.log('requesting accesstoken again')
  //         // 토큰 재발급?
  //       }

  //     }
  //   }

  //? 여기서 개인정보 요청을 보내서, 개인정보를 담아서 redux 상태값으로 넘겨줘서 nav에 넘길 수 있어야함.

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
