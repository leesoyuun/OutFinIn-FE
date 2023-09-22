import React, { useState,useRef } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import GobackContainer from "../../components/Common/GobackContainer";
import smallFind from "../../assets/img/smallFind.svg";
import UserInfo from "../../components/Chat/UserInfo";

const Totalframe=styled.div`
    width: 390px;
    height: 100vh;
    border: 1px solid #eceeef;
    margin: 0 auto;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    position: relative; 
`
const SubScreen=styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 13.5vh);
    &::-webkit-scrollbar{
    display:none;
    }
    backround-color: #F3EFFA;
`
const Header=styled.div`
    position: sticky;
    top: 0;
    padding: 0px 18px;
    display: flex;
    background-color: white;
`
const NameContainer=styled.div`
    margin-top: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #000;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.08px;
`

const ChatScreen=styled.div`
    background-color: #F3EFFA; 
    height: 100%;
`
const DateContainer=styled.div`
    padding: 16px 0; 
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`
const Line=styled.div`
    width: 135px;
    height: 1px;
    background: #ADAAAF;
`

const DateContent=styled.div`
    color: #ADAAAF;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.048px;
`
const InputContainer=styled.div`
    height: 98px;
    width: 390px;
    display: flex;
    gap: 12px;
    padding: 8px 10px 48px 10px;
    align-items: flex-start;
    background: #E5E1E6;
    padding: 8px 10px 48px 10px;
    position: fixed;
    bottom: 0;
`
const GetContent=styled.input`
    padding: 8px 10px 8px 12px;
    display: flex;
    width: 300px;
    border-radius: 25px;
    border: none;
    &::placeholder{
        color: #ADAAAF;
        font-family: Noto Sans CJK KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.056px;
    }
    &:focus{
        outline: none;
        border: 1px solid #100069;
    }
`
const SendButton=styled.button`
    width: 58px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background: #4F44E2;
    color: #FFF;
    font-family: Noto Sans CJK KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.056px;
    border: none;
`

const ChatRoom = () => {
    const [content, setContent] = useState('');

    const handleInput = (e) => {
        setContent(e.target.value);
    }
  return (
    <Totalframe>
      <SubScreen>
        {/* 헤더 */}
        <Header>
          <GobackContainer />
          <NameContainer>뉴비피터</NameContainer>
        </Header>
        {/* 채팅 방 화면 */}
        <ChatScreen>
            {/* 날짜 표시-고정 */}
            <DateContainer>
                <Line></Line>
                <DateContent>2023년 9월 17일</DateContent>
                <Line></Line>
            </DateContainer>
        </ChatScreen>
      </SubScreen>
      {/* 입력 창 띄어주기 */}
      <InputContainer>
        <GetContent placeholder="메세지 보내기" value={content} onChange={handleInput}/>
        <SendButton>전송</SendButton>
      </InputContainer>
    </Totalframe>
  );
};

export default ChatRoom;
