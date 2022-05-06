import React from 'react';
/* eslint-disable */
import LogoImg from '../Assets/puppynityLogo.svg';
import axios from 'axios';

export default function KakaoAuthLoading() {
  // ---

  const getAccessToken = async (code: string) => {
    // 카카오 콜백 uri로 받은 인가코드를 서버한테 카카오에서 토큰 받아주라고 요청
    try {
      const resp = await axios.post('http://localhost:4000/auth/kakao', { authorizationCode: code });
      // 잘 토큰 잘 받아왔으면 header에 default로 토큰 설정을 해준다
      console.log(resp.data.accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`;
    } catch (err) {
      console.log(err);
    }
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
      <div>카카오 계정으로 로그인 중입니다...</div>
    </div>
  );
}
