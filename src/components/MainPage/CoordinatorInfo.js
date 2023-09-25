import React, { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import styled from 'styled-components';
import * as f from '../Common/CommonStyle';
import SmallStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";
import rank1 from '../../assets/img/Rank/rank1.svg';
import instagram from '../../assets/img/instagram.svg';
import hanger from "../../assets/img/hanger.svg";
import fillMinHeart from "../../assets/img/fillMinHeart.svg";

const CoordinatorInfos = styled.div`
    display: flex;
    margin-top: 2.36vh;
    margin-bottom: 1.06vh;
    color: #000;
    cursor: pointer;
`;

const CoImgContainer=styled.div`
    width: 61px;
    height: 61px;
`
const CoordinatorImg = styled.img`
    width: 61px;
    height: 61px;
    border-radius: 50%;
    object-fit: cover; /* 이미지를 커버 모드로 설정 */
`;

const CoordinatorSubInfo = styled.div`
    margin-left:14px;
    width: 275px;
`;

const CoordinatorGrade = styled.div`
    width: 275px;
    display: flex;
    align-itmes: center;
    white-space: nowrap;
    position: relative;
`

const Rank = styled.img`
    margin-right: 4px;
`;

const CoordinatorName = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.08px;
    margin-right: 8px;
`;

const Instagram = styled.div`
    display: flex;
    padding: 4px 12px;
    color: #4F44E2;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 5px;
    border: 1px solid #C4C0FF;
    margin-left: 12px;
`;

const InstagramImg = styled.img`
    margin-right: 8px;
`;

const CategoryBox = styled.div`
    display: flex;
    margin-top: 1.18vh;
    margin-bottom: 1vh;
`
const Grade = styled.div`
    position: absolute;
    right:0;
    display: flex;
    align-items: center;
    gap: 4px;   
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.048px;
    white-space: nowrap;
`
const GradeSection=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const GradeIcon = styled.img`
    margin-right: 5px;
`;

const GradeBar = styled.div`
    width: 1px;
    height: 1.65vh;
    background: #C4C4C4;
    margin: 0px 15px;
`
const HashTag = styled.div`
  cursor: pointer;  
  white-space: nowrap;
  overflow-x : auto;
  -webkit-overflow-scrolling: touch;
  margin-right:18px;
  &::-webkit-scrollbar{
    display:none;
  }
`;

const CoordinatorInfo = (props) => {
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
        <CoordinatorInfos>
            <CoImgContainer>
                <CoordinatorImg src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+props.profileImg}></CoordinatorImg>
            </CoImgContainer>
            <CoordinatorSubInfo>
                <CoordinatorGrade>
                    <Rank src={rank1}/>
                    <CoordinatorName>{props.name}</CoordinatorName>
                    {props.linkState? ( <Link to={'//'+props.snsLink} target='_blank'>
                        <Instagram>
                            <InstagramImg src={instagram}/>
                            Instagram
                        </Instagram>
                    </Link>): (
                        <Grade>
                            <GradeSection>
                                <GradeIcon src={hanger}/>
                                의뢰횟수 {props.requestCnt}번
                            </GradeSection>
                            <GradeSection>
                                <GradeIcon src={fillMinHeart}/>
                                {props.likeCnt}
                            </GradeSection>
                        </Grade>
                    )}
                    </CoordinatorGrade>
                <CategoryBox>
                <HashTag ref={containerRef}
                    onMouseDown={handelMouseDownEvent}
                    onMouseLeave={() => setDragging(false)}
                    onMouseUp={() => setDragging(false)}
                    onMouseMove={handelMouseMoveEvent}>
                    {props.styles?.map((style)=>(
                        <SmallStyleCategoryBox content={style}></SmallStyleCategoryBox>
                    ))}
                </HashTag>
                </CategoryBox>
            </CoordinatorSubInfo>
        </CoordinatorInfos>
    )
}
export default CoordinatorInfo;