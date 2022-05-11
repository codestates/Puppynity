import axios from 'axios';
import React, { useEffect, useState, useCallback, SetStateAction, useRef } from 'react';
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

//! 정태영: 무한스크롤 container,

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 4rem auto;
`;

const PostItem = styled.div`
  width: 100%;
  height: 350px;
  border: 2px solid black;
`;

//! 정태영: 검색창 style

const SearchSection = styled.div`
  /* border: 1px solid pink; */
  width: 100%;
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
  > .search-wrapper {
    /* border: 1px solid red; */
    margin-left: 40px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    width: 35%;
    padding: 0 0.8rem;
    height: 3rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    > input {
      border: none;
      width: 85%;
      height: 85%;
      margin-right: 1rem;
      &:focus {
        outline: none;
      }
    }

    > div {
      font-size: 1.5rem;
      color: #a3cca3;
    }
  }
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

  //! 정태영: 검색 & 무한 스크롤 관련 훅
  const searchInput = useRef<HTMLInputElement>(null);
  //* 검색창 인풋 상태
  const [searchKeyword, setSearchKeyword] = useState('');

  // 요청할 페이지 번호 변수
  const [page, setPage] = useState(1);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/posts?search=${searchKeyword}&page=1&limit=9`)
      .then((resp) => {
        setDbContents(resp.data.posts);
        setPage(2);
      })
      .catch(console.error);
  }, [searchKeyword]);

  const handleScroll = useCallback((): void => {
    // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)
    const { innerHeight } = window;

    // 브라우저 총 내용의 크기 (스크롤을 포함한다)
    const { scrollHeight } = document.body;

    // 현재 스크롤바의 위치
    const { scrollTop } = document.documentElement;

    // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/posts?search=${searchKeyword}&page=${page}&limit=9`).then((res) => {
        const { posts } = res.data;
        setDbContents([...dbContents, ...posts]);
        // 페이지 state 변수의 값도 1씩 늘려줍니다.
        setPage((prevPage: number) => prevPage + 1);
      });
    }
  }, [searchKeyword, page, dbContents]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가합니다.

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거합니다.
    };
  }, [handleScroll]);
  //! --------------

  //! 정태영: 검색 핸들러

  // // api 요청 핸들러
  // const searchHandler = (searchKeyword: string) => {
  //   console.log('검색 함수 실행');
  // };

  // 클릭 이벤트 리스너
  const searchClickHandler = () => {
    if (searchInput.current?.value) {
      setSearchKeyword(searchInput.current.value);
    }
  };
  // 엔터 키 이벤트 리스너
  const KeyPressHandler = (event: { type: string; code: string }) => {
    if (event.type === 'keypress' && event.code === 'Enter' && searchInput.current?.value) {
      setSearchKeyword(searchInput.current.value);
    }
  };
  //! --------------

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
    navigate(`/posts/${click_id}`);
  }; // 게시글 클릭 시 게시물의 디테일을 보여준다.
  // console.log('contents 상태 ------------>', dbContents);

  console.log(dbContents);

  return (
    <Container>
      <SearchSection>
        <div className="search-wrapper">
          <div onClick={searchClickHandler}>🔍</div>
          <input placeholder="검색어를 입력하세요" type="text" onKeyPress={KeyPressHandler} ref={searchInput}></input>
        </div>
      </SearchSection>
      <section className="content-form">
        {/* <div onClick={redirectToContentDetail} className="realcontents"></div>
        <div className="dummycontents">{renderedContnents}</div> */}
        <div className="servercontents">
          <div className="serverdata">
            {dbContents.length === 0
              ? '검색 결과가 없습니다.'
              : dbContents.map((post) => (
                  <div key={post.id}>
                    <ContentContainer>
                      <img
                        src={post.imgRef ? `http://localhost:4000/uploads/${post.imgRef}` : erorImg}
                        alt="fromServer"
                        height="100px"
                        width="100px"
                      />
                      <TitleContainer>{`[${post.category}] ` + post.title}</TitleContainer>
                      <UserinfoContainer>{post.username + post.createdAt}</UserinfoContainer>
                    </ContentContainer>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ContentList;
