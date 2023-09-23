import React, { useState,useRef, useEffect } from "react";
import * as f from "../../components/Common/CommonStyle";
import GobackContainer from "../../components/Common/GobackContainer";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navigation from "../../components/Navigation/Navigation";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import Grades from "../../components/MainPage/Grades";
import Heart from "../../assets/img/mypage/heart.svg";
import Hanger from "../../assets/img/mypage/hanger.svg";
import Review from "../../assets/img/mypage/review.svg";
import Outer from "../../assets/img/mypage/outer.svg";

// 지울거. 샘플이미지
import logo from "../../assets/img/logo.svg";
import sample from "../../assets/img/sample.svg";

const EditCotainer=styled.div`
  display: flex;
  margin-bottom: 20px;
  padding: 7px 32px;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex: 1 0 0;
  border-radius: 5px;
  border: 1px solid var(--material-theme-sys-light-outline, #787680);
`
const EditContent=styled.div`
  color: var(--material-theme-sys-light-outline, #787680);
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.056px;
`
const CoordinatorIntro = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.056px;
    margin-bottom: 1.89vh;
`;

const MyPageMenu = styled.div`
  border-top: ${(props) => (props.mycodi)? '1px solid #C8C5D0' : '0px'};
  border-bottom: 1px solid #C8C5D0;
  display: flex;
  height: 5.71vh;
  margin-top: ${(props) => (props.mycodi)? '2.13vh' : '0px'};
  margin-bottom: ${(props)=>props.outer ? '20vh' : '0px' };
  color: #000;
`;
const Icon = styled.img`
  margin: 8px 12px 8px 8px;
`;
const MyPageDescribe = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.056px;
`;

const AccountBtns = styled.div`
  display: flex;
  justify-content: space-between;
`;
const AccountBox = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #C8C5D0;
  margin-right: ${(props)=>props.logout ? '7.5px' : '0px' };
  margin-left: ${(props)=>props.delete ? '7.5px' : '0px' };
  color: ${(props)=>props.delete ? '#690005': 'black'};
`;

const OuterMyPage = () => {
  const [outerMyPage,setOuterMyPage] = useState('');

  // 백엔드 통신
  useEffect(()=>{
    async function fetchMainPage(){
      try{
        axios.defaults.withCredentials=true;
        const res = await axios.get("http://localhost:8080/coordinator/mypage");
        console.log(res.data);
        setOuterMyPage(res.data)
      }catch(error){
        console.error(error);
      }
    }
    fetchMainPage();
  }, [])
  
  const containerRef = useRef(null);

    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />
          {/* 코디네이터 프로필 */}
          <CoordinatorInfo name={outerMyPage.nickname} profileImg={outerMyPage.image_url} styles={outerMyPage.styles}/>
          <Grades likeCnt={outerMyPage.total_like} requestCnt={outerMyPage.request_count} />
          {/* 마이페이지 내용 */}
          <CoordinatorIntro>
          {outerMyPage.content}
          </CoordinatorIntro>
          {/* 프로필 편집 버튼 */}
          <Link to="/editcoprofile">
            <EditCotainer>
              <EditContent>프로필 편집</EditContent>
            </EditCotainer>
          </Link>
          {/* 마이페이지 메뉴 */}
          <Link to="/coallcodies">
            <MyPageMenu mycodi>
              <Icon src={Hanger}/>
              <MyPageDescribe>내가 쓴 글 보기</MyPageDescribe>
            </MyPageMenu>
          </Link>
          <Link to="/coreviews">
            <MyPageMenu>
              <Icon src={Review}/>
              <MyPageDescribe>내가 받은 리뷰 보기</MyPageDescribe>
            </MyPageMenu>
          </Link>
          <Link to={'/outerrankinfo'}>
            <MyPageMenu outer>
              <Icon src={Outer}/>
              <MyPageDescribe>아우터 랭킹별 정찰제</MyPageDescribe>
            </MyPageMenu>
          </Link>
          {/* 로그아웃, 계정삭제 버튼 */}
          <AccountBtns>
              <AccountBox logout>로그아웃</AccountBox>
              <AccountBox delete>계정삭제</AccountBox>
          </AccountBtns>

        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={'mypage'}/>
    </f.Totalframe>
    )
}
export default OuterMyPage;