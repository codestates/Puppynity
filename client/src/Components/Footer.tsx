import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../Assets/puppynityLogo.svg';

const Foot = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  border-top: 1px solid #aaa;
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  color: #777;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-weight: bold;
  color: #ffa224;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #777;
  }
`;

const DevLink = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
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

function Footer() {
  return (
    <Foot>
      <NavLogo to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
        <img src={LogoImg} alt="LogoImg" width="50" height="50" />
      </NavLogo>
      <Copyright>Copyright 2022. Team Nuts.</Copyright>
      <DevLink>
        <NavLink href="https://github.com/bellamy828">정태영</NavLink>
        <NavLink href="https://github.com/dokgojw">박지웅</NavLink>
        <NavLink href="https://github.com/joshuashin95">신동윤</NavLink>
        <NavLink href="https://github.com/hhorsekim">김상욱</NavLink>
      </DevLink>
    </Foot>
  );
}

export default Footer;
