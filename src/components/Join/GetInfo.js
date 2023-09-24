import React, { useState } from "react";
import styled from 'styled-components';
import * as f from '../Common/CommonStyle'
const InputInfos = styled.div`
    display: flex;
    justify-content: space-between;
    width: 157px;
    color: ${(props) => props.nowinput ? '#100069' : '#E4E1EC'};
    border-bottom: ${(props)=>props.nowinput? '2px':'1px'} solid ${(props)=>props.nowinput? '#100069':'#C8C5D0'};
    padding: 10px 0px 10px 8px;
    font-size: 14px;
    font-weight: 700;
    margin-right: ${(props)=> (props.infoName == '키' ? '20px' : '0px')};
    margin-top: ${(props)=> (props.infoName == '키' || props.infoName == '체중' ? '17px' : '0px')};
    flex-grow: 1; 
    cursor: pointer;
`;

const InputInfo = styled.input`
    width: ${(props)=> props.infoName==='SNS 링크'? '275px' : '100px'};
    border: none;
    outline: none;
    text-align: right;
    color: #000;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        display: none;
    }
    cursor: pointer;
`;

const Unit = styled.div`
    color: ${(props) => props.active ? '#100069' : '#ADAAAF'};
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
`;

const InputUnit = styled.div`
    display:flex;
`;
const GetInfo = (props) => {
    return(
        <InputInfos infoName={props.infoName} ref={props.check} onClick={props.click} nowinput={props.nowinput}>{props.infoName}
            <InputUnit>
                <InputInfo value={props.inputValue} onChange={props.changeValue} infoName={props.infoName}></InputInfo>
                <Unit nowinput={props.nowinput} active={props.inputValue !== ""}>{props.unit}</Unit>
            </InputUnit>
        </InputInfos>
    )
}
export default GetInfo;