import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import IContentType from '../Redux/contentSlice';
// import RootState, { selectAllContents } from '../Redux/contentSlice';

// TODO: 각 게시물에 좋아요 하트 갯수 + 댓글 갯수 띄어주기.
// TODO: Pagenation

/* eslint-disable */
const ContentContainer = styled.div`
  width: '120px';
  height: '120px';
  margin: 5px;
  padding: 10px;
  border: solid;
`;

const TitleContainer = styled.div`
  width: '80px';
  height: '70px';
  font-size: 10px;
`;

const ImageContainer = styled.img`
  width: '90px';
  height: '100px';
  object-fit: fill;
  cursor: pointer;
`;
const UserinfoContainer = styled.div`
  width: 90px;
  height: auto;
  font-size: 5px;
  align-items: center;
  border-color: black;
  border: solid;
  margin: auto;
`;

interface IContentType {
  id: number;
  title: string | undefined;
  username: string | undefined;
  picture?: string | undefined;
  text: string | undefined;
  category: string;
  createdAt: string;
}

function ContentList(): JSX.Element {
  // const [contentList, setContentList] = useState<Array<string>>([...dummyContents]);
  // type of img = HTMLImageElement or File.
  const contents = useSelector((state: any) => state.content); // redux에 저장된 상태를 참조한다.

  const renderedContnents = contents.map(
    (
      content: IContentType,
      // {
      // id: number;
      // title: string | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
      // username: string | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
      // picture?: string | undefined;
      // text: string | undefined;
      // category: string;
      // createdAt: string;}
    ) => (
      <div key={content.id}>
        <ContentContainer>
          <img src={content.picture} alt="" width="80px" height="100px" />
          <TitleContainer>{`[${content.category}]` + content.title}</TitleContainer>
          <UserinfoContainer>{content.username + ' ' + content.createdAt}</UserinfoContainer>
        </ContentContainer>
      </div>
    ),
  );

  return (
    <section className="content-form">
      <div>{renderedContnents}</div>
    </section>
  );
}

export default ContentList;
