import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import * as c from '../../components/Join/CoInfoStyle';
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import GobackContainer from "../../components/Common/GobackContainer";
import BottomSheetSingle from "../../components/MainPage/BottomSheetSingle";
import Navigation from "../../components/Navigation/Navigation";
import addTag from "../../assets/img/addTag.svg";
import addPost from "../../assets/img/addPost.png";
import axios from 'axios';

// 지울거. 샘플이미지
import logo from "../../assets/img/logo.svg";
import sample from "../../assets/img/sample.svg";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";

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

const TextContainer = styled.div`
  width: 100%;
  position:relative; 
  display:inline-block; 
  margin-bottom: 30px;
`
const TextArea=styled.textarea`
  padding: 20px 15px 60px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  border: 1px solid #C8C5D0;
  background: #FFF;
  width: 100%;
  height: 300px;
  resize: none;
  &::placeholder{
  color: #C8C5D0;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.175px;
  }
  &:focus {
    outline: none;
    border: 2px solid #100069;
  }
`
const TitleContainer=styled.input`
  margin: 16px 0;
  padding: 8px 15px;
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--material-theme-sys-light-outline-variant, #C8C5D0);
  color: var(--material-theme-ref-neutral-neutral-70, #ADAAAF);
  font-family: Noto Sans CJK KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
  &::placeholder{
    color: var(--material-theme-ref-neutral-neutral-70, #ADAAAF);
    font-family: Noto Sans CJK KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.2px;
  }
  &:focus {
    outline: none; 
    border-bottom: 2px solid #100069;
    color: #100069;
  }
`

const FinishBotton=styled.button`
  display: flex;
  width: 354px;
  height: 60px;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #100069;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: normal;
  letter-spacing: 0.08px;
  text-decoration: none;
  margin-bottom: 37px;
`

const WriteNewPost = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState('');
  const [selectedWeather, setSelectedWeather] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);     // 선택한 모든 태그들
  const [showTag, setShowTag] = useState(false);
  const [image, setImage] = useState({
    image_file: null,
    preview_URL: null,
  });

    // after filter
    const [styleCategories, setStyleCategories] = useState([
      "미니멀",
      "이지캐주얼",
      "비즈니스캐주얼",
      "아메카지",
      "스트릿",
      "시티보이",
      "원마일웨어",
      "스포티",
      "유니크",
      "레트로",
      "올드머니룩",
      "하객룩",
      "바캉스룩",
      "힙합",
    ]);
  
    const [weatherCategories, setWeatherCategories] = useState([
      ["봄 코디", "여름 코디"],
      ["가을 코디", "겨울 코디"],
    ]);
  
    const [situationCategories, setSituationCategories] = useState([
      "면접", "여행", "캠퍼스", "데이트", "출근", "결혼식"
    ]);
  
    // 사진들 스크롤
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

  // 바텀 시트 열기
  const openBottomSheet = () => {
    setIsOpen(true);
  }

  // // 바텀 시트에서 코디 확인하기 버튼 누르면 +버튼이랑 문장 사라지고 태그들 뜨게
  // const showTags=() => {
  //   setShowTag(true);
  //   setIsOpen(false); // 바텀 시트 닫기
  // }

  // 게시물 사진 업로드
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage({
                image_file: selectedFile,
                preview_URL: e.target.result,
            });
        };

        reader.readAsDataURL(selectedFile);
    }
};    

  // 백엔드 통신
  const handlePostUpload = () => {
    console.log(selectedStyles);
    console.log(selectedSituation);
    console.log(selectedWeather);
    async function fetchData() {
      try {
        const res = await axios.post('http://localhost:8080/board/create',{
          style: String,
          like_count: Number,
          season: String,
          situation: String,
          content: String,
          image_url: String
        });
        if (res.data === 'success') {
            navigate('/postdetail');
        }
      } catch (error) {
          console.error(error);
      }
      fetchData();
    }
  }
    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
            {/* 버튼 부분 */}
            <GobackContainer />
            {/* 태그 */}
            <TagContainer>  
              {showTag? (
                <>
                  {selectedTags?.map((data) => (
                    <BigStyleCategoryBox key={data} content={'#' + data} isSelected={true} />
                  ))}
                  <img src={addTag} onClick={openBottomSheet}/>
                </>
              ):(
                <>
                  <img src={addTag} onClick={openBottomSheet}/>
                  <Content>스타일 코디 태그를 설정해주세요</Content>
                </>
              )}
            </TagContainer>
            {/* 사진 */}
             <input
              type="file"
              id="postImageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <c.Label htmlFor="postImageInput">
              <PhotoContainer>
                <Photo src={image.preview_URL || addPost}></Photo>
              </PhotoContainer>
            </c.Label>

            {/* <PhotoContainer>
              <PostList>
                <Photo src={addPost}></Photo>
              </PostList> */}
              {/* <PostList ref={containerRef}
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
            </PhotoContainer>*/}
            {/* 글 제목 */}
            <TitleContainer placeholder="코디 제목을 작성해주세요" />
            {/* 글 작성 */}
            <TextContainer>
              <TextArea placeholder="아우터님의 코디를 설명해주세요" />
            </TextContainer>

        {/* 글 작성 완료 버튼*/}
        <Link to="../postdetail">
          <FinishBotton onClick={handlePostUpload}>작성 완료</FinishBotton>
        </Link>
        </f.ScreenComponent>
      </f.SubScreen>

      {/* 바텀 시트와 네비게이션 바*/}
      {isOpen ? <BottomSheetSingle openState={setIsOpen} isOpen={isOpen} sendData={setShowTag}
        styleCategories={styleCategories} weatherCategories={weatherCategories} situationCategories={situationCategories}
        selectedStyles={selectedStyles} selectedSituation={selectedSituation} selectedWeather={selectedWeather}
        setSelectedStyles={setSelectedStyles} setSelectedSituation={setSelectedSituation} setSelectedWeather={setSelectedWeather}
        addSelectedTag={setSelectedTags}/> 
        : <Navigation type={'Home'}/> }
    </f.Totalframe>
    )
}
export default WriteNewPost;