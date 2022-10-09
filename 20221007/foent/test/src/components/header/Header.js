import React, { useRef, useState } from "react";
import {
  Button,
  HeaderWrap,
  HeaderContents,
  ContentsBtn,
  LoginInput,
  LoginWrap,
} from "./styledComponent";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/middleware";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ isLogin }) => {
  const nav = useNavigate();
  const idInput = useRef();
  const pwInput = useRef();
  const dispatch = useDispatch();
  // 로그인할수있는 상태와 회원가입할수있는 상태 구분
  const [wrapState, setWrapState] = useState(true);
  const userName = useSelector(state => state.loginReducer.id);

  const resetInput = () => {
    idInput.current.value = "";
    pwInput.current.value = "";
    idInput.value = "";
    pwInput.value = "";
  };
  const logIn = () => {
    if (
      idInput.value === undefined ||
      idInput.value === "" ||
      pwInput.value === undefined ||
      pwInput.value === ""
    ) {
      alert("아이디 비밀번호 입력하세요");
      return;
    }
    dispatch(loginAction.logIn(idInput.value, pwInput.value));
    resetInput();
  };
  const logOut = () => {
    dispatch(loginAction.logOut());
  };
  const singUp = () => {
    dispatch(loginAction.signUp(idInput.value, pwInput.value, setWrap));
  };
  const setWrap = () => {
    setWrapState(!wrapState);
    resetInput();
  };

  return (
    <div>
      <HeaderWrap>
        <HeaderContents>
          <ContentsBtn
            onClick={() => {
              nav("/");
            }}
          >
            Main
          </ContentsBtn>
          <ContentsBtn
            onClick={() => {
              nav("/shop");
            }}
          >
            Shop
          </ContentsBtn>
        </HeaderContents>
        <LoginWrap>
          {isLogin ? (
            <>
              <div>{userName}로그인 됨</div>
              <button onClick={logOut}>로그아웃</button>
            </>
          ) : (
            <>
              {wrapState ? (
                <>
                  <label htmlFor="id">아이디</label>
                  <LoginInput
                    ref={idInput}
                    id="id"
                    onChange={e => {
                      idInput.value = e.target.value;
                    }}
                  />
                  <label htmlFor="pw">비밀번호</label>
                  <LoginInput
                    type={"password"}
                    ref={pwInput}
                    id="pw"
                    onChange={e => {
                      pwInput.value = e.target.value;
                    }}
                  />
                  <Button onClick={logIn}>로그인</Button>
                  <Button onClick={setWrap}>회원가입 하러 가기</Button>{" "}
                </>
              ) : (
                <>
                  <label htmlFor="id">아이디</label>
                  <LoginInput
                    ref={idInput}
                    id="id"
                    onChange={e => {
                      idInput.value = e.target.value;
                    }}
                  />
                  <label htmlFor="pw">비밀번호</label>
                  <LoginInput
                    type={"password"}
                    ref={pwInput}
                    id="pw"
                    onChange={e => {
                      pwInput.value = e.target.value;
                    }}
                  />
                  <Button onClick={singUp}>회원 가입</Button>
                  <Button onClick={setWrap}>로그인 하러 가기</Button>
                </>
              )}
            </>
          )}
        </LoginWrap>
      </HeaderWrap>
    </div>
  );
};

export default Header;
