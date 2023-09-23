import React from "react";
import styled from "styled-components";

const ChatBubbleContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: ${props => props.isCurrentUser ? "flex-end" : "flex-start"};
  margin-right: ${props => props.isCurrentUser ? '8.49px' : '0'}; 
  margin-left: ${props => props.isCurrentUser ? "0" : '8.49px'};
  margin-bottom: 16px;
  width: 390px-8.49px; 
  z-index: 1;
`;

const ChatBubbleContent = styled.div`
  background-color: ${props => props.isCurrentUser ? "#100069" : "#fff"}; 
  color: ${props => props.isCurrentUser ? "#fff" : "#000"}; 
  border-radius: 8px;
  padding: 12px 16px;
  max-width: 65%;
  word-wrap: break-word;
  font-family: Noto Sans KR;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.048px;
`;

const UserName = styled.div`
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 6px;
  color: #000;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.07px;
`;

const ChatBubble = (props) => {
  return (
    <ChatBubbleContainer isCurrentUser={props.isCurrentUser}>
      {props.name? (
        <UserName>
          {props.name}
        </UserName>
      ) : null }
      <ChatBubbleContent isCurrentUser={props.isCurrentUser}>
        {props.message}
      </ChatBubbleContent>
    </ChatBubbleContainer>
  );
};

export default ChatBubble;
