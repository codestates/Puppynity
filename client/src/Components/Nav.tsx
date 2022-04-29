import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // store에있는 상태 꺼내오기가능

function Nav() {
  // isLogin 상태에 따라 달라지는 로그인 버튼!
  const navigate = useNavigate();
  const sendLogin = () => {
    navigate('/main');
  };
  // const loginState = useSelector((state) => state);
  return (
    <div className="navbar-wrapper">
      <button type="button" className="btn-community">
        커뮤니티
      </button>
      <button type="button" className="btn-mypage">
        마이페이지
      </button>
      <button type="button" className="btn-login">
        login
      </button>
    </div>
  );
}

export default Nav;
