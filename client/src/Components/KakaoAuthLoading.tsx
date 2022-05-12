import React, { Component, useEffect, useState } from 'react';
/* eslint-disable */
import LogoImg from '../Assets/puppynityLogo.svg';
import axios from 'axios';
import './KakaoAuthLoading.css';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLogin, setUserPk, setKakaoNickname, setLoginType } from '../Redux/authSlice';

export default function KakaoAuthLoading() {
  // ---
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code'); // 인가코드
  // const REDIRECT_URI = 'http://localhost:3000/login/kakao/callback';
  // const REST_API_KEY = 'fd4b88881bd747670e3fe74aab66ce82';
  const [isKakaoPk, setIsKakaoPk] = useState(0);

  const getAccessToken = (code: string) => {
    // 카카오 콜백 uri로 받은 인가코드를 서버한테 카카오에서 토큰 받아주라고 요청

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/auth/kakao`,
        { authorizationCode: code },
        {
          headers: { 'Content-Type': 'application/json', loginType: localStorage.getItem('loginType') },
          withCredentials: true,
        },
      )
      .then((resp) => {
        // 토큰 잘 받아왔으면 header에 default로 토큰 설정을해준다
        axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`;
        localStorage.setItem('user', resp.data.nickname);
        localStorage.setItem('token', resp.data.accessToken);
        localStorage.setItem('loginType', 'kakao');
        localStorage.setItem('userPk', resp.data.id);
        window.location.replace('/');
      });
  };

  React.useEffect(() => {
    // 인가코드
    const authCode = new URL(window.location.href).searchParams.get('code') as string;

    // 카카오 회원 정보 제공 동의 후 callback uri로 인가코드가 넘어오면
    if (authCode) {
      // 서버에 카카오 토큰을 받아주라고 요청(하는 함수로 인자 인가 코드 인자 전달)
      getAccessToken(authCode);
    }
  }, []);

  return (
    <div className="kakaoLoadingWrapper">
      <img src={LogoImg} className="logo" style={{ width: '200px', height: '200px', margin: '20px' }} />
      <h1 className="loading">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>🐾</span>
        <span>🐾</span>
      </h1>
    </div>
  );
}
