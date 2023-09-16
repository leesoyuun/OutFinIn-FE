import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import * as c from '../../components/Join/CoInfoStyle';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import GobackContainer from "../../components/Common/GobackContainer";
import PostMainImg from "../../components/MainPage/PostMainImg";
import Navigation from "../../components/Navigation/Navigation";
import addTag from "../../assets/img/addTag.svg";

// 지울거. 샘플이미지
import logo from "../../assets/img/logo.svg";
import sample from "../../assets/img/sample.svg";

const TagContainer=styled.div`
  margin: 20px 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Content=styled.div`
  color: var(--material-theme-ref-neutral-neutral-70, #ADAAAF);
  font-family: Noto Sans CJK KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.175px;
`

const PhotoContainer=styled.div`
  position:relative;
  display: flex;
  gap: 14px;
`

const Photo=styled.img`
  position:relative;
  width: 200px;
  height: 221px;
  border-radius: 18px;
  object-fit: cover;
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

const WriteNewPost = () => {
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
            {/* 버튼 부분 */}
            <GobackContainer />
            {/* 태그 */}
            <TagContainer>     {/* 여기수정하기. 버튼 눌렀을 때, 바텀시트 뜨고 선택한 태그들 뜨게 */}
              <img src={addTag} onClcick/>
              <Content>스타일 코디 태그를 설정해주세요</Content>
            </TagContainer>
            {/* 사진 */}
            <PhotoContainer>
              <PostList ref={containerRef}
                onMouseDown={handelMouseDownEvent}
                onMouseLeave={() => setDragging(false)}
                onMouseUp={() => setDragging(false)}
                onMouseMove={handelMouseMoveEvent}>
                <Photo src={logo}></Photo>
                <Photo src={sample}></Photo>
                <Photo src={logo}></Photo>
                <Photo src={sample}></Photo>
                <Photo src={logo}></Photo>
              </PostList>
            </PhotoContainer>

            {/* 글 작성 */}
            <c.TextContainer>
              <c.TextArea placeholder="아우터님의 코디를 설명해주세요" />
            </c.TextContainer>
            {/* 글 작성 완료 버튼*/}


        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
    )
}
export default WriteNewPost;