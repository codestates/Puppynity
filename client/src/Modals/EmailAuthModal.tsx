import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import axios from 'axios';
import { CLOSE_MODAL } from '../Redux/mypageSlice';

const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* ======== */
  display: flex;
  height: 600px;
  width: 400px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  position: fixed;
  border: 1px solid #000;
`;

const ValidMsg = styled.div`
  font-size: 10px;
  width: 300px;
  height: 70px;
  color: #ff7b8f;
  display: flex;
  justify-content: flex-start;
  padding-left: 132px;
`;

const ModalBox = styled.div`
  width: 300px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
`;

const Container = styled.div`
  /* background-color: red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 300px;
  /* height: 300px; */
  padding: 30px 30px;
  border-radius: 5px;

  ${ModalBox}:nth-child(1) {
    margin-top: 60px;
  }
`;

interface IIsValidEdit {
  validEdit: boolean;
}

const Btn = styled.button<IIsValidEdit>`
  height: 34px;
  border-radius: 4px;
  color: #fff;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;
  background-color: #ffa224;
  cursor: pointer;

  ${(props) =>
    props.validEdit === false &&
    `
    background-color: lightgrey;
    cursor: default;
    `};

  ${(props) =>
    props.validEdit === true &&
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

const CloseBtn = styled.button`
  position: absolute;
  margin-left: 300px;
  margin-bottom: 500px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  margin-right: 10px;
  border-bottom: 1px solid lightgrey;
`;

const Detail = styled.div`
  width: 100px;
  display: flex;
  justify-content: left;
  color: #ffa224;
`;

const WrapAvater = styled.div`
  color: lightgrey;
  width: 149px;
`;

const Avatar = styled.img`
  height: 100px;
  width: 100px;
  margin: 0px 20px 20px 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

const AvatarBtn = styled.button`
  height: 24px;
  border-radius: 4px;
  color: #fff;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;
  background-color: #ffa224;
  cursor: pointer;
  margin-left: 120px;
  margin-bottom: 20px;

  background-color: #ffa224;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ffa224;
  }
