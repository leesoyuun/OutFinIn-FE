import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import goback from "../../assets/img/goback.svg";

const Container=styled.div`
  margin-top:36px;
  margin-bottom: 8px;
  margin-left: ${(props)=>props.like ? '18px' : '0px'}
`

const GobackContainer = (props) => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); 
    };

    return(
        <Container like={props.like}>
            <img src={goback} onClick={handleGoBack} />
        </Container>
    );
;}

export default GobackContainer;