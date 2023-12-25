
import {styled} from "styled-components";
import signupimg from "../assets/MainImg.png"
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Background = styled.div`
    width: 98.5vw;
    height: 140vh;
    background: #121212;    
`;

const SignUpBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 800px;
    /* height: 100vh; */

    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
    margin-bottom: 32px;
    padding: 40px 0px;

    flex-shrink: 0;
    text-align: left;
    color: white;
    /* color: #2f2f2f; */
    
`;

const Header = styled.div`
& h1{
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 15px;
}

& p{
    font-size: 23px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 50px;
}
    
`;

const InfoBox = styled.div`
    margin-bottom: 10px;
    & p {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 30px;
    }  

    &:focus-within{
        p{
            color: #38E788;
        }
    }

`;

const ProfileBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

`;
const ImgBox = styled.div`
    height: 9rem;
    width: 9rem;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: 30px;
    margin-bottom: 20px;
`;

const ProfileImg = styled.img`
    border: none;
    border-radius: 50%;

    width: 130px;
    height: 130px;
    
`;
const ImgLabel = styled.label`
    font-size: 20px;
    font-weight: 600;
    margin-left: 30px;
    color: #bcbcbc;
    cursor: pointer;
    &:active{
        color: #38E788;
    }
    /* margin-bottom: 20px; */
`;

const ImgFile = styled.input`
    display: none;
    /* margin-bottom: 20px; */
`;

const InputBox = styled.input`
    font-size: 23px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    outline: none;
    width: ${props=>props.width};

    height: 40px;
    color: white;
    background-color: inherit;
    border-style: none;
    padding-bottom: 10px;
    border-bottom: 2px solid #BBBBBB;
    margin-bottom: 20px;

    &:focus {
        border-bottom: 2px solid #38E788;
    }

    
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    /* position: absolute; */
    margin-top: 20px;
    /* bottom: 10px; */
`;

const ButtonStyle = styled.button<{bgColor:string, clickColor:string}>`
    margin-right: 15px;
    width: 120px;
    height: 47px;
    flex-shrink: 0;
    border-style: none;
    border-radius: 30px;
    background-color: ${props => props.bgColor};

    justify-content: center;
    color:${props => props.color};;
    text-align: center;
    padding-top: 5px;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;

    &:active{
        background-color: ${props => props.clickColor};
    }
`;

export const Error = styled.span`
    padding-top: 10px;
    padding-left: 10px;
    font-weight: 600;
    color: tomato;
`;

function SignUp(){
    const navigate = useNavigate();
    const formData = new FormData();
    const [file, setFile] = useState<File|null>(null);
    const [loginId, setLoginId] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    // const imgInput = useRef(null);

    useEffect(()=>{

    },[loginId, nickname, password, passwordConfirmation]
    )

    const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {
            target:{name, value},
        } = e
        
        if(name === "loginId"){
            setLoginId(value);
        }else if(name ==="nickname"){
            setNickname(value);
        }else if(name === "password"){
            setPassword(value);
        }else if(name === "passwordconfirmation"){
            setPasswordConfirmation(value);
        }
    };

    //이미지파일 폼데이터로 반환
    const onFileChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {files} = e.target;

        if(files && files.length === 1) {
            // formData.append('file', files[0]);
            setFile(files[0]);
            // console.log(files[0].name)
        }
    };

    const handleSignUp = async(): Promise<void> => {
        try{
            if (file) {
                formData.append('file', file);
            }

            const data = {
                loginId,
                nickname,
                password,
                passwordConfirmation,
            };
              
            const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
              
            formData.append("data", blob);

            //formData 출력해보기
            // for(const pair of formData.entries()) {
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            // axios.post에 formData를 직접 전달
            await axios.post(
                "api/v1/members/signup",
                formData, 
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );

            Toast.fire({
                icon: 'success',
                title: '회원가입 성공!'
            });

            navigate("/"); // 성공 시 페이지 이동


        }catch(error){

            Toast.fire({
                icon: 'error',
                title: '중복된 회원정보입니다.'
            });
        }
    };

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isLoading || file===null || loginId==="" || nickname ==="" || password==="" || passwordConfirmation===""){

            // Swal.fire({
            //     position: "center",
            //     icon: "warning",
            //     title: error,
            // });

            Toast.fire({
                icon: 'warning',
                title: '프로필 사진을 등록하세요.'
            });

            return;
        }

        try {
            setLoading(true);

            await handleSignUp();

          } catch (e) {
            console.log(e);
            // setError(String(e));

          } finally {
            setLoading(false); 
          }
    };

    const handleGoBack = () => {
        navigate("/");
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

    return(
        <Background>
            <SignUpBox onSubmit={onSubmit} >
                <Header>
                    <h1>환영합니다!</h1>
                    <p>기본 회원정보를 등록해주세요.</p>
                </Header>

                <ProfileBox>
                    <ImgBox>
                        <ProfileImg src={file? URL.createObjectURL(file) : signupimg}/>
                    </ImgBox>

                    <ImgLabel htmlFor="profileImg"> 
                        {file? "프로필 이미지 변경":"프로필 이미지 추가"}
                    </ImgLabel>
                    <ImgFile onChange={onFileChange} type="file" accept="image/*" id="profileImg"></ImgFile>
                </ProfileBox>

                <InfoBox>
                    <p>이름</p>
                    <label>
                        <InputBox type='text' name="nickname" value={nickname} onChange={onChange} placeholder='이름을 입력하세요' required width={"30%"}/>
                    </label>
                </InfoBox>
                {/* <InfoBox>
                    <p>이메일</p>
                    <label>
                        <InputBox type='email' value={email} placeholder='이메일을 입력하세요' width={"35%"}/>
                    </label>
                </InfoBox> */}
                <InfoBox>
                    <p>아이디</p>
                    <label>
                        <InputBox type='text' name="loginId" value={loginId} onChange={onChange} placeholder='아이디를 입력하세요' required width={"26%"}/>
                    </label>
                </InfoBox>
                
                <InfoBox>
                    <p>비밀번호</p>
                    <label>
                        <InputBox type='password' name="password" value={password} onChange={onChange} placeholder='비밀번호를 입력하세요' required width={"40%"}/>
                    </label>
                </InfoBox>
                <InfoBox>
                    <p>비밀번호 확인</p>
                    <label>
                        <InputBox type='password' name="passwordconfirmation" value={passwordConfirmation} onChange={onChange}placeholder='비밀번호를 한 번 더 입력하세요'required width={"40%"}/>
                    </label>
                </InfoBox>

                <ButtonBox>
                    <ButtonStyle type='submit' onClick={handleGoBack} bgColor="#D9D9D9" clickColor="#a6a6a6" color="#000000">취소</ButtonStyle>
                    <ButtonStyle 
                        type='submit' 
                        value={isLoading? "Loading..." : "Create Account"} 
                        bgColor="#38E788"
                        clickColor="#2fc673" 
                        color="#FFFFFF"
                    >
                        가입하기
                    </ButtonStyle>
                </ButtonBox>
                {/* {error !== ""? <Error>{error}</Error>: null} */}

            </SignUpBox>
        </Background>
    )

}

export default SignUp;