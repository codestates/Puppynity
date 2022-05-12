import React, { useEffect, useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LogoImg from '../Assets/puppynityLogo.svg';
import { setIsLogin, setUserPk, setLoginType, setKakaoNickname, setNickname } from '../Redux/authSlice';

// import LoginType from '../Redux/authSlice';

const Nav = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  font-family: GmarketLight;
  /* border-bottom: 1px solid #aaa; */
`;

const NavLink = styled(Link)`
  font-weight: bold;
  color: #ffa224;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #777;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #777;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #ffa224;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;
  margin-left: 10px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
  }
`;

interface ILoginCheck {
  loginStatus: boolean;
}

const NavBtn = styled.div<ILoginCheck>`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    dispaly: none;
  }

  ${NavBtnLink}:nth-child(2) {
    ${(props) =>
      props.loginStatus === true &&
      `
      background: #ff7b8f;
      color: #fff;
      
      &:hover{
        background: #fff;
        color: #ff7b8f;
      }
    `}
  }
`;

const NavLogo = styled(Link)`
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem;
  height: 100%;
  cursor: pointer;
  /* filter: invert(100%); */
  margin-left: 24px;

  &.active {
    color: #e29091;
  }

  &:hover {
    transition: all 0.2s ease-in-out;

    filter: invert(50%);
    /* filter: opacity(0.5) drop-shadow(0 0 0 #ff0000); */
  }
`;

// ==========================여기까지 스타일===========================

function NavBar() {
  const loginStatus = useSelector((state: any) => state.auth.isLogin);
  const loginState = useSelector((state: any) => state);
  const { name } = useSelector((state: any) => state.auth.nickname);
  const { userPk, nickname, kakaoNickname, loginType, isLogin } = loginState.auth;
  const dispatch = useDispatch();
  const [isNickname, setIsNickname] = useState('');
  //! 필요한거:  닉네임, 로그인 상태

  const logout = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:4000/auth/logout',
      headers: { 'Content-Type': 'application/json', loginType: localStorage.getItem('loginType') },
      withCredentials: true,
    }).then((resp) => {
      console.log(resp);
    });
    dispatch(setIsLogin(false));

    dispatch(setKakaoNickname({ kakaoNickname: '' }));
    dispatch(setNickname({ nickname: '' }));

    dispatch(setUserPk({ userPk: 0 }));
    dispatch(setLoginType({ loginType: '' }));
    setIsNickname('');
    // localStorage.setItem('user', '');
    // localStorage.setItem('token', '');
    // localStorage.setItem('loginType', '');
    // localStorage.setItem('userPk', '');
    localStorage.setItem('avatar', '');
  };




  return (
    <div>
      {loginStatus ? (
        <Nav>
          <NavLogo to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
            <img src={LogoImg} alt="LogoImg" width="50" height="50" />
          </NavLogo>
          <NavMenu>
            <NavLink to="/community" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              커뮤니티
            </NavLink>
            <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              채팅하기
            </NavLink>
          </NavMenu>
          <NavBtn loginStatus={loginStatus}>
            <NavBtnLink to="/mypage">{loginType === 'kakao' ? kakaoNickname : nickname} 님 어서오세요</NavBtnLink>
            <NavBtnLink to="/" onClick={logout}>
              로그아웃
            </NavBtnLink>
          </NavBtn>
        </Nav>
      ) : (
        <Nav>
          <NavLogo to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
            <img src={LogoImg} alt="LogoImg" width="50" height="50" />
          </NavLogo>
          <NavMenu>
            <NavLink to="/community" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              커뮤니티
            </NavLink>
          </NavMenu>
          <NavBtn loginStatus={false}>
            <NavBtnLink to="/signup">회원가입</NavBtnLink>
            <NavBtnLink to="/login">로그인</NavBtnLink>
          </NavBtn>
        </Nav>
      )}
    </div>
  );
}

export default NavBar;
