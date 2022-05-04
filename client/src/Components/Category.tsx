import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { all, chooseCategory } from '../Redux/categorySlice';

const CategoryList = styled.li`
  display: inline;
  font-size: 10px;
`;
const CategoryBtn = styled.button`
  background-color: #f9de59;
  width: 80px;
  height: 50px;
  font-size: 10px;
  margin: 10px;
  padding: 10px;
  border: #f9de59;
  border-radius: 5%;
  color: white;
  cursor: pointer;
  :focus {
    background-color: #a1dffb;
  }
`;

export default function Category(): JSX.Element {
  const dispatch = useDispatch();
  const content = useSelector((state: any) => state.content);
  const [activeCategory, setActiveCategory] = useState('');
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const setCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    setActiveCategory(e.currentTarget.value);
    console.log(activeCategory);
    dispatch(
      chooseCategory({
        category: activeCategory,
      }),
    );
  };

  return (
    <div className="category">
      <CategoryList>
        <CategoryBtn onMouseDown={setCategory} value="all">
          전체 게시글
        </CategoryBtn>
      </CategoryList>
      <CategoryList>
        <CategoryBtn onMouseDown={setCategory} value="tips">
          팁/노하우
        </CategoryBtn>
      </CategoryList>
      <CategoryList>
        <CategoryBtn onMouseDown={setCategory} value="question">
          질문
        </CategoryBtn>
      </CategoryList>
      <CategoryList>
        <CategoryBtn onMouseDown={setCategory} value="brag">
          댕댕이자랑
        </CategoryBtn>
        <CategoryBtn onMouseDown={setCategory} value="daily-talk">
          일상공유&수다
        </CategoryBtn>
      </CategoryList>
    </div>
  );
}
