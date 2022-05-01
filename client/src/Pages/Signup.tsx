import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SignInput = styled.input`
  width: 200px;
  height: 20px;
`;

const SignBtn = styled.button``;

// ==========================여기까지 스타일===========================

function SignupPage() {
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const { username, email, mobile, password, confirmPassword } = inputValue;

  // dependency array 가 비어있게 설정되면, 첫 렌더링 시에만 불림
  useEffect(() => {
    console.log(`인풋밸류 값이 바뀌어 렌더링 했오요 👏`);
  }, [inputValue]);

  const handleInput = (event: any) => {
    const { name, value } = event.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // const handleAxios = () => {
  //   const data = {
  //     username,
  //     password,
  //     mobile,
  //     email,
  //   };

  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:4000/signup',
  //     data,
  //     headers: {
  //       'Content-Type': `application/json`,
  //       withCredentials: true,
  //     },
  //   })
  //     .then((res) => {})
  //     .catch((err) => {
  //       if (err.message === 'Request failed with status code 409') {
  //       }
  //     });
  // };

  return (
    <div>
      <div>여긴 회원가입 콘솔을 확인하세요 👏</div>
      <div>{`유저네임 : ${username}`}</div>
      <SignInput name="username" onChange={handleInput} />
      <div>{`이메일 : ${email}`}</div>
      <SignInput name="email" onChange={handleInput} type="email" />
      <div>{`모바일 : ${mobile}`}</div>
      <SignInput name="mobile" onChange={handleInput} />
      <div>{`비밀번호 : ${password}`}</div>
      <SignInput name="password" onChange={handleInput} type="password" />
      <div>{`비밀번호확인 : ${confirmPassword}`}</div>
      <SignInput name="confirmPassword" onChange={handleInput} type="password" />
      {/* <SignBtn onClick={handleAxios}>Signup</SignBtn> */}
    </div>
  );
}

export default SignupPage;
