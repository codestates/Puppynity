/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import io from 'socket.io-client';

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
  /* width: 70vw; */
  /* height: 80vh; */
  padding: 30px 30px;
  border-radius: 5px;
`;

const TextArea = styled.textarea``;
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

  const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
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
        <div>채팅 페이지</div>
        <div>
          {messageList.map((messageContent, index) => (
            <div key={index} className="message">
              <div className="message-info">
                <div className="message-content">
                  {messageContent.message ? <span>{messageContent.message}</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
        <input
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
        <button onClick={sendMessage} type="button">
          send
        </button>
      </Container>
    </Body>
  );
}

export default ChatPage;
