import axios from "axios";

function logIn(id, pw, lastLocation, nav) {
  return async (dispatch, getState) => {
    const user = await axios({
      method: "post",
      url: "http://localhost:8000/login",
      data: { id, pw },
    });
    if (user.data) {
      dispatch({ type: "LOGIN", payload: { id, pw } });
      nav(lastLocation);
    } else {
      alert("가입된 정보가 없음니다 회원가입 하세요");
    }
  };
}
function logOut() {
  return (dispatch, getState) => {
    if (getState().loginReducer.isLogin) {
      dispatch({ type: "LOGOUT" });
    }
  };
}
function signUp(id, pw, setWrap) {
  return async (dispatch, getState) => {
    const user = await axios({
      method: "post",
      url: "http://localhost:8000/signUp",
      data: { id, pw },
    });
    console.log(user);
    alert(user.data);
    if (user.data === "가입완료") {
      setWrap();
    }
  };
}

export const loginAction = { logIn, signUp, logOut };