`;
// ==========================여기까지 스타일===========================

function EmailAuthModal(props: any) {
  const [inputValue, setInputValue] = useState({
    nickname: '',
    mobile: '',
    password: '',
    avatarRef: null,
  });
  const { nickname, mobile, password, avatarRef } = inputValue;
  const [nicknameMsg, setNicknameMsg] = useState('닉네임은 3자 이상, 12자 이하 입니다.');
  const [mobileMsg, setMobileMsg] = useState('전화번호는 최소 11자 이상이어야 합니다.');
  const [passwordMsg, setPasswordMsg] = useState(
    '비밀번호는 영문, 숫자, 특수기호를 각각 1개 이상 포함하고, 최소 8자 이상, 최대 20자 이하여야 합니다.',
  );
  const [validNickname, setValidNickname] = useState(false);
  const [validMobile, setValidMobile] = useState(false);
  // const [validPassword, setValidPassword] = useState(false);
  const [validEdit, setValidEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [files, setFiles] = React.useState<File>();
  const loginStatus = useSelector((state: any) => state.auth.isLogin);
  const loginState = useSelector((state: any) => state);
  const { userPk } = loginState.auth;
  const [isNickname, setIsNickname] = useState('');
  const [isMobile, setIsMobile] = useState('');
  const [isAvatarImg, setIsAvatarImg] = useState('');
  // ==========================상태===============================
  const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  const specialNumber = password.search(/[0-9]/gi);
  const isValidPassword = password.length >= 8 && specialLetter >= 1 && password.length < 20 && specialNumber >= 1;

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  useEffect(() => {
    if (nickname.length >= 3 && nickname.length <= 12) {
      setNicknameMsg('');
      setValidNickname(true);
    } else {
      setNicknameMsg('닉네임은 3자 이상, 12자 이하 입니다.');
      setValidNickname(false);
    }

    if (mobile.length >= 11) {
      setMobileMsg('');
      setValidMobile(true);
    } else {
      setMobileMsg('전화번호는 최소 11자 이상이어야 합니다.');
      setValidMobile(false);
    }

    if (isValidPassword) {
      setPasswordMsg('');
    }

    if (validNickname && validMobile && isValidPassword) {
      setValidEdit(true);
    } else {
      setValidEdit(false);
    }

    console.log(inputValue);
  }, [inputValue]);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(CLOSE_MODAL(false));
  };

  // axios patch 함수
  // const editUserInfo = () => {
  //   axios({
  //     url: `${process.env.REACT_APP_BASE_URL}/users/:${userPk}`,
  //     method: 'patch',
  //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //     data: { nickname: `${nickname}`, mobile: `${mobile}` },
  //   }).then((res) => {
  //     console.log(res);
  //   });

  //   closeModal();
  //   window.location.replace('/mypage');
  // };

  // 하이픈 자동 생성
  const autoHypen = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const regExp = /[^0-9]/g;
    const ele = event.currentTarget;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, '');
    }
    if (ele.value.length === 11) {
      ele.value = ele.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      setValidEdit(true);
    }
  };

  // 프로필 사진 업로드 useRef
  const fileInput = useRef<HTMLInputElement>(null);

  // 프로필 사진 onChange
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.files); // 얘가 오브젝트이긴 한데
    const onChangeFiles = event.currentTarget.files;
    if (!onChangeFiles) return;
    if (onChangeFiles['0']) {
      console.log(onChangeFiles);
      console.log(onChangeFiles[0]);
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

    // img onChange event

    const formData: any = new FormData();
    formData.append('img', onChangeFiles[0]);

    //! 정태영: 파일 첨부와 동시에 서버로 이미지 파일 전송
    axios
      .post('http://localhost:4000/posts/upload', formData, {
        // formData
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        setInputValue({
          ...inputValue,
          avatarRef: res.data.imgRef,
        });
      });
  };

  // 처음 페이지 렌더링 시 axios get요청 (userinfo)
  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/users/:${userPk}`,
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then((res) => {
      console.log(typeof res.data.userInfo.avatarRef);
      console.log(res.data.userInfo.avatarRef);
      setIsNickname(res.data.userInfo.nickname);
      setIsMobile(res.data.userInfo.mobile);
      setIsAvatarImg(res.data.userInfo.avatarRef);
      if (res.data.userInfo.avatarRef) {
        setProfileImage(`http://localhost:4000/uploads/${res.data.userInfo.avatarRef}`);
      }
      if (res.data.userInfo.avatarRef === 'null') {
        setProfileImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
      }
    });
  }, []);

  // axios patch 함수
  const editUserInfo = () => {
    console.log(avatarRef);
    console.log(typeof avatarRef);
    if (avatarRef !== null) {
      axios({
        url: `http://localhost:4000/users/:${userPk}`,
        method: 'patch',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { nickname: `${nickname}`, mobile: `${mobile}`, password: `${password}`, avatarRef: `${avatarRef}` },
      }).then((res) => {
        console.log(res);
      });
    } else {
      axios({
        url: `http://localhost:4000/users/:${userPk}`,
        method: 'patch',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { nickname: `${nickname}`, mobile: `${mobile}`, password: `${password}`, avatarRef: `${avatarRef}` },
      }).then((res) => {
        console.log(res);
      });
    }
    closeModal();
    window.location.replace('/mypage');
  };

  const defaultImg = () => {
    setProfileImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  };

  // ==========================구현===============================
  return (
    <Body>
      <Container>
        <ModalBox>
          <Detail>사진 변경</Detail>
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
        </ModalBox>
        <ModalBox>
          <AvatarBtn onClick={defaultImg}>기본 프로필 사용하기</AvatarBtn>
        </ModalBox>
        <ModalBox>
          <Detail>닉네임 변경</Detail>
          <Input placeholder={isNickname} name="nickname" onChange={handleInput} />
        </ModalBox>
        <ValidMsg>{nicknameMsg}</ValidMsg>
        <ModalBox>
          <Detail>전화번호 변경</Detail>
          <Input placeholder={isMobile} name="mobile" onChange={handleInput} onKeyUp={autoHypen} />
        </ModalBox>
        <ValidMsg>{mobileMsg}</ValidMsg>
        <ModalBox>
          <Detail>비밀번호 변경</Detail>
          <Input name="password" onChange={handleInput} />
        </ModalBox>
        <ValidMsg>{passwordMsg}</ValidMsg>
        <ModalBox>
          <Btn onClick={editUserInfo} disabled={!validEdit} validEdit={validEdit}>
            수정하기
          </Btn>
        </ModalBox>

        <CloseBtn onClick={closeModal}>X</CloseBtn>
      </Container>
    </Body>
  );
}

export default EmailAuthModal;
