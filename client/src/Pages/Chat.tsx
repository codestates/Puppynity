/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import axios from 'axios';
import puppy1 from '../Assets/puppy1.jpeg';
import puppy2 from '../Assets/puppy2.jpeg';

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
  /* background-color: #ecf0f1; */
  font-family: GmarketMedium;
`;

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  width: 701px;
  min-width: 701px;
  height: 95vh;
  /* padding: 30px 30px; */
  border-radius: 5px;
  justify-content: center;
  border: 1px solid #aaa;
`;

const LeftSide = styled.div`
  height: 95vh;
  width: 250px;
  border-right: 1px solid #aaa;
`;

const RightSide = styled.div`
  height: 95vh;
  width: 450px;
`;

const ViewArea = styled.div`
  background-color: #fff;
  width: 450px;
  height: calc(95vh - 116px);
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const Message = styled.div`
  border: solid 1px #aaa;
  width: 400px;
  /* height: 58px; */
`;

const MessageInfo = styled.div`
  color: lightcoral;
  display: flex;
  justify-content: right;
`;

const MessageContents = styled.div`
  color: #fff;
  background-color: #ffa224;
  height: 20px;
  /* width: 100px; */
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
`;

const Lower = styled.div`
  display: flex;
  height: 58px;
  /* background-color: blue; */
  /* padding: 20px; */
  justify-content: center;
  align-items: center;
`;

const InputArea = styled.input`
  border-radius: 30px;
  height: 10px;
  width: 280px;
  padding: 15px;
  outline: none;
  border: 1px solid #aaa;
`;

const Btn = styled.button`
  margin-left: 10px;
  height: 10px;
  width: 10px;
  padding: 15px;
  border-radius: 30px;
  border: 1px solid #aaa;
  background: none;
  background-color: #aaa;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #fff;
  }
