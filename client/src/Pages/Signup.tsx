import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SignInput = styled.input`
  width: 200px;
  height: 20px;
`;

const Btn = styled.button`
  width: 120px;
  height: 50px;
  margin-top: 20px;
`;

const AuthBtn = styled.button`
  width: 110px;
  height: 20px;
`;

const Form = styled.form``;

// ==========================여기까지 스타일===========================

// export 함수 SignupPage
function SignupPage() {
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [confirm, setConfirm] = useState('');
  const { username, email, mobile, password, confirmPassword } = inputValue;

  // input 값 바뀔때 이벤트 핸들러
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(`첫 렌더링 두번 찍히는건 strict mode 때문이래요 👏`);
  }, []);

  // dependency array 가 비어있게 설정되면, 첫 렌더링 시에만 불림
  // useEffect 를 활용하여 useState를 동기적으로 처리
  // inputValue 값이 바뀔 때에 불려지는 useEffect hook
  useEffect(() => {
    console.log(`인풋밸류 값이 바뀌어 렌더링 되었습니다. 👏`);
    if (password === '' || confirmPassword === '') {
      setConfirm('');
    } else if (password === confirmPassword) {
      setConfirm('일치');
    } else {
      setConfirm('불일치');
    }
  }, [inputValue]);

  // 이메일 인증 핸들러
  const handleAuth = (event: React.MouseEvent<HTMLElement>) => {
    console.log(`이메일 인증 버튼 누르기 👏`);
  };

  // axios 로 post 요청 핸들러
  const handleAxios = (event: React.MouseEvent<HTMLElement>) => {
    const data = {
      username,
      password,
      mobile,
      email,
    };

    console.log(data);
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:4000/signup',
    //   data,
    //   headers: {
    //     'Content-Type': `application/json`,
    //     withCredentials: true,
    //   },
    // })
    //   .then((res) => {})
    //   .catch((err) => {
    //     if (err.message === 'Request failed with status code 409') {
    //     }
    //   });
  };

  return (
    <div>
      <div>여긴 회원가입 콘솔을 확인하세요 👏</div>

      <Form>
        <div>{`유저네임 : ${username}`}</div>
        <SignInput name="username" onChange={handleInput} />
        <div>{`이메일 : ${email}`}</div>
        <SignInput name="email" onChange={handleInput} type="email" autoComplete="off" />
        <AuthBtn onClick={handleAuth} type="button">
          이메일 인증하기
        </AuthBtn>
        <div>{`모바일 : ${mobile}`}</div>
        <SignInput name="mobile" onChange={handleInput} />
        <div>{`비밀번호 : ${password}`}</div>
        <SignInput name="password" onChange={handleInput} type="password" autoComplete="off" />
        {/* type=password 이면 autoComplete 기능을 지정해주어야 한다. 끄거나 켜거나? */}
        <div>{`비밀번호확인 : ${confirm}`}</div>
        <SignInput name="confirmPassword" onChange={handleInput} type="password" autoComplete="off" />
      </Form>
      <Btn onClick={handleAxios}>회원가입</Btn>
    </div>
  );
}

export default SignupPage;
