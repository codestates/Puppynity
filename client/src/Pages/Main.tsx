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

  return (
    <div>
      <Slider />
      <Link to="/uploadcontent">upload content</Link>
    </div>
  );
}
