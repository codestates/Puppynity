/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import io from 'socket.io-client';
import axios from 'axios';
import puppy1 from '../Assets/puppy1.jpeg';
import puppy2 from '../Assets/puppy2.jpeg';
import { setIsLogin, setUserPk, setLoginType, setKakaoNickname, setNickname } from '../Redux/authSlice';

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

// 채팅방 메시지 가장작은 단위
const MyMessage = styled.div`
  color: #fff;
  background-color: #ffa224;
  height: 20px;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;
const SomeoneMessage = styled.div`
  color: #000;
  background-color: #ecf0f1;
  height: 20px;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const ViewArea = styled.div`
  background-color: #fff;
  width: 450px;
  height: calc(95vh - 116px);
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

interface IMessage {
  someone: boolean;
}

const Message = styled.div<IMessage>`
  /* border: solid 1px #aaa; */
  width: 400px;
  display: flex;
  justify-content: ${(props) => (props.someone === true ? 'flex-end' : 'flex-start')};
  /* height: 58px; */
`;

const SomeoneNickname = styled.div`
  margin: 5px;
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

export interface IMessageList {
  id: number;
  chatroomId: number;
  username: string | null;
  writerId: string | null;
  message: string | null;
  time: string | null;
}

function ChatPage() {
  const [currentMessage, setcurrentMessage] = useState('');
  // input에 onchange될때마다 바뀌게 되어있음
  const [messageList, setMessageList] = React.useState<IMessageList[]>([]);
  const [isMyNickName, setIsMyNickName] = useState('');
  const loginState = useSelector((state: any) => state);
  console.log(loginState);

  const { userPk, loginType, nickname } = loginState.auth;
  console.log(loginType);
  console.log(userPk);

  axios({
    url: `${process.env.REACT_APP_BASE_URL}/users/:${userPk}`,
    method: 'get',
    headers: { loginType },
  })
    .then((res) => {
      console.log(res);
      setIsMyNickName(res.data.userInfo.nickname);
    })
    .catch((err) => {
      console.log(err);
    });

  // 사용자 지정 namespace로 접속한다.
  const socket = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
    transports: ['websocket'],
    withCredentials: true,
  });

  // 메시지 하나가 가지고있을 정보 = 렌더링시에 채팅내용들을 맵핑해주는 useEffect
  useEffect(() => {
    const messages = messageList.map((chatting: any) => ({
      id: userPk,
      chatroomId: 1,
      username: nickname,
      writerId: chatting.writerId,
      message: chatting.message,
      time: chatting.time,
    }));
    setMessageList([...messages]);
    socket.emit('join_room', {
      room: 1,
      nickname,
      userPk,
    });
    console.log(messages);
    // socket.emit('join_room', 1);
  }, []);

  //! 1번 식
  // 메시지 전송 메서드 => 전송버튼 누를 시 동작하는 함수
  const sendMessage = () => {
    if (currentMessage !== '') {
      const minutes = new Date(Date.now()).getMinutes();
      const messageData = {
        chatroomId: 1,
        userId: userPk,
        username: nickname,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${minutes}`,
      };
      socket.emit('message', messageData);
      // setMessageList((list: any) => [...list, messageData]);
      console.log(messageData);
      setcurrentMessage('');
    }
  };
  useEffect(() => {
    socket.on('receive_message', (res: any) => {
      console.log(res);
      const resData = {
        id: 1,
        chatroomId: 1,
        username: res.username,
        writerId: res.userId,
        message: res.message,
        time: res.time,
      };
      setMessageList((list: any) => [resData, ...list]);
    });
  }, []);

  const time = `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`;

  const localAvatar = localStorage.getItem('avatar');

  return (
    <Body>
      <Container>
        <LeftSide>
          <MyContainer>
            <MyAvatar
              src={
                localAvatar === 'null' || localAvatar === null || localAvatar === undefined || localAvatar === ''
                  ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                  : `${process.env.REACT_APP_BASE_URL}/uploads/${localAvatar}`
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
            {messageList.map((messageContent, index) => (
              <Message key={index} className="message" someone={messageContent.writerId === userPk}>
                {messageContent.message && messageContent.writerId !== userPk ? (
                  <SomeoneNickname>{messageContent.username}</SomeoneNickname>
                ) : null}
                {messageContent.message && messageContent.writerId === userPk ? (
                  <MyMessage>{messageContent.message}</MyMessage>
                ) : null}
                {messageContent.message && messageContent.writerId !== userPk ? (
                  <SomeoneMessage>{messageContent.message}</SomeoneMessage>
                ) : null}
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
