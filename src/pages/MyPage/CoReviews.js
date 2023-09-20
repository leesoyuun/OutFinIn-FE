import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import GobackContainer from "../../components/Common/GobackContainer";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import SmallStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";

// 지울거. 샘플이미지
import logo from "../../assets/img/logo.svg";
import sample from "../../assets/img/sample.svg";

const Category = styled.div`
  margin-top: 15px;
  margin-bottom: 11px;
  color: #000;
  font-family: Noto Sans CJK KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.175px;
`;

const EveryContainer=styled.div`
  display: grid;
  gap: 4px;
  grid-template: repeat(4, 175px)/repeat(2, 175px);
  margin-bottom: 20px;
`

const CategoryContainer=styled.div`
  display: flex;
  jutify-content: space-between;
  gap: 8px;
  margin-top: 10px;
  position: absolute;
  left: 20px;
  bottom: 10px;
`
const PostContainer=styled.div`
  position: relative;
  width: 175px;
  height: 175px;
`

const PostImg=styled.img`
  width: 175px;
  height: 175px;
  border-radius: 18px;
  object-fit: cover;
`

const CoReviews = () => {
  
    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />

          <Category>내가 받은 후기</Category>
          

        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={'mypage'}/>
    </f.Totalframe>
    )
}
export default CoReviews;