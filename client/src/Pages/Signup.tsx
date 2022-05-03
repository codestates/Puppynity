import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_MODAL } from '../Redux/signupSlice';
import Modal from '../Modals/SignupModal';

const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* ======== */
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #ecf0f1;
`;

const Container = styled.div`
  background-color: #fff;
  display: flex;
  width: 70vw;
  height: 80vh;
  padding: 30px 30px;
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: #ffa224;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 70vw;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const InputBox = styled.div`
  width: 1000px;
  background-color: #fff;
  display: flex;
  justify-content: center;
`;

const Detail = styled.div`
  width: 90px;
  display: flex;
  justify-content: right;
  /* background-color: yellow; */
  margin-right: 10px;
  align-items: center;
  font-weight: 500;
  color: #ffa224;
`;

const SignInput = styled.input`
  width: 300px;
  height: 30px;
  display: flex;
  justify-content: left;
  border: none;
  outline: none;
  background: none;
  border-bottom: 1px solid lightgrey;
`;

const SignInputE = styled.input`
  width: 218px;
  height: 30px;
  border: none;
  outline: none;
  background: none;
  border-bottom: 1px solid lightgrey;
`;

const AuthBtn = styled.button`
  height: 34px;
  margin-left: 20px;
`;

const Btn = styled.button`
  width: 300px;
`;

const WrapAvater = styled.div`
  color: lightgrey;
  width: 310px;
`;

const Avatar = styled.img`
  height: 100px;
  width: 100px;
  margin: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

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
  const [profileImage, setProfileImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [files, setFiles] = React.useState<File>();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.signup.isModalOpen);
  console.log(isOpen, `useSelector`);

  // ==========================여기까지 상태===========================

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

  // axios 로 post 요청 핸들러
  const handleAxios = (event: React.MouseEvent<HTMLElement>) => {
    const data = {
      username,
      password,
      mobile,
      email,
      profileImage,
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

  // 프로필 사진 업로드 useRef
  const fileInput = useRef<HTMLInputElement>(null);

  // 프로필 사진 onChange
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.files); // 얘가 오브젝트이긴 한데
    const onChangeFiles = event.currentTarget.files;
    if (!onChangeFiles) return;
    if (onChangeFiles['0']) {
      setFiles(onChangeFiles['0']);
    } else {
      setProfileImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    }

    const reader = new FileReader();

    if (onChangeFiles.length !== 0) {
      reader.readAsDataURL(onChangeFiles['0']);
    }

    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setProfileImage(e.target.result);
      }
    };
  };

  // ==========================구현함수================================

  return (
    <Body>
      {isOpen && <Modal email={email} />}
      <Container>
        <Form>
          <Title>회원가입</Title>

          <InputBox>
            <Detail>프로필 사진</Detail>
            <WrapAvater>
              <Avatar
                src={profileImage}
                onClick={() => {
                  if (!fileInput.current) {
                    return;
                  }
                  fileInput.current.click();
                }}
              />
            </WrapAvater>
            <UploadBtn
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
          </InputBox>

          <InputBox>
            <Detail />
            <WrapAvater>사진을 변경하시려면 이미지를 눌러주세요</WrapAvater>
          </InputBox>

          <InputBox>
            <Detail>사용자이름</Detail>
            <SignInput name="username" onChange={handleInput} />
          </InputBox>

          <InputBox>
            <Detail>이메일</Detail>
            <SignInputE name="email" onChange={handleInput} type="email" autoComplete="off" />
            {/* <AuthBtn onClick={handleModalBtn} type="button"> */}
            <AuthBtn
              onClick={() => {
                dispatch(OPEN_MODAL(true));
              }}
              type="button"
            >
              인증하기
            </AuthBtn>
          </InputBox>

          <InputBox>
            <Detail>전화번호</Detail>
            <SignInput name="mobile" onChange={handleInput} />
          </InputBox>

          <InputBox>
            <Detail>비밀번호</Detail>
            <SignInput name="password" onChange={handleInput} type="password" autoComplete="off" />
          </InputBox>
          {/* type=password 이면 autoComplete 기능을 지정해주어야 한다. 끄거나 켜거나? */}

          <InputBox>
            <Detail>비밀번호확인</Detail>
            <SignInput name="confirmPassword" onChange={handleInput} type="password" autoComplete="off" />
          </InputBox>
          <Btn onClick={handleAxios} type="button">
            회원가입
          </Btn>
        </Form>
      </Container>
    </Body>
  );
}

export default SignupPage;
