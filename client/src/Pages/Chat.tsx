/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import io from 'socket.io-client';
import axios from 'axios';

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
  background-color: lightblue;
`;

const Message = styled.div`
  color: grey;
`;

const MessageInfo = styled.div`
  color: lightcoral;
`;

const MessageContents = styled.div`
  color: lightgoldenrodyellow;
`;

const InputArea = styled.input``;

const Btn = styled.button``;

const MyNickName = styled.div`
  padding: 10px;
  font-size: 20px;
  color: #ffa224;
  border-bottom: 1px solid #aaa;
`;

const ChatRoom = styled.div`
  background-color: lightgreen;
  height: 95vh-241px;
`;

const ChatRoomNo = styled.div``;
// ==========================여기까지 스타일===========================

function ChatPage() {
  const [currentMessage, setcurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([
    {
      id: 1,
      // chatroomId: '',
      // username: '',
      // writerId: '',
      message: '',
      // time: '',
    },
  ]);
  const [isMyNickName, setIsMyNickName] = useState('');

  // 유저정보 get 요청하기
  const userPk = localStorage.getItem('userPk');
  axios({
    url: `http://localhost:4000/users/:${userPk}`,
    method: 'get',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }).then((res) => {
    setIsMyNickName(res.data.userInfo.nickname);
  });

  const socket = io('http://localhost:4000', {
    transports: ['websocket'],
    withCredentials: true,
  });

  useEffect(() => {
    const messages = messageList.map((chatting) => ({
      id: 1,
      // chatroomId: chatting.chatroomId,
      // username: chatting.username,
      // writerId: chatting.writerId,
      message: chatting.message,
      // time: chatting.time,
    }));
    setMessageList([...messages]);
    socket.emit('join_room', 1);
  }, []);
  // 메시지 전송 메서드
  const sendMessage = async () => {
    if (currentMessage !== '') {
      // const minutes = new Date(Date.now()).getMinutes();
      const messageData = {
        id: 1,
        message: currentMessage,
        // time: `${new Date(Date.now()).getHours()}:${minutes}`, //createdAt에서 시분만 나누기
      };
      await socket.emit('message', messageData);
      setMessageList((list) => [...list, messageData]);
      setcurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  return (
    <Body>
      <Container>
        <LeftSide>
          <MyNickName>{isMyNickName}</MyNickName>
          <ChatRoom>
            <ChatRoomNo>김갑둘</ChatRoomNo>
            <ChatRoomNo>조철황</ChatRoomNo>
          </ChatRoom>
        </LeftSide>
        <RightSide>
          <ViewArea>
            {messageList.map((messageContent, index) => (
              <Message key={index} className="message">
                더큰 메시지
                <MessageInfo className="message-info">
                  내가 보낸 메시지
                  <MessageContents className="message-content">
                    {messageContent.message ? <span>{messageContent.message}</span> : null}
                  </MessageContents>
                </MessageInfo>
              </Message>
            ))}
          </ViewArea>
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
          <Btn onClick={sendMessage} type="button">
            send
          </Btn>
        </RightSide>
      </Container>
    </Body>
  );
}

export default ChatPage;
