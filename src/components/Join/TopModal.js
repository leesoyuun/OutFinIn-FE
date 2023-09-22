import react from "react";
import styled from 'styled-components';

const TotalModal = styled.div`
    visibility: ${(props)=>props.show ? 'visible' : 'hidden'};  
    position: relative;
    top: 5vh;
    border-radius: 25px;
    padding: 21px 28px;
    background: #FFFBFF;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

const ModalText = styled.div`
    text-align: center;
    color: #787680;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.014px;
`;
const TopModal = (props) => {
    return(
        <TotalModal show={props.show}>
            <ModalText>
            이메일이 성공적으로 보내졌습니다.
            </ModalText>
        </TotalModal>

    );

}
export default TopModal;