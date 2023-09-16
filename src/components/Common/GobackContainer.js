import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import goback from "../../assets/img/goback.svg";

const Container=styled.div`
  margin-top:36px;
  margin-bottom: 8px;
`

const GobackContainer = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); 
    };

    return(
        <Container>
            <img src={goback} onClick={handleGoBack} />
        </Container>
    );
;}

export default GobackContainer;