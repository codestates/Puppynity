import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './Redux/userSlice';
import dummyContents from './static/dummyContents';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Nav from './Components/Nav';
import Community from './Pages/Community';
import UploadContent from './Components/UploadContent';
/* eslint-disable */
function App() {
  const user = useSelector(selectUser);

  const images = [
    { pic: dummyContents[0].picture, id: 1 },
    { pic: dummyContents[1].picture, id: 2 },
    { pic: dummyContents[2].picture, id: 3 },
  ];

  const [translateValue, setTranslateValue] = useState<number>(0);

  const moveRight = (): void => {
    if (translateValue !== 70 * (images.length - 1)) {
      setTranslateValue((prev) => prev + 70);
    } else {
      setTranslateValue(0);
    }
  };

  const moveLeft = (): void => {
    if (translateValue !== 0) {
      setTranslateValue((prev) => prev - 70);
    } else {
      setTranslateValue(70 * (images.length - 1));
    }
  };

  return (
    <div className="App">
      {/* <Slider /> */}
      {/* <UploadContent handleImgChange={handleImgChange} uploadFile={uploadFile} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/uploadcontent" element={<UploadContent />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/count" element={<Count />} /> */}
          <Route path="/community" element={<Community />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
