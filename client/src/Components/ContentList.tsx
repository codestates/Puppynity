import { userInfo } from 'os';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import RootState, { selectAllContents } from '../Redux/contentSlice';
/* eslint-disable */
const ContentContainer = styled.div`
  width: '100px';
  height: '100px';
  margin: 5px;
  padding: 10px;
  border: solid;
`;

const TitleContainer = styled.div`
  width: '70px';
  height: '70px';
  font-size: 10px;
`;

const ImageContainer = styled.img`
  width: '70px';
  height: '80px';
  object-fit: fill;
  cursor: pointer;
`;
const UserinfoContainer = styled.div`
  width: 70px;
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
  createdAt: string;
}

function ContentList(): JSX.Element {
  // const [contentList, setContentList] = useState<Array<string>>([...dummyContents]);
  // type of img = HTMLImageElement or File.
  const contents = useSelector((state: any) => state.content);
  // const contents = [...dummyContents];

  const renderedContnents = contents.map(
    (content: {
      id: number;
      title: string | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
      username: string | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
      picture?: string | undefined;
      text: string | undefined;
      createdAt: string;
    }) => (
      <div key={content.id}>
        <ContentContainer>
          <img src={content.picture} alt="" width="80px" height="100px" />
          {/* <p>{content.text}</p> */}
          <TitleContainer>{content.title}</TitleContainer>
          <UserinfoContainer>{content.username + ' ' + content.createdAt}</UserinfoContainer>
        </ContentContainer>
      </div>
    ),
  );

  return (
    <div className="content-form">
      <div>{renderedContnents}</div>
    </div>
  );
}

export default ContentList;