`;

const ChatRoom = styled.div`
  height: calc(95vh - 58px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const ChatRoomNo = styled.div`
  /* background-color: lightpink; */
  border-bottom: 1px solid #aaa;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 50px;
  border: 1px solid #aaa;
`;

const Users = styled.div``;

const LastDate = styled.div`
  color: #aaa;
  /* background-color: blue; */
  display: flex;
  justify-content: left;
  font-size: 14px;
`;

// 리스트 유저 닉네임
const NickName = styled.div`
  font-size: 14px;
  color: #828282;
  font-weight: 500;
`;

// 채팅방 메시지 가장작은 단위
const MessageLast = styled.div``;

// 선택된 유저
const PickUser = styled.div`
  border-bottom: 1px solid #aaa;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const PickUserNickName = styled.div`
  color: #ffa224;
  padding: 20px;
  font-size: 14px;
  font-weight: 700;
`;

const PickUserAvatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 26px;
  border: 1px solid #aaa;
  margin-left: 30px;
`;

// 내 닉네임
const MyNickName = styled.div`
  padding: 20px;
  font-size: 14px;
  font-weight: 700;
  color: #ffa224;
`;

const MyAvatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 26px;
  border: 1px solid #aaa;
`;

const MyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #aaa;
  align-items: center;
  justify-content: center;
`;
// ==========================여기까지 스타일===========================

function ChatPage() {
  const [currentMessage, setcurrentMessage] = useState('');
  // input에 onchange될때마다 바뀌게 되어있음
  const [messageList, setMessageList] = useState([
    {
      id: 1,
      chatroomId: 1,
      username: '',
      writerId: '',
      message: '',
      time: '',
    },
  ]);
  const [isMyNickName, setIsMyNickName] = useState('');
  const userPk = localStorage.getItem('userPk');

  //! ===============================================================
  // 유저정보 get 요청하기 //! 이부분 get요청 말고 상태에서 닉네임 가져오는걸로 바꿀것
  axios({
    url: `http://localhost:4000/users/:${userPk}`,
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, loginType: localStorage.getItem('loginType') },
  }).then((res) => {
    setIsMyNickName(res.data.userInfo.nickname);
  });
  //! ===============================================================

  // 사용자 지정 namespace로 접속한다.
  const socket = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
    transports: ['websocket'],
    withCredentials: true,
  });

  // 메시지 하나가 가지고있을 정보 = 렌더링시에 채팅내용들을 맵핑해주는 useEffect
  useEffect(() => {
    const messages = messageList.map((chatting: any) => ({
      id: 1,
      chatroomId: 1,
      username: chatting.username,
      writerId: chatting.writerId,
      message: chatting.message,
      time: chatting.time,
    }));
    setMessageList([...messages]);
    socket.emit('join_room', {
      room: 1,
      author: 'username',
      userId: 'userInfo',
    });
    console.log(messageList);
    // socket.emit('join_room', 1);
  }, []);

  //! 1번 식
  // 메시지 전송 메서드 => 전송버튼 누를 시 동작하는 함수
  const sendMessage = () => {
    if (currentMessage !== '') {
      const minutes = new Date(Date.now()).getMinutes();
      const messageData = {
        chatroomId: 1,
        userPk: localStorage.getItem('userPk'),
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${minutes}`,
      };
      socket.emit('message', messageData);
      setMessageList((list: any) => [...list, messageData]);
      console.log(messageData);
      setcurrentMessage('');
    }
  };
  useEffect(() => {
    socket.on('receive_message', (res) => {
      // console.log(res);
      // console.log(messageList);
      setMessageList((list) => [...list, res]);
    });
  }, []);

  //! 2번 식
  // const sendMessage = async () => {
  //   if (currentMessage !== '') {
  //     // const minutes = new Date(Date.now()).getMinutes();
  //     const messageData = {
  //       id: 1,
  //       message: currentMessage,
  //       // time: ${new Date(Date.now()).getHours()}:${minutes}, //createdAt에서 시분만 나누기
  //     };
  //     await socket.emit('send_message', messageData);
  //     setMessageList((list: any) => [...list, messageData]);
  //     setcurrentMessage('');
  //   }
  // };
  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setMessageList((list) => [...list, data]);
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on('message', (data) => {
  //     setMessageList((list) => [...list, data]);
  //   });
  // }, []);

  const time = `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`;

  const localAvatar = localStorage.getItem('avatar');

  // 1. 메시지는 두가지로 나눔 내가보낸거, 남이보낸거
  // 2.

  return (
    <Body>
      <Container>
        <LeftSide>
          <MyContainer>
            <MyAvatar
              src={
                localAvatar === 'null' || localAvatar === null || localAvatar === undefined || localAvatar === ''
                  ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                  : `http://localhost:4000/uploads/${localAvatar}`
              }
            />
            <MyNickName>{isMyNickName}</MyNickName>
          </MyContainer>
          <ChatRoom>
            <ChatRoomNo>
              <AvatarImg src={puppy1} />
              <Users>
                <NickName>퍼피톡 채널1</NickName>
                <LastDate>{time}</LastDate>
              </Users>
            </ChatRoomNo>

            {/* <ChatRoomNo>
              <AvatarImg src={puppy2} />
              <Users>
                <NickName>퍼피룸2</NickName>
                <LastDate>{time}</LastDate>
              </Users>
            </ChatRoomNo> */}
          </ChatRoom>
        </LeftSide>
        <RightSide>
          <PickUser>
            <PickUserAvatar src={puppy1} />
            <PickUserNickName>퍼피룸1</PickUserNickName>
          </PickUser>
          <ViewArea>
            {messageList.reverse().map((messageContent, index) => (
              <Message key={index} className="message">
                <MessageInfo className="message-info">
                  <MessageContents className="message-content">
                    {messageContent.message ? <MessageLast>{messageContent.message}</MessageLast> : null}
                  </MessageContents>
                </MessageInfo>
              </Message>
            ))}
          </ViewArea>
          <Lower>
            <InputArea
              className="messageInput"
              type="text"
              value={currentMessage}
              placeholder="메시지 입력해주세요"
              onChange={(event) => {
                setcurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === 'Enter' && sendMessage();
              }}
            />
            <Btn onClick={sendMessage} type="button" />
          </Lower>
        </RightSide>
      </Container>
    </Body>
  );
}

export default ChatPage;
