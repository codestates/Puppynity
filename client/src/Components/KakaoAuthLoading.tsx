import React, { Component, useEffect } from 'react';
/* eslint-disable */
import LogoImg from '../Assets/puppynityLogo.svg';
import axios from 'axios';
import './KakaoAuthLoading.css';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function KakaoAuthLoading() {
  // ---
  let navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get('code'); //인가코드
  let REDIRECT_URI = 'http://localhost:3000/login/kakao/callback';
  let REST_API_KEY = 'fd4b88881bd747670e3fe74aab66ce82';

  // const getAccessToken = async (code: string) => {
  //   // 카카오 콜백 uri로 받은 인가코드를 서버한테 카카오에서 토큰 받아주라고 요청
  //   try {
  //     const resp = await axios.post(`http://localhost:4000/auth/kakao`, {
  //       headers: {
  //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 추가된 항목
  //       },
  //       authorizationCode: code,
  //     });
  //     // 잘 토큰 잘 받아왔으면 header에 default로 토큰 설정을해준다
  //     // axios.defaults.headers.common['Authorization'] = `Bearer resp.accessToken`;
  //     console.log(resp.data.accessToken);
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`;
  //   } catch (err: any) {
  //     console.log(err.data);
  //   }
  // };

  // React.useEffect(() => {
  //   // 인가코드
  //   const authCode = new URL(window.location.href).searchParams.get('code') as string;

  //   // 카카오 회원 정보 제공 동의 후 callback uri로 인가코드가 넘어오면
  //   if (authCode) {
  //     // 서버에 카카오 토큰을 받아주라고 요청(하는 함수로 인자 인가 코드 인자 전달)
  //     getAccessToken(authCode);
  //   }
  // }, []);

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      // client_secret:,
    });
    try {
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);
      navigate('/');
    } catch (err) {
      console.log(err);
    }

    // return null;
  };

  React.useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="kakaoLoadingWrapper">
      <img src={LogoImg} className="logo" style={{ width: '200px', height: '200px', margin: '20px' }} />
      <h1>
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
