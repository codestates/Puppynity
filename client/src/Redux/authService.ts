// this is file for doing https request work and setting the data in local storage!

import axios from 'axios';

export interface IUserData {
  username: string;
  email: string;
  password: string;
  name: string;
}

// Register user
const register = async (userData: IUserData) => {
  //   const response = await axios.post(API_URL, userData);
  //   if (response.data) {
  //     // 받아온 데이터가 있으면, 로컬 스토리지에 string타입으로 변환 후 저장. 토큰도 포함되어잇음
  //     localStorage.setItem('user', JSON.stringify(response.data));
  //   }
  //   return response.data;
  return axios.post('https://localhost3000/auth/signup', {
    userData,
  });
};

const login = async (email: string, password: string) => {
  //   const response = await axios.post(`https://localhost4000/auth/login`, userData);
  //   if (response.data) {
  //     localStorage.setItem('user', JSON.stringify(response.data));
  //   }
  //   return response.data;
  return axios
    .post('https://localhost4000/auth/login', {
      email,
      password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data)); // 로컬 스토리지에 토큰 저장
      }
      return res.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = { register, login, logout };

export default authService;
