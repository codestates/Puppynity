import React, { useState, JSXElementConstructor } from 'react';
import axios from 'axios';
import styled from 'styled-components';
/* eslint-disable */

export interface IImageProps {
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadFile: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const ImgContainer = styled.div`
  width: 300px;
  height: 400px;
`;

const ImageFill = styled.div`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

function UploadContent({ handleImgChange }: IImageProps): JSX.Element {
  return (
    <div>
      <form>
        <label htmlFor="image">something</label>
        <input accept="image/*" onChange={handleImgChange} id="upload-img" type="file" multiple />
        <ImgContainer></ImgContainer>
        <button type="button">Click to upload image</button>
      </form>
    </div>
  );
}

export default UploadContent;
