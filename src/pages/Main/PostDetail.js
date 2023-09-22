import React, { useState,useEffect } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {useParams} from 'react-router-dom'
import axios from 'axios';
import BottomPrice from "../../components/MainPage/BottomPrice";
import GobackContainer from "../../components/Common/GobackContainer";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import heart from '../../assets/img/heart.svg';
import fillheart from '../../assets/img/fillheart.svg';
import Grades from '../../components/MainPage/Grades';

const CoordinatorIntro = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.056px;
    margin-bottom: 1.89vh;
`;

const ReviewText = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.08px;
    margin-top: 4.26vh;
    margin-bottom: 1.77vh;
`
const PostDetail = (props) => {
  const initialLikedPosts = {};
  const [post,setPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState(initialLikedPosts);
  const styleTag = [];

  let {board_id} = useParams();
  useEffect(() => {
    async function fetchPostDetail() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          "http://localhost:8080/board/show?id="+board_id
        );
        setPost(res.data);
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostDetail();
  }, []);

  styleTag.push(post.style);
  styleTag.push(post.season);
  styleTag.push(post.situation);

  //like function
  const [fillColor, setFillColor] = useState(heart);

  const likeIncrease = (board_id) => {
    setFillColor(fillColor === heart ? fillheart : heart);
    async function fetchLike(){
      try{
          axios.defaults.withCredentials=true;
          const res = await axios.get("http://localhost:8080/user/like?boardId="+board_id);
      }catch(error){
          console.error(error);
      }}
      fetchLike();
  }
  
  // 게시물의 좋아요 상태를 토글하는 함수
  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId], // 현재 상태를 반전시킴
    }));
  };
    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />
          {/* 코디네이터 프로필 */}
          <CoordinatorInfo name={post.nickname} profileImg={post.profile_image} styles={styleTag} snsLink={post.sns_url} linkState={true}/>
          <Grades likeCnt={post.like_count} requestCnt={post.request_count}/>
          <CoordinatorIntro>
            {post.content}
          </CoordinatorIntro>
          <CoordinatorMainImg boardImg={post.board_image}
          likeIncrease={(e) => {
            e.preventDefault(); // 링크 이동을 막음
            likeIncrease(board_id); // 하트 클릭 이벤트 처리
            toggleLike(board_id);
          }} fillColor={likedPosts[board_id] ? fillheart : heart}/>
          {/* Other Codi */}
          {/* <ReviewText>
            {post.nickname} 님의 다른 코디
          </ReviewText> */}
        </f.ScreenComponent>
      </f.SubScreen>
      {localStorage.getItem('mode') == 1 ? null : <BottomPrice/>}
    </f.Totalframe>
    )
}
export default PostDetail;