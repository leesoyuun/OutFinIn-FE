import React, { useState } from "react";
import styled from "styled-components";
import GetStyleBox from "../../components/Join/GetStyleBox";
import XButton from "../../assets/img/X_button.svg";
import axios from 'axios';

const StyledModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 390px;
  height: calc(100vh - 15.04vh);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 1;
`;

const StyledBottomSheet = styled.div`
  z-index: 2;
  position: fixed;
  width: 390px;
  left: 50%;
  transform: translateX(-50%);
  height: 59.24vh;
  white-space: wrap;
  bottom: 15.04vh;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BottomSheetContent = styled.div`
  margin: 28px 21px 0px 21px;
`;
const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Category = styled.div`
  margin-top: 2.96vh;
`;

const Hr = styled.div`
  height: 1px;
  background: #e5e1e6;
  margin: 3.55vh 0px;
`;

const FooterBottomSheet = styled.div`
  padding: 1.6vh 21px 2.72vh 21px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom:0;
  height: 15.04vh;
  width: 390px;
`;

const Clear = styled.div`
  color: #ADAAAF;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.175px;
  cursor: pointer;
  margin-right: 30px;
`

const ApplyCodi = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 253px;
  height: 6.73vh;
  background: #100069;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.175px;
`;

function BottomSheetSingle(props) {
    const [selectedStyles, setSelectedStyles] = useState(null);
    const [selectedSituation, setSelectedSituation] = useState(null);
    const [selectedWeather, setSelectedWeather] = useState(null);
    const [allTags, setAllTags]=useState([]);

    const MakeList = () => {
        const selectedTags = [];
      
        if (selectedStyles) {
          selectedTags.push(selectedStyles);
          props.setSelectedStyles(selectedStyles);
        }
        if (selectedWeather) {
            selectedTags.push(selectedWeather);
            props.setSelectedSituation(selectedSituation);
          }
        if (selectedSituation) {
          selectedTags.push(selectedSituation);
          props.setSelectedWeather(selectedWeather);
        }
      
        if (selectedTags.length > 1) {
          props.addSelectedTag(selectedTags);
          props.openState(false); // 바텀 시트 닫기
          props.sendData(true); // 태그들 띄어주기
        } else {
          // 오류 처리 또는 사용자에게 메시지 표시
        }
      }

    const handleStyleClick = (style, type) => {
        // 선택된 스타일을 업데이트하는 함수
        const updateSelectedStyle = (selectedStyle, newStyle) => {
          if (selectedStyle === newStyle) {
            return null; // 이미 선택된 스타일이면 해제
          }
          return newStyle; // 선택되지 않은 스타일이면 선택
        };

        switch (type) {
          case 'style':
            setSelectedStyles(prevStyles => updateSelectedStyle(prevStyles, style));
            break;
          case 'situation':
            setSelectedSituation(prevSituation => updateSelectedStyle(prevSituation, style));
            break;
          case 'weather':
            setSelectedWeather(prevWeather => updateSelectedStyle(prevWeather, style));
            break;
          default:
            break;
        }
   }  

    const styleCategoryBoxes = props.styleCategories.map((category, index) => (
        <GetStyleBox
        key={index}
        content={category}
        isSelected={selectedStyles === category}
        onClick={() => handleStyleClick(category, 'style')}
        />
    ));

    const situationCategoryBoxes = props.situationCategories.map((category) => (
      <GetStyleBox
        key={category}
        content={category}
        isSelected={selectedSituation === category}
        onClick={() => handleStyleClick(category, 'situation')}
      />
    ));

    const weatherCategoryBoxes = props.weatherCategories.flatMap((categoryRow) =>
      categoryRow.map((category) => (
        <GetStyleBox
          key={category}
          content={category}
          isSelected={selectedWeather === category}
          onClick={() => handleStyleClick(category, 'weather')}
        />
      ))
    );


    const isopenChange = () => {
      props.openState(!props.isOpen)
    }

    return (
    <>
    <StyledModalBackground />
    <StyledBottomSheet>
        <BottomSheetContent>
            <ModalTitle>
                추가하실 스타일<br/>태그를 골라주세요
                <img src={XButton} onClick={isopenChange} />
            </ModalTitle>
            <Category>{styleCategoryBoxes}</Category>
            <Hr/>
            {weatherCategoryBoxes}
            <Hr/>
            {situationCategoryBoxes}
        </BottomSheetContent>
    </StyledBottomSheet>
    <FooterBottomSheet>
      <Clear>선택 해제</Clear>
      <ApplyCodi onClick={MakeList}>코디 확인하기</ApplyCodi>
    </FooterBottomSheet>
    </>
  );
}

export default BottomSheetSingle;
