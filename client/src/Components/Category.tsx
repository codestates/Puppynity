import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
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

//! 여기서 전체 게시물을 받아와서 리덕스로 넘겨서, contentList에서 핸들링 하게 해야하나..?

export default function Category(): JSX.Element {
  const dispatch = useDispatch();
  const content = useSelector((state: any) => state.content);
  const [activeCategory, setActiveCategory] = useState('');
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const setCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setActiveCategory(e.currentTarget.value);
    setIsClicked(true);
    dispatch(
      chooseCategory({
        category: activeCategory,
      }),
    );
    console.log(activeCategory);
  };

  return (
    <div className="category">
      <CategoryList>
        <CategoryBtn onMouseDown={setCategory} value="all">
          전체 게시글
        </CategoryBtn>
        <CategoryBtn onMouseDown={setCategory} value="informational">
          팁/노하우
        </CategoryBtn>
        <CategoryBtn onMouseDown={setCategory} value="Q&A">
          질문
        </CategoryBtn>

        <CategoryBtn onMouseDown={setCategory} value="dailyLog">
          일상공유&수다
        </CategoryBtn>
      </CategoryList>
    </div>
  );
}
