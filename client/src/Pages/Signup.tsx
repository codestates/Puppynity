import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { OPEN_MODAL, OPEN_SUCCESS_MODAL, FALSE_INPUT_DISABLE } from '../Redux/signupSlice';
import Modal from '../Modals/SignupModal';
import Modal2 from '../Modals/SignupSuccessModal';

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
  /* width: 70vw; */
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
  width: 600px;
  max-width: 1000px;
  justify-content: left;
  align-items: top;
  /* background-color: aqua; */
`;

const InputBox = styled.div`
  width: 1000px;
  min-width: 300px;
  /* background-color: green; */
  display: flex;
  justify-content: center;
`;

const Detail = styled.div`
  width: 90px;
  display: flex;
  justify-content: right;
  /* background-color: blue; */
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

interface IDisabled {
  emailDbCheck: boolean;
}

const AuthBtn = styled.button<IDisabled>`
  height: 34px;
  margin-left: 20px;
  border-radius: 4px;
  color: #fff;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;

  ${(props) =>
    props.emailDbCheck === false &&
    `
    background-color: lightgrey;
    cursor: default;
    `};

  ${(props) =>
    props.emailDbCheck === true &&
    `
    background-color: #ffa224;
    cursor: pointer;

    &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
    }

    `};
`;

interface IIsValidSignup {
  isValidSignup: boolean;
}

const Btn = styled.button<IIsValidSignup>`
  width: 300px;
  margin-top: 20px;
  height: 34px;
  border-radius: 4px;
  color: #fff;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;

  ${(props) =>
    props.isValidSignup === false &&
    `
    background-color: lightgrey;
    cursor: default;
    `};

  ${(props) =>
    props.isValidSignup === true &&
    `
    background-color: #ffa224;
    cursor: pointer;

    &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
    }

    `};
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

interface IValidProps {
  validProps: boolean;
}

const ValidMsg = styled.p<IValidProps>`
  font-size: 10px;
  white-space: pre-line;
  display: flex;
  text-align: left;
  max-width: 240px;
  margin-left: 200px;
  color: ${(props) => (props.validProps === false ? '#ff7b8f' : '#32B34B')};
