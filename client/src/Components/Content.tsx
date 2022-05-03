import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import dummyContents from '../static/dummyContents';

function Content() {
  // 서버로부터 데이터를 받아와서 우리 입맛대로 렌더링할 포맷을 여기서 정해준다.
  // title, username, createdAt, uplaoded content, text content가 보여져야한다.
  // const contents = useSelector();

  return (
    <div className="content-container">
      <li className="content">
        <div className="content" />
      </li>
    </div>
  );
}

export default Content;
