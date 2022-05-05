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
const StyledSelect = styled.select`
  width: 100px;
  height: 60px;
  background-color: #f9de59;
  color: white;
  border: #f9de59;
  border-radius: 5%;
  :option {
    background: black;
    color: #fff;
    padding: 3px 0;
  }
`;

export default function Category(): JSX.Element {
  const dispatch = useDispatch();
  const content = useSelector((state: any) => state.content);
  const [activeCategory, setActiveCategory] = useState('');
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <div className="option-form">
        <StyledSelect onChange={setCategory}>
          {activeCategory || '전체 게시물'}
          <option value="all"> 전체 게시글</option>
          <option value="informational"> 팁/노하우 </option>
          <option value="dailyLog"> 일상공유&수다 </option>
          <option value="Q&A"> 질문 </option>
        </StyledSelect>
      </div>
      {/* <CategoryList>
        <CategoryBtn onMouseDown={setCategory} value="all">
          전체 게시글
        </CategoryBtn>
        <CategoryBtn onMouseDown={setCategory} value="informational">
          팁/노하우
        </CategoryBtn>
        <CategoryBtn onMouseDown={setCategory} value="Q&A">
          질문
        </CategoryBtn>
        {/* <CategoryBtn onMouseDown={setCategory} value="">
          댕댕이자랑
        </CategoryBtn> */}
      {/* <CategoryBtn onMouseDown={setCategory} value="dailyLog">
          일상공유&수다
        </CategoryBtn>
      </CategoryList> */}
    </div>
  );
}
