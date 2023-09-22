import { useState,useRef, useEffect } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import AWS from 'aws-sdk'
import axios from "axios";
import * as f from '../../components/Common/CommonStyle';
import * as c from '../../components/Join/CoInfoStyle';
import GobackContainer from "../../components/Common/GobackContainer";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import ButtonBottom from '../../components/Common/ButtonBottom';
import GetInfo from "../../components/Join/GetInfo";
import profileCircle from '../../assets/img/profileCircle.svg';
import camera from '../../assets/img/camera.svg';
import {AiOutlineCheckCircle} from 'react-icons/ai';

const Male = styled.div`
    margin-left: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85px;
    height: 38px;
    background-color: ${(props) => (props.selected ? '#100069' : '#fff')};
    border: 1px solid #C8C5D0;
    border-right: 0px solid #fff;
    border-radius: 10px 0px 0px 11px;
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
`

const Female = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85px;
    height: 38px;
    background-color: ${(props) => (props.selected ? '#100069' : '#fff')};
    border: 1px solid #C8C5D0;
    border-left: 0px solid #fff;
    border-radius: 0px 10px 11px 0px;
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
`

const HashTag = styled.div`
  margin-bottom: 27px;
  cursor: pointer;  
  white-space: nowrap;
  overflow-x : auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar{
    display:none;
  }
`

const InputContaier=styled.div`
    display: flex;
    align-items: center;
