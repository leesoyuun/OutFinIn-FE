import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import GobackContainer from "../../components/Common/GobackContainer";
import Grades from "../../components/MainPage/Grades";
import ReviewBox from "../../components/MainPage/ReviewBox";
import PostMainImg from "../../components/MainPage/PostMainImg";
import logo from "../../assets/img/logo.svg"
import goback from "../../assets/img/goback.svg";

import sample from "../../assets/img/sample.svg";


const Grade = styled.div`
    display: flex;
    text-align: center;
    margin-top: 1.30vh;
    margin-bottom: 1.30vh;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.048px;
    white-space: nowrap;
`
const GradeIcon = styled.img`
    margin-right: 7px;
`;

const GradeBar = styled.div`
    width: 1px;
    height: 1.65vh;
    background: #C4C4C4;
    margin: 0px 7px;
`
const CoordinatorIntro = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.056px;
    margin-bottom: 1.89vh;
`;

const ReviewText = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.08px;
    margin-top: 4.26vh;
    margin-bottom: 1.77vh;
`
const PopularContainer = styled.div`

`
const PostList=styled.div`
  display: flex;
  gap: 16px;  
  cursor: pointer;  
  white-space: nowrap;
  overflow-x : auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar{
    display:none;
  }
`

const OuterProfile = () => {
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const containerRef = useRef(null);

  const handelMouseDownEvent = (e) => {
    setDragging(true);
    if(containerRef.current){
      setClickPoint(e.pageX);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handelMouseMoveEvent = (e) => {
    if(!dragging) return;

    e.preventDefault();

    if(containerRef.current){
      const walk = e.pageX - clickPoint;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  }

    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />
          {/* 코디네이터 프로필 */}
          <CoordinatorInfo name={"웜톤 천재 아우터"}/>
          <Grades/>
          <CoordinatorIntro>
            웜톤천재 아우터가 추천하는 미니멀한 코디에요! 이번 코디는 SPA브랜드만을 이용해서 진행했어요! 나에게 딱 맞는 미니멀 코디가 필요하시다면 채팅 주세요🌰
          </CoordinatorIntro>
          {/* 게시물 목록 */}
          <PopularContainer>
            <PostList ref={containerRef}
              onMouseDown={handelMouseDownEvent}
              onMouseLeave={() => setDragging(false)}
              onMouseUp={() => setDragging(false)}
              onMouseMove={handelMouseMoveEvent}>
              <Link to="/postdetail">
                <PostMainImg image={logo} name={'미니멀코디'} like={12340}/>
              </Link> 
              <Link to="/postdetail">
                <PostMainImg image={sample} name={'비지니스 캐주얼 코디'} like={12340}/>
              </Link>
              <Link to="/postdetail">
                <PostMainImg image={logo} name={'시티보이 코디'} like={12340}/>
              </Link>
            </PostList>
          </PopularContainer>
          {/* Review */}
          <ReviewText>
            웜톤천재 아우터 님의 후기
          </ReviewText>
          <ReviewBox></ReviewBox>

        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
    )
}
export default OuterProfile;