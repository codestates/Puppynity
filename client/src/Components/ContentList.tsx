import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

interface IDBContentType {
  id: number;
  userId: number;
  title: string;
  category: string;
  imgRef?: string | Blob | undefined;
  content: string;
  createdAt: string;
}
interface IDBContentType extends Array<IDBContentType> {}

function ContentList(): JSX.Element {
  // const [contentList, setContentList] = useState<Array<string>>([...dummyContents]);
  // type of img = HTMLImageElement or File.
  const navigate = useNavigate();
  const erorImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png';
  const contents = useSelector((state: any) => state.content); // redux에 저장된 상태를 참조한다.

  // const [visiblePosts, setVisiblePosts] = useState(0); // for pagenation.

  const [dbContents, setDbContents] = useState<any[]>([]); // used Union type!

  // const [visibleContents, setVisibleContents] = useState()

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts`).then((res) => {
      console.log(res);
      setDbContents(res.data.posts);
    });
  }, []); // 여기에 DbContents를 인자로 주면, dbContents가 업데이트 될 때에 새로고침된다.

  const renderedContnents = contents.map((content: IContentType) => (
    <div key={content.id}>
      <ContentContainer>
        <img src={content.picture} alt="" width="80px" height="100px" />
        <TitleContainer>{`[${content.category}]` + content.title}</TitleContainer>
        <UserinfoContainer>{content.username + ' ' + content.createdAt}</UserinfoContainer>
      </ContentContainer>
    </div>
  ));

  const redirectToContentDetail = (e: React.MouseEvent<HTMLInputElement>) => {
    // onClick event로 해당 게시물의 원래 주소(페이지)를 띄어준다.
    const click_id = e.currentTarget.id;
    console.log(click_id);
    console.log('=================');
    console.log(e.currentTarget.id);
    navigate(`/posts/${click_id}`);
  }; // 게시글 클릭 시 게시물의 디테일을 보여준다.

  return (
    <section className="content-form">
      <div onClick={redirectToContentDetail} className="realcontents"></div>
      <div className="dummycontents">{renderedContnents}</div>
      <div className="servercontents">
        <div className="serverdata">
          {dbContents.map((post) => (
            <div key={post.id}>
              <ContentContainer>
                <img src={post.imgref ? post.imgref : erorImg} alt="fromServer" height="100px" width="100px" />
                <TitleContainer>{`[${post.category}] ` + post.title}</TitleContainer>
                <UserinfoContainer>{post.username + post.createdAt}</UserinfoContainer>
              </ContentContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContentList;
