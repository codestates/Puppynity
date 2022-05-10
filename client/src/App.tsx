import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { selectUser } from './Redux/userSlice';
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
import ContentDetail from './Components/ContentDetail'; // 실험용
/* eslint-disable */
//! 카카오 로그인 처리 컴포넌트
import KakaoAuthLoading from 'Components/KakaoAuthLoading';

function App() {
  //const user = useSelector(selectUser);

  const images = [
    { pic: dummyContents[0].picture, id: 1 },
    { pic: dummyContents[1].picture, id: 2 },
    { pic: dummyContents[2].picture, id: 3 },
  ];

  // const [translateValue, setTranslateValue] = useState<number>(0);

  // const moveRight = (): void => {
  //   if (translateValue !== 70 * (images.length - 1)) {
  //     setTranslateValue((prev) => prev + 70);
  //   } else {
  //     setTranslateValue(0);
  //   }
  // };

  // const moveLeft = (): void => {
  //   if (translateValue !== 0) {
  //     setTranslateValue((prev) => prev - 70);
  //   } else {
  //     setTranslateValue(70 * (images.length - 1));
  //   }
  // };

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
          <Route path="/contentdetail" element={<ContentDetail />} />
          {/* 추후 로딩 컴포넌트 만들어지면 라우팅 페이지로 넣어주세요*/}
          <Route path="/login/kakao/callback" element={<KakaoAuthLoading />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
