import React from 'react';
import styled from 'styled-components';
import * as f from '../Common/CommonStyle';

const UserInfos=styled.div`
    display: flex;
    flex-direction: column;
    gap: 13px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #C8C5D0;
    cursor: pointer;
`
const InfoContainer=styled.div`
    display: flex;
`
const UserName=styled.div`
    width: 190px;
    margin-right: 5px;
    color: #000;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.08px;
`
const Info=styled.div`
    display: flex;
    gap: 3px;
`

const InfoDetail=styled.div`
    color: #000;
    text-align: right;
    font-family: Noto Sans KR;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.06px;
`

const Content=styled.div`
    color: #000;
    overflow: hidden;
    white-space: nowrap; /* 텍스트를 한 줄로 표시 */
    text-overflow: ellipsis;
    font-family: Noto Sans KR;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.048px;
`

const UserInfo = (props) => {

    return(
        <UserInfos>
            <InfoContainer>
                <UserName>{props.name}</UserName>
                <Info>
                    <InfoDetail>{props.height}cm/ </InfoDetail>
                    <InfoDetail>{props.weight}kg/ </InfoDetail>
                    <InfoDetail>{props.bodyshape}</InfoDetail>
                </Info>
            </InfoContainer>
            <Content>{props.content}</Content>
        </UserInfos>
    )
}
export default UserInfo;