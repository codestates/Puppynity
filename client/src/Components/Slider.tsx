import React, { useState, useEffect, JSXElementConstructor, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
/* eslint-disable */
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import sugar from '../Assets/백설기.gif';
import coca from '../Assets/코카.gif';
import forest from '../Assets/푸른숲.gif';

const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* ======== */
  display: flex;
  flex-wrap: wrap;
  /* height: 100vh; */
  justify-content: center;
  /* align-items: center;
  padding: 10px; */
  background-color: #fff;
`;

const Container = styled.div``;

const Intro = styled.div`
  font-family: GmarketLight;
  height: 300px;
  width: 100vw;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffa224;
`;

const Title = styled.div`
  /* background-color: lightcoral; */
  height: 300px;
  width: 100vw;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffa224;
  font-family: GmarketLight;
`;

const ImgSlider = styled.div`
  /* background-color: lightblue; */
  width: 100vw;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FillImage = styled.img`
  height: 500px;
  object-fit: contain;
  background-color: lightgoldenrodyellow;
`;

const ImageList = styled.div``;

const Arrow = styled.div<{ isRight: boolean }>`
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
  ${(props) => (props.isRight ? 'margin-left: 20px' : 'margin-right: 20px')};

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #aaa;
    color: #fff;
  }
`;

const Contents = styled.div`
  border: 1px solid #aaa;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chat = styled.div`
  border: 1px solid #aaa;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// ========================스타일==============
function Slider(): JSX.Element {
  const [pickers, setPickers] = useState<JSX.Element[]>([]);
  // 이미지 순서를 클릭하여 이동하는 pickers 배열

  const [pickIndex, setPickIndex] = useState<number>(0);
  // 기본으로 0번째 인덱스에 위치한 사진을 렌더링

  const pictures = useSelector((state: any) => state.content);

  // 왼쪽 화살표 클릭
  const handlePrevClick = useCallback((): void => {
    if (pickIndex <= 0) {
      // state 업데이트 전, 해당 변수의 값이 0이라면

      setPickIndex(pictures.length - 1);
      // length의 -1로 지정하여 가장 마지막으로 이동한다.

      return;
    }

    setPickIndex(pickIndex - 1);
    // 인덱스 감소
  }, [pickIndex]);

  // 오른쪽 화살표 클릭
  const handleNextClick = useCallback((): void => {
    if (pickIndex + 1 === pictures.length) {
      // +1 했을 때, 배열의 인덱스를 벗어난다면

      setPickIndex(0);
      // 0으로 설정하여 가장 첫번째로 이동

      return;
    }

    setPickIndex(pickIndex + 1);
    // 인덱스 증가
  }, [pickIndex]);

  return (
    <Body>
      <Container>
        <Intro>안녕하세요, 저희는 퍼피니티 입니다.</Intro>
        <ImgSlider>
          <Arrow isRight onClick={handlePrevClick}>
            <AiOutlineArrowLeft />
          </Arrow>
          {/* <FillImage src={pictures[pickIndex].picture} /> */}
          <ImageList>
            <FillImage src={sugar} />
            {/* <FillImage src={coca} /> */}
            {/* <FillImage src={forest} /> */}
          </ImageList>
          {/* pickIndex라는 state 변수를 이용하여 그에 맞는 이미지 렌더링 */}
          <Arrow isRight={false} onClick={handleNextClick}>
            <AiOutlineArrowRight />
          </Arrow>

          {/* <ImageWrapper /> */}
        </ImgSlider>
        <Title>여러분의 이야기를 들려주세요.</Title>
        <Contents>여기는 콘텐츠</Contents>
        <Title>서로에게 이야기를 들려주세요.</Title>
        <Chat>여기는 채팅 광고</Chat>
        <Title>모두의 이야기가 모이는, 퍼피니티</Title>
      </Container>
    </Body>
  );
}

export default Slider;
