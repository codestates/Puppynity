import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { selectUser } from './Redux/userSlice';
import io from 'socket.io-client';
import dummyContents from './static/dummyContents';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Community from './Pages/Community';
import UploadContent from './Components/UploadContent';
import Chat from './Pages/Chat';
import Mypage from './Pages/Mypage';
import EditUserInfo from './Pages/EditUserInfo';
import ContentDetail from './Components/ContentDetail';
import EditContent from './Components/EditContent';
/* eslint-disable */
//! 카카오 로그인 처리 컴포넌트
import KakaoAuthLoading from 'Components/KakaoAuthLoading';

const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  transports: ['websocket'],
  withCredentials: true,
});

function App() {
  //const user = useSelector(selectUser);

  const images = [
    { pic: dummyContents[0].picture, id: 1 },
    { pic: dummyContents[1].picture, id: 2 },
    { pic: dummyContents[2].picture, id: 3 },
  ];

  //! 로그인 연장 요청 useEFfect로 보냄 (토큰 재발급)
  // send refreshToken to server

  return (
    <div className="App">
      {/* <Slider /> */}
      {/* <UploadContent handleImgChange={handleImgChange} uploadFile={uploadFile} /> */}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/uploadcontent" element={<UploadContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/community" element={<Community />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/edituserinfo" element={<EditUserInfo />} />
          <Route path="/posts/:postid" element={<ContentDetail />} />
          <Route path="/editcontent" element={<EditContent />} />

          {/* 추후 로딩 컴포넌트 만들어지면 라우팅 페이지로 넣어주세요*/}
          <Route path="/login/kakao/callback" element={<KakaoAuthLoading />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
