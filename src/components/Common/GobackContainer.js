import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import goback from "../../assets/img/goback.svg";

const Container=styled.div`
  margin-top: 36px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
`
const Img=styled.img`
    width: 9.5px;
    height: 18px;
    flex-shrink: 0;
`

const GobackContainer = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); 
    };

    return(
        <Container>
            <Img src={goback} onClick={handleGoBack} />
        </Container>
    );
;}

export default GobackContainer;