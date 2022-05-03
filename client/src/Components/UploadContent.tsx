import React, { ReactText, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { uploadContent } from '../Redux/contentSlice';

/* eslint-disable */

// export interface IImageProps {
//   handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   uploadFile: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
// }
const InputStyle = styled.input`
  padding: 10px;
  width: auto;
  height: auto;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 300px;
  height: 400px;
  position: cemter;
  // display: center;
  border-width: '10px';
  border-color: orange;
`;

const ImageFill = styled.img`
  width: 400px;
  height: 300px;
  object-fit: fill;
  margin: 20px;
  border-radius: 10%;
  padding: 10px;
`;

const Textarea = styled.textarea`
  width: 400px;
  height: 200px;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 30%;
  background-color: peachpuff;
  color: black;
`;

// 컨텐츠를 업로드하려면 필요한 건?
// title, image content, text content

// 그 외 필요한 거: 여기서 로그인된 유저정보를 받아와야한다.

function UploadContent(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [file, setFile] = useState<File>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // console.log('title change' + e.target.value);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);

  const formData = new FormData();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //const files = e.target.files;

    const reader = new FileReader();
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]!);
    formData.append('file', e.target.files[0]); //formdata에 선택된 파일을 담아준다. 근데 얘 필요없을수도..?

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const previewImg: string = reader.result as string;
      if (previewImg) {
        setFileUrl(previewImg);
      }
    };
  };

  // const submit = () => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  // };

  // const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
  //   // slic로 올라가야함
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('image', file);
  //   }
  // };

  const handleContentChange = () => {
    if (title && text) {
      // 사진은 없어도 게시물을 올려도되기때문
      dispatch(
        uploadContent({
          id: nanoid(),
          title,
          file,
          text,
          // createdAt,
        }),
      );
      console.log(file); // 성공적으로 파일을 불러온다.
      setTitle(''); //로컬 상태들은 다시 빈 값으로 돌려준다.
      setText('');
      setFile(undefined);
    }
  };

  const dispatch = useDispatch();

  const canUpload = Boolean(title) && Boolean(text); // title과 게시물 내용이 있는경우 T를 반환해준다. 이걸로 버튼에 삼항연산자를 걸어준다.

  return (
    <div>
      <h2> 게시물을 올려보세요! </h2>
      <form>
        <InputStyle
          onChange={handleTitleChange}
          type="input"
          className="title-input"
          placeholder="제목을 입력해주세요"
        ></InputStyle>
        <br />
        <label htmlFor="image"></label>
        <br />
        <InputStyle onChange={handleFileChange} accept="image/*" id="upload-img" type="file" multiple />

        <ImgContainer>
          <ImageFill
            src={fileUrl || 'https://vernixgroup.com/wp-content/themes/consultix/images/no-image-found-360x250.png'}
            alt="conditional"
          />
        </ImgContainer>
        <Textarea onChange={handleTextChange} className="text-content" />
        <br />
        <Button onClick={handleContentChange} type="button" disabled={!canUpload}>
          업로드!!
        </Button>
      </form>
    </div>
  );
}

export default UploadContent;
