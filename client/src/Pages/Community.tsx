import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContentList from '../Components/ContentList';
import Nav from '../Components/Nav';
import Category from '../Components/Category';

// TODO: Category 컴포넌트 적용해서 카테고리 별로 게시물 필터링

const Button = styled.button`
  width: auto;
  height: auto;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 5%;
  margin: auto;
  padding: 10px;
  font-size: 12px;
  float: right;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    color: orange;
    background-color: white;
  }
`;

export default function Community() {
  const navigate = useNavigate();
  const toContentUpload = () => {
    navigate('/uploadcontent');
  };

  return (
    <div>
      <Nav />
      <section>
        <h2 style={{ padding: '10px', margin: 'auto' }}>
          공지: 악성적인 비난 댓글은 정지사유에 해당합니다.
          <Button onClick={toContentUpload} type="button">
            게시글 작성!
          </Button>
        </h2>
        <Category />
      </section>
      <ContentList />
    </div>
  );
}
