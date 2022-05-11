import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

function InfiniteScroll(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  // 요청할 페이지 번호 변수

  return (
    <Container>
      <div>hi</div>
    </Container>
  );
}

export default InfiniteScroll;

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
