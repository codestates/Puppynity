import React, { useState, useCallback } from 'react';
// import styled from 'styled-components';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // store에있는 상태 꺼내오기가능

export default function Login() {
  const { login } = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <form>
          <span>이메일</span>
          <input className="userEmail" placeholder="please write your email" />
          <br />
          <br />
          <span>비밀번호</span>
          <input className="pwd" type="password" placeholder="비밀번호" />
          <br />
          <br />
          <button onClick={() => dispatch(login())} className="btn-login" type="submit">
            로그인
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
