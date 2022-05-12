import React from 'react';
import { Link } from 'react-router-dom';
//! 테스트용
import axios from 'axios';
import Slider from '../Components/Slider';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

/* eslint-disable */
export default function Main() {
  // 슬라이드를 이용한 배너가 있어야합니다.

  //! 테스트용
  const refreshTokens = async () => {
    const accessToken = localStorage.getItem('token');
    const resp = await axios({
      method: 'post',
      url: `http://localhost:4000/auth/token-refresh`,
      headers: { Authorization: `Bearer ${accessToken}`, loginType: localStorage.getItem('loginType') },
      withCredentials: true,
    });
    console.log(resp);
  };
  return (
    <div>
      <div onClick={refreshTokens}>토큰 갱신</div>
      <Slider />
      {/* <Link to="/uploadcontent">upload content</Link> */}
    </div>
  );
}