`;

// ==========================여기까지 스타일===========================
// export 함수 SignupPage
function SignupPage() {
  const [inputValue, setInputValue] = useState({
    username: '',
    nickname: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const { username, nickname, email, mobile, password, confirmPassword } = inputValue;
  const [profileImage, setProfileImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [files, setFiles] = React.useState<File>();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.signup.isModalOpen);
  const isSuccessOpen = useSelector((state: any) => state.signup.isSuccessModalOpen);
  const inputDisable = useSelector((state: any) => state.signup.inputDisable);

  // ==========================여기까지 상태===========================

  const [nameMsg, setNameMsg] = useState('이름은 최소 2자 이상입니다.');
  const [nickMsg, setNickMsg] = useState('닉네임은 3자 이상, 12자 이하 입니다.');
  const [passMsg, setPassMsg] = useState(
    '비밀번호는 영문, 숫자, 특수기호를 각각 1개 이상 포함하고, 최소 8자 이상, 최대 20자 이하여야 합니다.',
  );
  const [mobileMsg, setMobileMsg] = useState('전화번호는 최소 11자 이상이어야 합니다.');
  const [emailMsg, setEmailMsg] = useState('올바른 이메일 형식이 아닙니다.');
  const [confirmMsg, setConfirmMsg] = useState('비밀번호가 일치하지 않습니다.');
  const [emailDbCheck, setEmailDbCheck] = useState(false);
  const [isValidSignup, setIsValidSignup] = useState(false);
  // const isValidEmail = email.includes('@') && email.includes('.');
  const isValidEmail = email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
  const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  const specialNumber = password.search(/[0-9]/gi);
  const isValidPassword = password.length >= 8 && specialLetter >= 1 && password.length < 20 && specialNumber >= 1;
  const isValidMobile = mobile.length >= 11;
  const isConfirmPassword = password === confirmPassword;

  // ==========================여기까지 유효성===========================

  // input 값 바뀔때 이벤트 핸들러
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(FALSE_INPUT_DISABLE(false));
    // console.log(`첫 렌더링 두번 찍히는건 strict mode 때문이래요 👏`);
  }, []);

  // dependency array 가 비어있게 설정되면, 첫 렌더링 시에만 불림
  // useEffect 를 활용하여 useState를 동기적으로 처리
  // inputValue 값이 바뀔 때에 불려지는 useEffect hook + validation check ‼️
  useEffect(() => {
    if (username.length >= 2) {
      setNameMsg('');
    } else {
      setNameMsg('이름은 최소 2자 이상입니다.');
    }

    if (nickname.length < 3 || nickname.length > 12) {
      setNickMsg('닉네임은 3자 이상, 12자 이하 입니다.');
    } else {
      setNickMsg('');
    }

    if (isValidMobile) {
      setMobileMsg('');
    } else {
      setMobileMsg('전화번호는 최소 11자 이상이어야 합니다.');
    }

    if (isValidPassword) {
      setPassMsg('');
    } else {
      setPassMsg('비밀번호는 영문, 숫자, 특수기호를 각각 1개 이상 포함하고, 최소 8자 이상, 최대 20자 이하여야 합니다.');
    }

    if (password === '' || confirmPassword === '') {
      setConfirmMsg('');
    } else if (isConfirmPassword) {
      setConfirmMsg('');
    } else {
      setConfirmMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [inputValue]);

  // 사용가능 이메일 검증 핸들러
  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/users/email-check',
      data: {
        email,
      },
      headers: {
        'Content-Type': `application/json`,
        withCredentials: true,
      },
    })
      .then((res: any) => {
        console.log(res.status);
        if (res.data.message === '사용 가능한 이메일입니다.' && res.status === 200) {
          setEmailMsg('사용 가능한 이메일입니다.');
          setEmailDbCheck(true);
        } else if (res.data.message === '이미 회원가입한 이메일입니다.') {
          setEmailMsg('이미 회원가입한 이메일입니다.');
          setEmailDbCheck(false);
        }
      })
      .catch((err) => {
        setEmailMsg('올바른 이메일 형식이 아닙니다.');
        setEmailDbCheck(false);
      });

    // useEffect 활용해서 signup button disable 하기
    if (isValidMobile && isValidPassword && isConfirmPassword) {
      setIsValidSignup(true);
    } else {
      setIsValidSignup(false);
    }

    console.log(inputValue);
  }, [inputValue]);

  // axios 로 post 요청 핸들러
  const handleAxios = (event: React.MouseEvent<HTMLElement>) => {
    const name = username;
    console.log(event);
    const data = {
      name,
      nickname,
      password,
      mobile,
      email,
      // profileImage,
    };

    console.log(data);

    axios({
      method: 'post',
      url: 'http://localhost:4000/users',
      data,
      headers: {
        'Content-Type': `application/json`,
        withCredentials: true,
      },
    })
      .then((res: any) => {
        console.log(`${res.data.message} ⭐️`);
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 409') {
          console.log(err);
        }
      });

    // 회원가입 버튼 누를 시 모달 오픈
    dispatch(OPEN_SUCCESS_MODAL(true));
  };

  // 프로필 사진 업로드 useRef
  const fileInput = useRef<HTMLInputElement>(null);

  // 프로필 사진 onChange
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.files); // 얘가 오브젝트이긴 한데
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

  // 전화번호에 hypen 생성해주는 onkeyUp event
  // 요청하는 값에는 hypen 이 포함되지 않는다
  const autoHypen = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const regExp = /[^0-9]/g;
    const ele = event.currentTarget;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, '');
    }
    if (ele.value.length === 11) {
      ele.value = ele.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
  };

  // ==========================구현함수================================

  return (
    <Body>
      {isOpen && <Modal email={email} />}
      {isSuccessOpen && <Modal2 />}
      <Container>
        <Form>
          <InputBox>
            <Title>회원가입</Title>
          </InputBox>

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
            <Detail>본명</Detail>
            <SignInput name="username" onChange={handleInput} />
          </InputBox>
          <ValidMsg validProps={false}>{nameMsg}</ValidMsg>

          <InputBox>
            <Detail>닉네임</Detail>
            <SignInput name="nickname" onChange={handleInput} />
          </InputBox>
          <ValidMsg validProps={false}>{nickMsg}</ValidMsg>

          <InputBox>
            <Detail>이메일</Detail>
            <SignInputE name="email" onChange={handleInput} type="email" autoComplete="off" disabled={inputDisable} />
            <AuthBtn
              onClick={() => {
                dispatch(OPEN_MODAL(true));
              }}
              type="button"
              emailDbCheck={emailDbCheck}
              disabled={!emailDbCheck}
            >
              인증하기
            </AuthBtn>
          </InputBox>
          <ValidMsg validProps={emailDbCheck}>{emailMsg}</ValidMsg>

          <InputBox>
            <Detail>전화번호</Detail>
            <SignInput name="mobile" onChange={handleInput} type="text" onKeyUp={autoHypen} />
          </InputBox>
          <ValidMsg validProps={false}>{mobileMsg}</ValidMsg>

          <InputBox>
            <Detail>비밀번호</Detail>
            <SignInput name="password" onChange={handleInput} type="password" autoComplete="off" />
          </InputBox>
          <ValidMsg validProps={false}>{passMsg}</ValidMsg>

          {/* type=password 이면 autoComplete 기능을 지정해주어야 한다. 끄거나 켜거나? */}
          <InputBox>
            <Detail>비밀번호확인</Detail>
            <SignInput name="confirmPassword" onChange={handleInput} type="password" autoComplete="off" />
          </InputBox>
          <ValidMsg validProps={false}>{confirmMsg}</ValidMsg>

          <InputBox>
            <Btn
              // onClick={handleAxios}
              type="button"
              isValidSignup={isValidSignup}
              onClick={handleAxios}
              disabled={!isValidSignup}
            >
              회원가입
            </Btn>
          </InputBox>
        </Form>
      </Container>
    </Body>
  );
}

export default SignupPage;