`

const EditCoProfile = () => {
    const navigate = useNavigate();
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [inputCount, setInputCount] = useState(0);
    const maxInputLength = 20;
    const [nickname, setNickname] = useState("");
    const [sns_url, setSns_url] = useState("");
    const [image_url, setImage_url] = useState("");
    const [content, setContent] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [dragging, setDragging] = useState(false);
    const [clickPoint, setClickPoint] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);
    const [checkNickname, setCheckNickname] = useState("");
    const nicknameRef = useRef(null);
    const [pass, setPass] = useState(false);
    const [styles, setStyles] = useState(['미니멀', '봄 코디']);

    // 사진 네이밍을 위한 포매팅
    const today = new Date();
    const year = today.getFullYear(); // 연도
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 1을 더하고 두 자리로 포맷팅)
    const day = String(today.getDate()).padStart(2, '0'); // 일 (두 자리로 포맷팅)
    const hours = String(today.getHours()).padStart(2, '0'); // 시간 (두 자리로 포맷팅)
    const minutes = String(today.getMinutes()).padStart(2, '0'); // 분 (두 자리로 포맷팅)
    const seconds = String(today.getSeconds()).padStart(2, '0'); // 초 (두 자리로 포맷팅)
    const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
    const [photoName,setPhotoName] = useState('');

    // 코디네이터 프로필 편집 초기 정보 지정 상태
    const [initialInfo,setInitialInfo] = useState({
        nickname: "",
        height: "",
        weight: "",
        gender: "",
        shape: "",
        styles: [],
    });

    // 코디네이터 프로필 편집 들어가면 정보 보내기
    useEffect(() => {
        async function fetchShowData() {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get("http://localhost:8080/coordinator/info");
                setInitialInfo(res.data);
                // 여기서 받아온 정보를 해당 입력창에 설정해줄 수 있습니다.
                setNickname(res.data.nickname);
                setHeight(res.data.height);
                setWeight(res.data.weight);
                setImage_url("https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+res.data.image_url);
                setSns_url(res.data.sns_url);
                setContent(res.data.content);
                setPhotoName(res.data.nickname+formattedDate+'jpg');
                // 성별 설정
                if (res.data.gender === 'MALE') {
                    setMale(true);
                } else if (res.data.gender === 'FEMALE') {
                    setFemale(true);
                }
                // 스타일 설정
                setStyles(res.data.styles);

                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchShowData();
    }, []);

    useEffect(() => {
        if(photoName === '') return;

        setImage_url(photoName);
    }, [photoName])

    // 닉네임 중복 검사 
    const handleClickOutside = async ({ target }) => {
        console.log(nickname);

        if (nicknameRef.current && !nicknameRef.current.contains(target) && checkNickname !== nickname) {
            // axios 코드 작성 하면 됨
            async function fetchNickname(){
                try {
                    axios.defaults.withCredentials=true;
                    const res = await axios.get("http://localhost:8080/check/nickname?nickname="+ nickname); 
    
                    if(res.data === 'available') {
                        setPass(true);
                        setCheckNickname(nickname); // 검사를 완료한 닉네임
                        setPhotoName(nickname+formattedDate+'.jpg');
                    } else {
                        setPass(false);
                    }
                  } catch (error) {
                    console.error(error);
                  }
            }
    
            fetchNickname();
        }
    };
    
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [nickname]);
  
    const handelMouseDownEvent = (e) => {
      setDragging(true);
      if(containerRef.current){
        setClickPoint(e.pageX);
        setScrollLeft(containerRef.current.scrollLeft);
      }
    };
  
    // 태그들 스크롤
    const handelMouseMoveEvent = (e) => {
      if(!dragging) return;
  
      e.preventDefault();
  
      if(containerRef.current){
        const walk = e.pageX - clickPoint;
        containerRef.current.scrollLeft = scrollLeft - walk;
      }
    }

    const [image, setImage] = useState({
        image_file: null,
        preview_URL: null,
    });

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

    // 사진 업로드
    const handleImageUpload = () => {
        console.log("제대로 된다.");

        // 코디네이터 프로필 편집-수정
        async function fetchData() {
            try {
                const res = await axios.post("http://localhost:8080/coordinator/edit", 
                {
                    id: 1,
                    nickname: nickname,
                    height: height,
                    weight: weight,
                    gender: male === true ? 'MALE' : 'FEMALE',
                    sns_url: sns_url,
                    image_url: photoName,
                    content: content,
                    styles: styles
                },
                );
                if (res.data==='success'){
                    navigate(-1);
                } 
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchImage() {
            AWS.config.update({
                region: "ap-northeast-2",
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            });

            try {
                const handleFileInput = async () => {
                    const file = image.image_file;

                    const upload = new AWS.S3.ManagedUpload({
                        params: {
                            Bucket: "seumu-s3-bucket", // 버킷 이름
                            Key: photoName, // 파일 이름 (버킷 안에서 저장될 파일 이름)
                            Body: file, // 파일 객체
                        },
                    });

                    const promise = upload.promise();   // 반환값을 받음

                    promise.then((data) => {
                        // 여기에 axios 코드 만들어서 백으로 넘기면 됨
                        fetchData();
                    });
                }

                handleFileInput();
            } catch (e) {
                console.log(e);
            }
        }      

        fetchImage();       
    };

    const changeGender = (g) => {
        if (g === 1) {
            setMale(true);
            setFemale(false);
        } else if (g === 2) {
            setMale(false);
            setFemale(true);
        }
    }

    const changeNickname = (e) => {
        setNickname(e.target.value);
    }

    const changeSns_url = (e) => {
        setSns_url(e.target.value);
    }

    const changeContent = (e) => {
        setContent(e.target.value);
        setInputCount(e.target.value.length);

        if (content.length > maxInputLength) {
            alert("최대 20자까지 입력 가능합니다.");
            e.target.value = content.substring(0, maxInputLength);
            setInputCount(maxInputLength);
        }
    }

    const changeHeight = (e) => {
        setHeight(e.target.value);
    }

    const changeWeight = (e) => {
        setWeight(e.target.value);
    }

    return (
        <f.Totalframe>
            <f.ScreenComponent>
                <GobackContainer />
                {/*사진 수정하기*/}
                <input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <c.Label htmlFor="profileImageInput">
                    <c.GetPhotoContainer>
                        <c.Profile
                            src={ image.preview_URL || image_url }
                        />
                        <c.Camera src={camera} />
                    </c.GetPhotoContainer>
                </c.Label>
                {/*태그 수정하기*/}
                <HashTag ref={containerRef}
                    onMouseDown={handelMouseDownEvent}
                    onMouseLeave={() => setDragging(false)}
                    onMouseUp={() => setDragging(false)}
                    onMouseMove={handelMouseMoveEvent}>
                    {styles?.map((data)=> (
                        <BigStyleCategoryBox content={data} isSelected={true}/>
                    ))}
                    <BigStyleCategoryBox content={'+'} isSelected={true}/>
                </HashTag>


                {/*정보 수정하기*/}
                <InputContaier>
                    <GetInfo infoName={'닉네임'} changeValue={changeNickname} inputValue={nickname} check={nicknameRef}/>
                    <AiOutlineCheckCircle fill={pass ? '#4F44E2' : '#C9C5CA'}/>
                    <Male
                        onClick={() => changeGender(1)}
                        selected={male}>남</Male>
                    <Female
                        onClick={() => changeGender(2)}
                        selected={female}>여</Female>
                </InputContaier>
                <f.Flex>
                    <GetInfo infoName={'키'} unit={'cm'} changeValue={changeHeight} inputValue={height} />
                    <GetInfo infoName={'체중'} unit={'kg'} changeValue={changeWeight} inputValue={weight} />
                </f.Flex>
                <f.Flex>
                    <GetInfo infoName={'SNS 링크'} changeValue={changeSns_url} inputValue={sns_url} />
                </f.Flex>
                {/*프로필 내용 입력받기 (1/20)-20글자 이내*/}
                <c.TextContainer>
                    <c.TextArea onChange={changeContent} maxLength={maxInputLength} value={content} placeholder="프로필을 간단하게 적어주세요!" />
                    <c.TextCount><span>{inputCount}</span><span>/20 자</span></c.TextCount>
                </c.TextContainer>
                <ButtonBottom content={'저장'} sendInfo={handleImageUpload} type={'axios'}/>
            </f.ScreenComponent>
        </f.Totalframe>
    )
}

export default EditCoProfile;